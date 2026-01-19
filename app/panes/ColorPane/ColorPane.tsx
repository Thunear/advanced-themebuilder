import {
  type CssColor,
  RESERVED_COLORS,
  generateColorSchemes,
  generateDecorativeColors,
} from "../../../colors";
import {
  Button,
  Heading,
  Paragraph,
  Textfield,
} from "@digdir/designsystemet-react";
import {
  ArrowCirclepathReverseIcon,
  ChevronLeftIcon,
  CogIcon,
  NotePencilIcon,
  TrashIcon,
} from "@navikt/aksel-icons";
import { ColorPicker, ColorService, type IColor } from "react-color-palette";
import { useThemeStore, type PaneType } from "../../../store";

import cl from "clsx/lite";
import { useState } from "react";
import { AdvancedColorPane } from "../AdvancedColorPane/AdvancedColorPane";
import classes from "./ColorPane.module.css";
import { ColorOverridePane } from "../ColorOverridePane/ColorOverridePane";
import { ColorSchemeSwitch } from "~/components";

type ColorPaneProps = {
  onClose: () => void;
  type: PaneType;
  onCancel: () => void;
  onRemove: () => void;
};

export const ColorPane = ({
  onClose,
  type,
  onCancel,
  onRemove,
}: ColorPaneProps) => {
  const mainColors = useThemeStore((state) => state.colors.main);
  const [colorError, setColorError] = useState("");
  const [advancedColors, setAdvancedColors] = useState(false);
  const [showOverridePane, setShowOverridePane] = useState(false);
  const decorativeSteps = useThemeStore((state) => state.decorativeSteps);
  const decorativeStartLightness = useThemeStore(
    (state) => state.decorativeStartLightness
  );
  const decorativeEndLightness = useThemeStore(
    (state) => state.decorativeEndLightness
  );
  const onColorThemeChange = useThemeStore((state) => state.onColorThemeChange);
  const updateColorTheme = useThemeStore((state) => state.updateColorTheme);
  const internalColorScheme = useThemeStore(
    (state) => state.internalColorScheme
  );

  const activeColorTheme = useThemeStore((state) => state.activeColorTheme);
  const setActiveColorTheme = useThemeStore(
    (state) => state.setActiveColorTheme
  );

  const getHeading = () => {
    const t = activeColorTheme.type === "main" ? "hovedfarge" : "støttefarge";
    if (type === "colors/add") {
      return "Legg til " + t;
    }
    return activeColorTheme.type === "main"
      ? "Rediger farge"
      : `Rediger ${activeColorTheme.colorTheme.name}`;
  };

  const checkNameIsValid = () => {
    if (
      activeColorTheme.type === "neutral" ||
      activeColorTheme.type === "severity"
    )
      return true;

    if (activeColorTheme.colorTheme.name === "") {
      setColorError("Navnet på fargen kan ikke være tomt");
      return false;
    }

    if (
      RESERVED_COLORS.includes(activeColorTheme.colorTheme.name.toLowerCase())
    ) {
      setColorError(
        "Navnet på fargen kan ikke være det samme som våre systemfarger"
      );
      return false;
    }
    setColorError("");
    return true;
  };

  const closeTab = () => {
    setColorError("");
    onClose();
  };

  const handleChange = (color: IColor) => {
    const newLightColor =
      internalColorScheme === "light" ? color : activeColorTheme.lightColor;
    const newDarkColor =
      internalColorScheme === "dark" ? color : activeColorTheme.darkColor;

    const updatedColors = generateColorSchemes({
      lightColor:
        internalColorScheme === "light"
          ? (color.hex as CssColor)
          : (activeColorTheme.lightColor.hex as CssColor),
      darkColor:
        internalColorScheme === "dark"
          ? (color.hex as CssColor)
          : (activeColorTheme.darkColor?.hex as CssColor) || undefined,
      colorMetaData: activeColorTheme.colorTheme.colorMetadata,
    });

    // Preserve colorOverride values from the existing theme
    const preservedColors = {
      light: updatedColors.light.map((newColor, index) => ({
        ...newColor,
        colorOverride:
          activeColorTheme.colorTheme.colors.light[index]?.colorOverride || "",
      })),
      dark: updatedColors.dark.map((newColor, index) => ({
        ...newColor,
        colorOverride:
          activeColorTheme.colorTheme.colors.dark[index]?.colorOverride || "",
      })),
    };

    const updatedTheme = {
      ...activeColorTheme.colorTheme,
      decorativeColors: generateDecorativeColors(
        color.hex as CssColor,
        decorativeSteps,
        decorativeStartLightness,
        decorativeEndLightness,
        activeColorTheme.colorTheme.colorMetadata["background-default"]
          .interpolation
      ),
      colors: preservedColors,
      lightColor: newLightColor,
      darkColor: newDarkColor,
    };

    setActiveColorTheme(
      activeColorTheme.index,
      activeColorTheme.type,
      updatedTheme,
      newLightColor,
      newDarkColor
    );
    updateColorTheme(
      updatedTheme,
      activeColorTheme.index,
      activeColorTheme.type
    );
  };

  return (
    <div
      className={cl(classes.colorPage, type.includes("color") && classes.show)}
    >
      {!advancedColors && !showOverridePane && (
        <>
          <div className={classes.topBtnGroup}>
            <Button
              data-size="sm"
              variant="tertiary"
              onClick={() => {
                /* Check here as well to disable sending new color */
                if (!checkNameIsValid()) return;
                closeTab();
              }}
              className={classes.back}
            >
              <ChevronLeftIcon aria-hidden fontSize="1.5rem" /> Farger
            </Button>
            <Button
              data-size="sm"
              variant="tertiary"
              data-color="neutral"
              hidden={type !== "colors/edit"}
              onClick={() => {
                onCancel();
              }}
              className={classes.cancel}
            >
              Avbryt
            </Button>
            <Button
              data-size="sm"
              variant="tertiary"
              data-color="danger"
              onClick={() => {
                onRemove();
              }}
              className={cl(classes.removeBtn)}
              hidden={
                activeColorTheme.type === "neutral" ||
                activeColorTheme.type === "severity" ||
                (activeColorTheme.type === "main" && mainColors.length <= 1)
              }
            >
              Fjern farge
              <TrashIcon title="søppelkasse" fontSize="1.5rem" />
            </Button>
          </div>
          <Heading data-size="xs" className={classes.title}>
            {getHeading()}
          </Heading>
          {/* {showAlert() && (
            <div className={classes.alert}>
              Fargen har lav kontrast mot en eller flere av overflatefargene som
              påvirker bruken. Les mer om hva dette betyr på kontrast siden.
            </div>
          )} */}
          {activeColorTheme.type === "neutral" ||
            (activeColorTheme.type === "severity" && (
              <Paragraph data-size="sm" className={classes.desc}>
                Du kan ikke endre navnet på denne fargen.
              </Paragraph>
            ))}
          {activeColorTheme.type !== "neutral" &&
            activeColorTheme.type !== "severity" && (
              <Textfield
                placeholder="Skriv navnet her..."
                label="Navn"
                description="Bruk kun bokstavene a-z, tall og bindestrek"
                className={classes.name}
                data-size="sm"
                value={activeColorTheme.colorTheme.name}
                onChange={(e) => {
                  const value = e.currentTarget.value
                    .replace(/\s+/g, "-")
                    .replace(/[^A-Z0-9-]+/gi, "")
                    .toLowerCase();
                  const updatedTheme = {
                    ...activeColorTheme.colorTheme,
                    name: value,
                    lightColor: activeColorTheme.lightColor,
                    darkColor: activeColorTheme.darkColor,
                  };
                  setActiveColorTheme(
                    activeColorTheme.index,
                    activeColorTheme.type,
                    updatedTheme,
                    activeColorTheme.lightColor,
                    activeColorTheme.darkColor
                  );
                  updateColorTheme(
                    updatedTheme,
                    activeColorTheme.index,
                    activeColorTheme.type
                  );
                }}
                onBlur={checkNameIsValid}
                error={colorError}
              />
            )}
          <div className={classes.label}>Velg Farge</div>

          <ColorSchemeSwitch />

          <div className={classes.colorPreviewContainer}>
            <div
              style={{
                backgroundColor:
                  internalColorScheme === "light"
                    ? (activeColorTheme.lightColor.hex as string)
                    : activeColorTheme.darkColor
                    ? (activeColorTheme.darkColor.hex as string)
                    : activeColorTheme.colorTheme.colors.dark[11].hex,
              }}
              className={classes.colorPreview}
            ></div>
          </div>
          <ColorPicker
            hideAlpha
            color={
              internalColorScheme === "light"
                ? activeColorTheme.lightColor
                : activeColorTheme.darkColor ||
                  ColorService.convert(
                    "hex",
                    activeColorTheme.colorTheme.colors.dark[11].hex
                  )
            }
            onChange={(color: IColor) => {
              handleChange(color);
            }}
            hideInput={["rgb", "hsv"]}
            onChangeComplete={(color) => {}}
          />

          {internalColorScheme === "dark" && activeColorTheme.darkColor && (
            <div>
              <Button
                className={classes.resetButton}
                data-size="sm"
                data-color="danger"
                variant="tertiary"
                onClick={() => {
                  const updatedColors = generateColorSchemes({
                    lightColor: activeColorTheme.lightColor.hex as CssColor,
                    darkColor: undefined,
                    colorMetaData: activeColorTheme.colorTheme.colorMetadata,
                  });

                  const updatedTheme = {
                    ...activeColorTheme.colorTheme,
                    colors: updatedColors,
                    lightColor: activeColorTheme.lightColor,
                    darkColor: undefined,
                  };

                  setActiveColorTheme(
                    activeColorTheme.index,
                    activeColorTheme.type,
                    updatedTheme,
                    activeColorTheme.lightColor,
                    undefined
                  );
                  updateColorTheme(
                    updatedTheme,
                    activeColorTheme.index,
                    activeColorTheme.type
                  );
                }}
              >
                <ArrowCirclepathReverseIcon
                  title="a11y-title"
                  fontSize="1.5rem"
                />
                Fjern overstyring av mørk modus
              </Button>
            </div>
          )}

          <Button
            className={classes.overrideBtn}
            variant="tertiary"
            data-size="sm"
            data-color="neutral"
            onClick={() => setShowOverridePane(true)}
          >
            <NotePencilIcon title="tannhjul" fontSize="1.5rem" />
            Overstyr fargesteg manuelt
          </Button>
          <Button
            className={classes.advancedBtn}
            variant="tertiary"
            data-size="sm"
            data-color="neutral"
            onClick={() => setAdvancedColors(true)}
          >
            <CogIcon title="tannhjul" fontSize="1.5rem" />
            Avanserte fargeinnstillinger
          </Button>
        </>
      )}

      {advancedColors && (
        <AdvancedColorPane onBackClicked={() => setAdvancedColors(false)} />
      )}
      {showOverridePane && (
        <ColorOverridePane onBackClicked={() => setShowOverridePane(false)} />
      )}
    </div>
  );
};
