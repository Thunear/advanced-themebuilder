import {
  colorMetadata,
  generateColorSchemes,
  getBaseDarkLightness,
} from "../../../colors";
import { Button, Checkbox, Heading } from "@digdir/designsystemet-react";
import type { CssColor } from "../../../colors";
import { ChevronLeftIcon, CogIcon, PlusIcon } from "@navikt/aksel-icons";
import { useEffect, useState } from "react";
import { ColorService, useColor } from "react-color-palette";
import { type ColorTheme, type PaneType, useThemeStore } from "../../../store";
import { ColorInput } from "~/components";
import { ColorPane } from "../ColorPane/ColorPane";
import { LightnessPane } from "../LightnessPane/LightnessPane";
import classes from "./ColorsPane.module.css";

export const ColorsPane = () => {
  type ColorType = "main" | "neutral" | "support" | "severity";

  const removeColor = useThemeStore((state) => state.removeColor);
  const addColor = useThemeStore((state) => state.addColor);
  const updateColorTheme = useThemeStore((state) => state.updateColorTheme);
  const colors = useThemeStore((state) => state.colors);
  const [initialColor, setInitialColor] = useState("#0062ba");
  const [initialName, setInitialName] = useState("");
  const activeColorTheme = useThemeStore((state) => state.activeColorTheme);
  const setActiveColorTheme = useThemeStore(
    (state) => state.setActiveColorTheme
  );
  const activePane = useThemeStore((state) => state.activePane);
  const setActivePane = useThemeStore((state) => state.setActivePane);

  const setupEditState = (
    colorTheme: ColorTheme,
    index: number,
    colorType: ColorType
  ) => {
    setActivePane("colors/edit");
    setActiveColorTheme(
      index,
      colorType,
      colorTheme,
      ColorService.convert("hex", colorTheme.colors.light[11].hex)
    );
    setInitialColor(colorTheme.colors.light[11].hex);
    setInitialName(colorTheme.name);
  };

  const resetColorState = () => {
    setActiveColorTheme(
      0,
      "main",
      colors.main[0],
      ColorService.convert("hex", colors.main[0].colors.light[11].hex)
    );
    setActivePane("colors");
  };

  const setupNewColorState = (colorType: ColorType) => {
    const newColorName = colorType + "-color-" + (colors[colorType].length + 1);
    setActivePane("colors/add");
    const newTheme: ColorTheme = {
      name: newColorName,
      colors: generateColorSchemes("#0062ba", colorMetadata),
      colorMetadata,
    };
    addColor(newTheme, colorType);
    setActiveColorTheme(
      colors[colorType].length,
      colorType,
      newTheme,
      ColorService.convert("hex", "#0062ba")
    );
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
              onClick={() => setActivePane("lightness")}
            >
              <CogIcon title="tannhjul" fontSize="1.6rem" />
              Globale innstillinger
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

          <div className={classes.group}>
            <div className={classes.groupHeader}>
              <Heading data-size="2xs">Severity</Heading>
            </div>
            <div className={classes.colors}>
              {colors.severity.map((colorTheme, index) => (
                <ColorInput
                  key={index}
                  color={colorTheme.colors.light[11].hex}
                  name={colorTheme.name}
                  onClick={() => setupEditState(colorTheme, index, "severity")}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {activePane === "lightness" && (
        <LightnessPane onBackClicked={() => setActivePane("colors")} />
      )}

      {activePane.startsWith("colors/") && (
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
                colors: generateColorSchemes(
                  initialColor as CssColor,
                  colorMetadata
                ),
                colorMetadata,
              },
              activeColorTheme.index,
              activeColorTheme.type
            );
          }}
        />
      )}
    </div>
  );
};
