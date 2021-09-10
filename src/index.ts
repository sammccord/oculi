import * as eta from "eta";
import type { EtaConfig } from "eta/dist/types/config";
import type { TemplateFunction } from "eta/dist/types/compile";

export class Oculi {
  public static _eta = eta;
  protected compiled: TemplateFunction;
  protected memod: object = {};
  protected data: object = {
    memo: this.memo,
  };

  constructor(template: string, data: object, options: Partial<EtaConfig>) {
    this.compiled = eta.compile(template, options);
    for (let k in data) {
    }
  }

  static generate() {
    return eta.render("The answer to everything is <%= it.t %>", {
      get [t]() {
        return "cool";
      },
    });
  }

  protected memo(grammar: string, key?: string) {}
}
