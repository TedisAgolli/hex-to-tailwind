const hexToTailwind = require("./index");
test("Correctly converts 3 letter hex to tailwind value", () => {
  expect(hexToTailwind("#FFF").tailwind).toBe("trueGray-50");
  expect(hexToTailwind("#FFF").tailwindHex).toBe("#fafafa");
  expect(hexToTailwind("#FFF").deltaE).toBe("1.73");
});
test("Correctly converts 6 letter hex to tailwind value", () => {
  expect(hexToTailwind("#171716").tailwind).toBe("trueGray-900");
  expect(hexToTailwind("#171716").tailwindHex).toBe("#171717");
  expect(hexToTailwind("#171716").deltaE).toBe("0.72");
});
test("Throws when passed incorrect hex", () => {
  expect(() => {
    hexToTailwind("BAD HEX");
  }).toThrowError("Hex value passed is invalid.");
});
