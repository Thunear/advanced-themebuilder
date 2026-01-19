import {
  colorMetadata,
  generateColorSchemes,
  getBaseDarkLightness,
} from "../../../colors";
import {
  Button,
  Checkbox,
  Heading,
  Switch,
} from "@digdir/designsystemet-react";
import type { CssColor } from "../../../colors";
import { ChevronLeftIcon, CogIcon, PlusIcon } from "@navikt/aksel-icons";
import { useEffect, useState } from "react";
import { ColorService, useColor } from "react-color-palette";
import { type ColorTheme, type PaneType, useThemeStore } from "../../../store";
import { ColorInput, LightnessInput } from "~/components";
import { ColorPane } from "../ColorPane/ColorPane";
import { LightnessPane } from "../LightnessPane/LightnessPane";
import classes from "./ColorsPane.module.css";
import RangeSlider from "react-range-slider-input";

export const ColorsPane = () => {
  type ColorType = "main" | "neutral" | "support" | "severity";
  const showSeverityColors = useThemeStore((state) => state.showSeverityColors);
  const setShowSeverityColors = useThemeStore(
    (state) => state.setShowSeverityColors,
  );
  const showDecorativeColors = useThemeStore(
    (state) => state.showDecorativeColors,
  );
  const setShowDecorativeColors = useThemeStore(
    (state) => state.setShowDecorativeColors,
  );
  const removeColor = useThemeStore((state) => state.removeColor);
  const addColor = useThemeStore((state) => state.addColor);
  const updateColorTheme = useThemeStore((state) => state.updateColorTheme);
  const colors = useThemeStore((state) => state.colors);
  const [initialColor, setInitialColor] = useState("#0062ba");
  const [initialName, setInitialName] = useState("");
  const activeColorTheme = useThemeStore((state) => state.activeColorTheme);
  const setActiveColorTheme = useThemeStore(
    (state) => state.setActiveColorTheme,
  );
  const activePane = useThemeStore((state) => state.activePane);
  const setActivePane = useThemeStore((state) => state.setActivePane);
  const decorativeSteps = useThemeStore((state) => state.decorativeSteps);
  const setDecorativeSteps = useThemeStore((state) => state.setDecorativeSteps);
  const setOnColorThemeChange = useThemeStore(
    (state) => state.setOnColorThemeChange,
  );
  const decorativeStartLightness = useThemeStore(
    (state) => state.decorativeStartLightness,
  );
  const setDecorativeStartLightness = useThemeStore(
    (state) => state.setDecorativeStartLightness,
  );
  const decorativeEndLightness = useThemeStore(
    (state) => state.decorativeEndLightness,
  );
  const setDecorativeEndLightness = useThemeStore(
    (state) => state.setDecorativeEndLightness,
  );
  const onColorThemeChange = useThemeStore((state) => state.onColorThemeChange);

  const setupEditState = (
    colorTheme: ColorTheme,
    index: number,
    colorType: ColorType,
  ) => {
    setActivePane("colors/edit");
    setActiveColorTheme(
      index,
      colorType,
      colorTheme,
      colorTheme.lightColor ||
        ColorService.convert("hex", colorTheme.colors.light[11].hex),
      colorTheme.darkColor,
    );
    setInitialColor(colorTheme.colors.light[11].hex);
    setInitialName(colorTheme.name);
  };

  const resetColorState = () => {
    setActiveColorTheme(
      0,
      "main",
      colors.main[0],
      ColorService.convert("hex", colors.main[0].colors.light[11].hex),
    );
    setActivePane("colors");
  };

  const setupNewColorState = (colorType: ColorType) => {
    const newColorName = colorType + "-color-" + (colors[colorType].length + 1);
    setActivePane("colors/add");
    const newTheme: ColorTheme = {
      name: newColorName,
      colors: generateColorSchemes({
        lightColor: "#0062ba",
        colorMetaData: colorMetadata,
      }),
      decorativeColors: {
        light: [],
        dark: [],
      },
      colorMetadata: colorMetadata,
    };
    addColor(newTheme, colorType);
    setActiveColorTheme(
      colors[colorType].length,
      colorType,
      newTheme,
      ColorService.convert("hex", "#0062ba"),
    );
  };

  const handleStepChange = (value: number) => {
    setDecorativeSteps(value);
    setOnColorThemeChange(onColorThemeChange + 1);
  };

  const handleStartLightnessChange = (value: number) => {
    setDecorativeStartLightness(value);
    setOnColorThemeChange(onColorThemeChange + 1);
  };

  const handleStopLightnessChange = (value: number) => {
    setDecorativeEndLightness(value);
    setOnColorThemeChange(onColorThemeChange + 1);
  };

  const test = (e: any) => {
    setDecorativeStartLightness(100 - e[0]);
    setDecorativeEndLightness(100 - e[1]);
    setOnColorThemeChange(onColorThemeChange + 1);
  };

  return (
    <div>
      {activePane === "colors" && (
        <div className={classes.header}>
          <Button
            hidden={activePane !== "colors"}
            data-size="sm"
            variant="tertiary"
            onClick={() => {
              setActivePane("front");
            }}
            className={classes.back}
          >
            <ChevronLeftIcon aria-hidden fontSize="1.5rem" /> Meny
          </Button>

          <>
            <Button
              className={classes.lightBtn}
              variant="tertiary"
              data-size="sm"
              data-color="neutral"
              onClick={() => setActivePane("colors/lightness")}
            >
              <CogIcon title="tannhjul" fontSize="1.6rem" />
              Endre lyshet på fargene
            </Button>
          </>
        </div>
      )}
      <Heading
        data-size="xs"
        className={classes.title}
        hidden={activePane !== "colors"}
      >
        Sett opp fargene dine
      </Heading>

      {/* MAIN COLORS */}
      {activePane === "colors" && (
        <>
          <div className={classes.group}>
            <div className={classes.groupHeader}>
              <Heading data-size="2xs">Main</Heading>
              {colors.main.length < 40 && (
                <Button
                  variant="tertiary"
                  data-size="sm"
                  className={classes.AddBtn}
                  onClick={() => setupNewColorState("main")}
                  aria-label="Legg til hovedfarge"
                >
                  Legg til farge
                  <PlusIcon aria-hidden fontSize="1.5rem" />
                </Button>
              )}
              {colors.main.length >= 40 && (
                <div className={classes.error}>Maks 4 hovedfarger</div>
              )}
            </div>
            <div className={classes.colors}>
              {colors.main.map((colorTheme, index) => (
                <ColorInput
                  key={index}
                  color={colorTheme.colors.light[11].hex}
                  name={colorTheme.name}
                  onClick={() => setupEditState(colorTheme, index, "main")}
                />
              ))}
            </div>
          </div>
          <div className={classes.separator}></div>
          <div className={classes.group}>
            <div className={classes.colors}>
              {colors.neutral.map((colorTheme, index) => (
                <ColorInput
                  key={index}
                  color={colorTheme.colors.light[11].hex}
                  name={colorTheme.name}
                  onClick={() => setupEditState(colorTheme, index, "neutral")}
                />
              ))}
            </div>
          </div>

          {/* SUPPORT COLORS */}
          <div className={classes.group}>
            <div className={classes.groupHeader}>
              <Heading data-size="2xs">Support</Heading>
              {colors.support.length < 40 && (
                <Button
                  variant="tertiary"
                  data-size="sm"
                  className={classes.AddBtn}
                  onClick={() => setupNewColorState("support")}
                  aria-label="Legg til støttefarge"
                >
                  Legg til farge
                  <PlusIcon aria-hidden fontSize="1.5rem" />
                </Button>
              )}
              {colors.support.length >= 40 && (
                <div className={classes.error}>Maks 4 støttefarger</div>
              )}
            </div>
            <div className={classes.colors}>
              {colors.support.map((colorTheme, index) => (
                <ColorInput
                  key={index}
                  color={colorTheme.colors.light[11].hex}
                  name={colorTheme.name}
                  onClick={() => setupEditState(colorTheme, index, "support")}
                />
              ))}
            </div>
          </div>

          {/* Decorative COLORS */}
          <div className={classes.group}>
            <div className={classes.groupHeader}>
              <Heading data-size="2xs">Decorative</Heading>
              <Switch
                aria-labelledby=""
                data-color="neutral"
                data-size="sm"
                checked={showDecorativeColors}
                onChange={(e) => setShowDecorativeColors(e.target.checked)}
              />
            </div>
            {!showDecorativeColors && (
              <div className={classes.severityInfo}>
                Aktiver for å sette opp dekorative farger
              </div>
            )}
            {showDecorativeColors && (
              <div className={classes.colors}>
                <LightnessInput
                  label="Antall steg"
                  value={10}
                  initialValue={10}
                  onChange={(value) => handleStepChange(value)}
                  onReset={(value) => handleStepChange(value)}
                />

                <div className={classes.label}>
                  Sett lightness start og slutt
                </div>
                <RangeSlider
                  min={0}
                  max={100}
                  defaultValue={[8, 70]}
                  onInput={(e) => test(e)}
                />
              </div>
            )}
          </div>

          {/* Severity COLORS */}
          <div className={classes.group}>
            <div className={classes.groupHeader}>
              <Heading data-size="2xs">Severity</Heading>
              <Switch
                aria-labelledby=""
                data-color="neutral"
                data-size="sm"
                checked={showSeverityColors}
                onChange={(e) => setShowSeverityColors(e.target.checked)}
              />
            </div>
            {!showSeverityColors && (
              <div className={classes.severityInfo}>
                Aktiver for å overstyre severity-farger
              </div>
            )}
            {showSeverityColors && (
              <div className={classes.colors}>
                {colors.severity.map((colorTheme, index) => (
                  <ColorInput
                    key={index}
                    color={colorTheme.colors.light[11].hex}
                    name={colorTheme.name}
                    onClick={() =>
                      setupEditState(colorTheme, index, "severity")
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {activePane === "colors/lightness" && (
        <LightnessPane onBackClicked={() => setActivePane("colors")} />
      )}

      {activePane.startsWith("colors/") &&
        activePane !== "colors/lightness" && (
          <ColorPane
            type={activePane}
            onClose={() => {
              resetColorState();
            }}
            onRemove={() => {
              removeColor(activeColorTheme.index, activeColorTheme.type);
              resetColorState();
            }}
            onCancel={() => {
              resetColorState();
              updateColorTheme(
                {
                  name: initialName,
                  colors: generateColorSchemes({
                    lightColor: initialColor as CssColor,
                    colorMetaData: colorMetadata,
                  }),
                  decorativeColors: {
                    light: [],
                    dark: [],
                  },
                  colorMetadata: colorMetadata,
                },
                activeColorTheme.index,
                activeColorTheme.type,
              );
            }}
          />
        )}
    </div>
  );
};
