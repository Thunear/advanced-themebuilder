import {
  type CssColor,
  RESERVED_COLORS,
  generateColorSchemes,
} from "../../../colors";
import {
  Button,
  Heading,
  Paragraph,
  Textfield,
} from "@digdir/designsystemet-react";
import {
  ChevronLeftIcon,
  CogIcon,
  NotePencilIcon,
  TrashIcon,
} from "@navikt/aksel-icons";
import { ColorPicker, type IColor } from "react-color-palette";
import { useThemeStore, type PaneType } from "../../../store";

import cl from "clsx/lite";
import { useState } from "react";
import { AdvancedColorPane } from "../AdvancedColorPane/AdvancedColorPane";
import classes from "./ColorPane.module.css";
import { ColorOverridePane } from "../ColorOverridePane/ColorOverridePane";

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
  const updateColorTheme = useThemeStore((state) => state.updateColorTheme);

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
                  setActiveColorTheme(
                    activeColorTheme.index,
                    activeColorTheme.type,
                    {
                      ...activeColorTheme.colorTheme,
                      name: value,
                    },
                    activeColorTheme.color
                  );
                  updateColorTheme(
                    {
                      ...activeColorTheme.colorTheme,
                      name: value,
                    },
                    activeColorTheme.index,
                    activeColorTheme.type
                  );
                }}
                onBlur={checkNameIsValid}
                error={colorError}
              />
            )}
          <div className={classes.label}>Farge</div>
          <div className={classes.colorPreviewContainer}>
            <div
              style={{
                backgroundColor:
                  activeColorTheme.colorTheme.colors.light[11].hex,
              }}
              className={classes.colorPreview}
            ></div>
          </div>
          <ColorPicker
            hideAlpha
            color={activeColorTheme.color}
            onChange={(color: IColor) => {
              const updatedColors = generateColorSchemes(
                color.hex as CssColor,
                activeColorTheme.colorTheme.colorMetadata
              );

              setActiveColorTheme(
                activeColorTheme.index,
                activeColorTheme.type,
                {
                  ...activeColorTheme.colorTheme,
                  colors: updatedColors,
                },
                color
              );
              updateColorTheme(
                {
                  ...activeColorTheme.colorTheme,
                  colors: updatedColors,
                },
                activeColorTheme.index,
                activeColorTheme.type
              );
            }}
            hideInput={["rgb", "hsv"]}
            onChangeComplete={(color) => {}}
          />
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
