import { Oculi } from "./index";

it("Basic templating works", () => {
  const oculi = new Oculi(`His name is <%= it.name %>.`, {
    name: "Robert Paulson",
  });
  expect(oculi.generate()).toBe(`His name is Robert Paulson.`);
});

it("Memoization works, later memo calls to the same key will return the first memo'd value", () => {
  const oculi = new Oculi(
    `His name is <%= it.memo('hisName', 'Robert Paulson') %>. His name is <%= it.memo('hisName', 'Some other idiot') %>.`
  );
  expect(oculi.generate()).toBe(
    `His name is Robert Paulson. His name is Robert Paulson.`
  );
});

describe("Sampling", () => {
  beforeAll(() => {
    let i = 0;
    Oculi.rng = () => {
      i += 0.33;
      return i;
    };
  });

  it("works with custom seeds", () => {
    const oculi = new Oculi(
      `His name is <%= it.sample('names') %>. <%= it.sample('names') %> turned around and left.`,
      { names: ["Robert Paulson", "Tyler Durden"] }
    );
    expect(oculi.generate()).toBe(
      `His name is Robert Paulson. Tyler Durden turned around and left.`
    );
  });

  afterAll(() => {
    Oculi.rng = Math.random;
  });
});
