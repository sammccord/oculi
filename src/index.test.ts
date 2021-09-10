import { Freta } from "./index";

test("", () => {
  const t = Freta.generate();
  console.log(t);
  expect(typeof t).toBe("string");
});
