import { Button, Heading, ToggleGroup } from "@digdir/designsystemet-react";
import { generateColorSchemes, getBaseDarkLightness } from "../../../colors";
import { ChevronLeftIcon, PaletteIcon } from "@navikt/aksel-icons";
import { useEffect, useState } from "react";
import { useThemeStore } from "../../../store";
import {
  ColorSchemeSwitch,
  ColorThemeSwitcher,
  LightnessInput,
} from "../../components";
import { SaturationPane } from "../SaturationPane/SaturationPane";
import classes from "./AdvancedColorPane.module.css";

type AdvancedColorPaneProps = {
  onBackClicked: () => void;
};

export const AdvancedColorPane = ({
  onBackClicked,
}: AdvancedColorPaneProps) => {
  const internalColorScheme = useThemeStore(
    (state) => state.internalColorScheme
  );
  const setInternalColorScheme = useThemeStore(
    (state) => state.setInternalColorScheme
  );
  const [saturationPage, setSaturationPage] = useState(false);
  const activeColorTheme = useThemeStore((state) => state.activeColorTheme);
  const setActiveColorTheme = useThemeStore(
    (state) => state.setActiveColorTheme
  );
  const updateColorTheme = useThemeStore((state) => state.updateColorTheme);
  const [baseDarkLightness, setBaseDarkLightness] = useState(-1);

  const handleStepChange = (value: number) => {
    if (activeColorTheme) {
      activeColorTheme.colorTheme.colorMetadata["base-default"].baseModifier[
        internalColorScheme
      ] = value;
      const colors = generateColorSchemes(
        activeColorTheme.colorTheme.colors.light[11].hex,
        activeColorTheme.colorTheme.colorMetadata
      );

      updateColorTheme(
        {
          ...activeColorTheme.colorTheme,
          colors,
        },
        activeColorTheme.index,
        activeColorTheme.type
      );
    }
  };

  useEffect(() => {
    setBaseDarkLightness(
      parseInt(
        getBaseDarkLightness(
          activeColorTheme.colorTheme.colors.light[11].hex
        ).toFixed(2)
      )
    );
  }, [activeColorTheme]);
  return (
    <div>
      {saturationPage && (
        <SaturationPane onBackClicked={() => setSaturationPage(false)} />
      )}

      {!saturationPage && (
        <>
          <div className={classes.header}>
            <Button
              data-size="sm"
              variant="tertiary"
              onClick={() => {
                onBackClicked();
              }}
              className={classes.back}
            >
              <ChevronLeftIcon aria-hidden fontSize="1.5rem" /> Gå tilbake
            </Button>

            <ColorThemeSwitcher />
          </div>

          <Heading data-size="xs" className={classes.heading}>
            Avanserte fargeinnstillinger
          </Heading>

          <div className={classes.group}>
            <button
              className={classes.btn}
              onClick={() => setSaturationPage(true)}
            >
              <PaletteIcon title="a11y-title" fontSize="1.55rem" />
              Velg fargemetning for fargene
            </button>
          </div>

          <Heading data-size="2xs" className={classes.subHeading}>
            Instillinger for Base fargene
          </Heading>

          <ColorSchemeSwitch />

          <div className={classes.group}>
            <LightnessInput
              label="Base lightness økning/minking"
              description="Velg hvor mye lightness som skal øke eller minske for hvert steg for Base Hover- og Active fargene."
              value={
                activeColorTheme.colorTheme.colorMetadata["base-default"]
                  .baseModifier[internalColorScheme] ?? 8
              }
              initialValue={8}
              onChange={(value) => handleStepChange(value)}
              onReset={(value) => handleStepChange(value)}
            />
          </div>
          {internalColorScheme === "dark" && (
            <div className={classes.group}></div>
          )}
        </>
      )}
    </div>
  );
};
