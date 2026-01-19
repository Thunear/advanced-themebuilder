import { ColorService, type IColor } from "react-color-palette";
import {
  type ColorMetadataByName,
  type ColorScheme,
  type ThemeInfo,
  severityColors,
  colorMetadata,
  generateColorSchemes,
  generateDecorativeColors,
} from "./colors";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type DecorativeInfo = {
  light: string[];
  dark: string[];
};

export type ColorTheme = {
  name: string;
  colors: ThemeInfo;
  decorativeColors: DecorativeInfo;
  colorMetadata: ColorMetadataByName;
  lightColor?: IColor;
  darkColor?: IColor;
};

export type BaseBorderRadius = number;
export type PaneType =
  | "front"
  | "themes"
  | "colors"
  | "colors/add"
  | "colors/edit"
  | "colors/advanced"
  | "colors/lightness"
  | "radius"
  | "advancedColors";

type ColorStore = {
  decorativeStartLightness: number;
  setDecorativeStartLightness: (lightness: number) => void;
  decorativeEndLightness: number;
  setDecorativeEndLightness: (lightness: number) => void;
  decorativeSteps: number;
  setDecorativeSteps: (steps: number) => void;
  activeLightPreset: string;
  setActiveLightPreset: (preset: string) => void;
  activeDarkPreset: string;
  setActiveDarkPreset: (preset: string) => void;
  shrinkSidebar: boolean;
  setShrinkSidebar: (shrink: boolean) => void;
  showSeverityColors: boolean;
  setShowSeverityColors: (show: boolean) => void;
  showDecorativeColors: boolean;
  setShowDecorativeColors: (show: boolean) => void;
  activeColorScale: string;
  setActiveColorScale: (scale: string) => void;
  activeColorTheme: {
    index: number;
    type: "main" | "neutral" | "support" | "severity";
    colorTheme: ColorTheme;
    lightColor: IColor;
    darkColor?: IColor;
  };
  setActiveColorTheme: (
    index: number,
    type: "main" | "neutral" | "support" | "severity",
    colorTheme: ColorTheme,
    lightColor: IColor,
    darkColor?: IColor,
  ) => void;
  onColorThemeChange: number;
  setOnColorThemeChange: (value: number) => void;
  referenceColorMetadata: ColorMetadataByName;
  activePane: PaneType;
  setActivePane: (pane: PaneType) => void;
  colors: {
    main: ColorTheme[];
    neutral: ColorTheme[];
    support: ColorTheme[];
    severity: ColorTheme[];
  };
  setColors: (colors: {
    main: ColorTheme[];
    neutral: ColorTheme[];
    support: ColorTheme[];
    severity: ColorTheme[];
  }) => void;
  getColorTheme: (
    index: number,
    type: "main" | "neutral" | "support" | "severity",
  ) => ColorTheme | undefined;
  addColor: (
    newColor: ColorTheme,
    type: "main" | "neutral" | "support" | "severity",
  ) => void;
  updateColorTheme: (
    updatedTheme: ColorTheme,
    index: number,
    type: "main" | "neutral" | "support" | "severity",
  ) => void;
  resetColors: () => void;
  removeColor: (
    index: number,
    type: "main" | "neutral" | "support" | "severity",
  ) => void;
  baseBorderRadius: BaseBorderRadius;
  setBaseBorderRadius: (radius: BaseBorderRadius) => void;
  internalColorScheme: ColorScheme;
  setInternalColorScheme: (colorScheme: ColorScheme) => void;
  externalColorScheme: ColorScheme;
  setExternalColorScheme: (colorScheme: ColorScheme) => void;
  themeTab: "overview" | "colorsystem" | "contrast" | "typography" | "radius";
  setThemeTab: (
    tab:
      | "overview"
      | "colorsystem"
      | "contrast"
      | "typography"
      | "radius"
      | "contrast",
  ) => void;
  activeTheme: string | null;
  setActiveTheme: (themeName: string | null) => void;
};

