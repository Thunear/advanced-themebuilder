import { colorMetadata } from "./colorMetadata";

type LightnessPresetType = {
  name: string;
  lightness: {
    [key: string]: number;
  };
};

export const lightnessPresets: {
  [key: string]: {
    [key: string]: LightnessPresetType;
  };
} = {
  light: {
    aa: {
      name: "Standard AA",
      lightness: {
        "background-default":
          colorMetadata["background-default"].lightness.light,
        "background-tinted": colorMetadata["background-tinted"].lightness.light,
        "surface-default": colorMetadata["surface-default"].lightness.light,
        "surface-tinted": colorMetadata["surface-tinted"].lightness.light,
        "surface-hover": colorMetadata["surface-hover"].lightness.light,
        "surface-active": colorMetadata["surface-active"].lightness.light,
        "border-subtle": colorMetadata["border-subtle"].lightness.light,
        "border-default": colorMetadata["border-default"].lightness.light,
        "border-strong": colorMetadata["border-strong"].lightness.light,
        "text-subtle": colorMetadata["text-subtle"].lightness.light,
        "text-default": colorMetadata["text-default"].lightness.light,
      },
    },
    aaa: {
      name: "Standard AAA",
      lightness: {
        "background-default": 100,
        "background-tinted": 96,
        "surface-default": 100,
        "surface-tinted": 92,
        "surface-hover": 87,
        "surface-active": 82,
        "border-subtle": 76,
        "border-default": 50,
        "border-strong": 40,
        "text-subtle": 25,
        "text-default": 15,
      },
    },
  },
  dark: {
    "d-aa": {
      name: "Dimmed AA",
      lightness: {
        "background-default": 12,
        "background-tinted": 16,
        "surface-default": 20,
        "surface-tinted": 23,
        "surface-hover": 26,
        "surface-active": 32,
        "border-subtle": 34,
        "border-default": 54,
        "border-strong": 69,
        "text-subtle": 69,
        "text-default": 94,
      },
    },
    "s-aa": {
      name: "Standard AA",
      lightness: {
        "background-default":
          colorMetadata["background-default"].lightness.dark,
        "background-tinted": colorMetadata["background-tinted"].lightness.dark,
        "surface-default": colorMetadata["surface-default"].lightness.dark,
        "surface-tinted": colorMetadata["surface-tinted"].lightness.dark,
        "surface-hover": colorMetadata["surface-hover"].lightness.dark,
        "surface-active": colorMetadata["surface-active"].lightness.dark,
        "border-subtle": colorMetadata["border-subtle"].lightness.dark,
        "border-default": colorMetadata["border-default"].lightness.dark,
        "border-strong": colorMetadata["border-strong"].lightness.dark,
        "text-subtle": colorMetadata["text-subtle"].lightness.dark,
        "text-default": colorMetadata["text-default"].lightness.dark,
      },
    },
    "d-aaa": {
      name: "Dimmed AAA",
      lightness: {
        "background-default": 12,
        "background-tinted": 16,
        "surface-default": 20,
        "surface-tinted": 23,
        "surface-hover": 26,
        "surface-active": 32,
        "border-subtle": 34,
        "border-default": 54,
        "border-strong": 69,
        "text-subtle": 79,
        "text-default": 94,
      },
    },
    "s-aaa": {
      name: "Standard AAA",
      lightness: {
        "background-default": 12,
        "background-tinted": 16,
        "surface-default": 20,
        "surface-tinted": 23,
        "surface-hover": 26,
        "surface-active": 32,
        "border-subtle": 34,
        "border-default": 54,
        "border-strong": 69,
        "text-subtle": 79,
        "text-default": 94,
      },
    },
  },
};
