import * as eta from "eta";
import get from "lodash.get";
import set from "lodash.set";
import type { EtaConfig } from "eta/dist/types/config";
import type { TemplateFunction } from "eta/dist/types/compile";

export class Oculi<Data> {
  public static Eta = eta;
  public static rng = Math.random;

  protected config: EtaConfig;
  protected compiled: TemplateFunction;
  protected _data: any = {
    sample: this.sample.bind(this),
    memo: this.memo.bind(this),
  };

  constructor(
    template: string,
    data: Partial<Data> = {},
    config?: Partial<EtaConfig>
  ) {
    this.config = { ...eta.config, config };
    this.compiled = eta.compile(template, this.config);
    for (let k in data) {
      this._data[k] = data[k];
    }
  }

  public get data(): Data {
    return { ...this.data };
  }

  protected memo<T>(key: string, value?: T): T {
    let val = get(this._data, key);
    if (!val) {
      val = value;
      set(this._data, key, value);
    }
    return val;
  }

  protected sample(val: string | any[]): any {
    if (typeof val === "string" && Array.isArray(this._data[val]))
      return this.sample(this._data[val]);
    return val[Math.floor(Oculi.rng() * val.length)];
  }

  public generate(config?: EtaConfig) {
    return this.compiled(this._data, config || this.config);
  }
}
