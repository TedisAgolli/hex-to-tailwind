const { deltaE, rgb2Lab } = require("./utils/colors");
const tailwindColors = require("./utils/tailwindColors");

const isValidHex = (hex) => /^#([0-9A-F]{3}){1,2}$/i.test(hex);
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const hexToLab = (hex) => {
  const rgb = hexToRgb(hex);
  return rgb2Lab([rgb.r, rgb.g, rgb.b]);
};

const handle3DigitHex = (hexInput) =>
  hexInput.length === 4
    ? hexInput
        // Remove leading #
        .slice(1)
        .split("")
        .map((hex) => hex + hex)
        .join("")
    : hexInput;

const tailwindColorsToLab = (colors) => {
  const allColors = [];
  Object.entries(colors).forEach((color) => {
    const colorName = color[0];
    Object.entries(color[1]).forEach((subColor) => {
      allColors.push({
        main: colorName,
        sub: subColor[0],
        hex: subColor[1],
        lab: hexToLab(subColor[1]),
      });
    });
  });
  return allColors;
};

const labTailwind = tailwindColorsToLab(tailwindColors);
module.exports = (hexInput) => {
  if (!isValidHex(hexInput)) {
    throw new Error("Hex value passed is invalid.");
  }
  const finalHex = handle3DigitHex(hexInput);
  const labColorInput = hexToLab(finalHex);
  const comparedColors = labTailwind
    .map((col) => ({
      deltaE: deltaE(col.lab, labColorInput).toFixed(2),
      ...col,
    }))
    .sort((a, b) => a.deltaE - b.deltaE);
  const closest = comparedColors[0];

  return {
    tailwind: `${closest.main}-${closest.sub}`,
    tailwindHex: closest.hex,
    deltaE: closest.deltaE,
  };
};