export const useThemeStore = create(
  subscribeWithSelector<ColorStore>((set) => ({
    decorativeSteps: 10,
    setDecorativeSteps: (steps) => set({ decorativeSteps: steps }),
    decorativeStartLightness: 92,
    setDecorativeStartLightness: (lightness) =>
      set({ decorativeStartLightness: lightness }),
    decorativeEndLightness: 30,
    setDecorativeEndLightness: (lightness) =>
      set({ decorativeEndLightness: lightness }),
    activeLightPreset: "aa",
    setActiveLightPreset: (preset) => set({ activeLightPreset: preset }),
    activeDarkPreset: "s-aa",
    setActiveDarkPreset: (preset) => set({ activeDarkPreset: preset }),
    activeColorTheme: {
      index: 0,
      type: "main",
      lightColor: ColorService.convert("hex", "#0062ba"),
      darkColor: ColorService.convert("hex", "#004b87"),
      colorTheme: {
        name: "primary",
        colors: generateColorSchemes({
          lightColor: "#0062BA",
          colorMetaData: colorMetadata,
        }),
        decorativeColors: {
          light: [],
          dark: [],
        },
        colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
      },
    },
    setActiveColorTheme: (index, type, colorTheme, lightColor, darkColor) =>
      set({
        activeColorTheme: { index, type, colorTheme, lightColor, darkColor },
      }),
    shrinkSidebar: false,
    setShrinkSidebar: (shrink) => set({ shrinkSidebar: shrink }),
    showSeverityColors: false,
    setShowSeverityColors: (show) => set({ showSeverityColors: show }),
    showDecorativeColors: true,
    setShowDecorativeColors: (show) => set({ showDecorativeColors: show }),
    activeColorScale: "primary",
    setActiveColorScale: (scale) => set({ activeColorScale: scale }),
    onColorThemeChange: 0,
    setOnColorThemeChange: (value) => set({ onColorThemeChange: value }),
    referenceColorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
    getColorTheme: (index, type): ColorTheme | undefined => {
      const colors = useThemeStore.getState().colors[type];
      return colors[index];
    },
    activePane: "front",
    setActivePane: (pane) => set({ activePane: pane }),
    baseBorderRadius: 4,
    colors: {
      main: [
        {
          name: "primary",
          colors: generateColorSchemes({
            lightColor: "#0062BA",
            colorMetaData: JSON.parse(JSON.stringify(colorMetadata)),
          }),
          decorativeColors: generateDecorativeColors("#0062BA", 12, "rgb"),
          colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
        },
      ],
      neutral: [
        {
          name: "neutral",
          colors: generateColorSchemes({
            lightColor: "#1E2B3C",
            colorMetaData: JSON.parse(JSON.stringify(colorMetadata)),
          }),
          decorativeColors: generateDecorativeColors("#1E2B3C", 12, "rgb"),
          colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
        },
      ],
      support: [
        {
          name: "support-1",
          colors: generateColorSchemes({
            lightColor: "#0D7A5F",
            colorMetaData: JSON.parse(JSON.stringify(colorMetadata)),
          }),
          decorativeColors: generateDecorativeColors("#0D7A5F", 12, "rgb"),
          colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
        },
        {
          name: "support-2",
          colors: generateColorSchemes({
            lightColor: "#5B3FA0",
            colorMetaData: JSON.parse(JSON.stringify(colorMetadata)),
          }),
          decorativeColors: generateDecorativeColors("#5B3FA0", 12, "rgb"),
          colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
        },
      ],
      severity: [
        {
          name: "info",
          colors: generateColorSchemes({
            lightColor: severityColors.info,
            colorMetaData: JSON.parse(JSON.stringify(colorMetadata)),
          }),
          decorativeColors: generateDecorativeColors("#1E2B3C", 12, "rgb"),
          colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
        },
        {
          name: "success",
          colors: generateColorSchemes({
            lightColor: severityColors.success,
            colorMetaData: JSON.parse(JSON.stringify(colorMetadata)),
          }),
          decorativeColors: generateDecorativeColors("#1E2B3C", 12, "rgb"),
          colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
        },
        {
          name: "warning",
          colors: generateColorSchemes({
            lightColor: severityColors.warning,
            colorMetaData: JSON.parse(JSON.stringify(colorMetadata)),
          }),
          decorativeColors: generateDecorativeColors("#1E2B3C", 12, "rgb"),
          colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
        },
        {
          name: "error",
          colors: generateColorSchemes({
            lightColor: severityColors.error,
            colorMetaData: JSON.parse(JSON.stringify(colorMetadata)),
          }),
          decorativeColors: generateDecorativeColors("#1E2B3C", 12, "rgb"),
          colorMetadata: JSON.parse(JSON.stringify(colorMetadata)),
        },
      ],
    },
    themeTab: "colorsystem",
    setThemeTab: (tab) => set({ themeTab: tab }),
    setColors: (colors) => set({ colors }),
    addColor: (newColor, type) =>
      set((state) => {
        const updatedColors = state.colors[type].concat(newColor);
        return { colors: { ...state.colors, [type]: updatedColors } };
      }),
    updateColorTheme: (updatedColorTheme, index, type) =>
      set((state) => {
        const updatedColors = state.colors[type].map((color, i) =>
          i === index ? updatedColorTheme : color,
        );
        return { colors: { ...state.colors, [type]: updatedColors } };
      }),
    resetColors: () => {
      set({
        colors: JSON.parse(
          JSON.stringify({ main: [], neutral: [], support: [], severity: [] }),
        ),
      });
    },
    removeColor: (index, type) =>
      set((state) => {
        const updatedColors = state.colors[type].filter((_, i) => i !== index);
        return { colors: { ...state.colors, [type]: updatedColors } };
      }),
    internalColorScheme: "light",
    setInternalColorScheme: (colorScheme) =>
      set({ internalColorScheme: colorScheme }),
    externalColorScheme: "light",
    setExternalColorScheme: (colorScheme) =>
      set({ externalColorScheme: colorScheme }),
    setBaseBorderRadius: (radius) => set({ baseBorderRadius: radius }),
    activeTheme: "first",
    setActiveTheme: (themeName) => set({ activeTheme: themeName }),
  })),
);
