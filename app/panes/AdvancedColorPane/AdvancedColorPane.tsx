import {
  Button,
  Dropdown,
  Heading,
  ToggleGroup,
} from "@digdir/designsystemet-react";
import {
  type CssColor,
  generateColorSchemes,
  getBaseDarkLightness,
} from "../../../colors";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  PaletteIcon,
} from "@navikt/aksel-icons";
import { useEffect, useState } from "react";
import { useThemeStore } from "../../../store";
import { LightnessInput } from "../../components";
import { SaturationPane } from "../SaturationPane/SaturationPane";
import classes from "./AdvancedColorPane.module.css";
import { ColorService } from "react-color-palette";

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
  const getColorTheme = useThemeStore((state) => state.getColorTheme);
  const [saturationPage, setSaturationPage] = useState(false);
  const activeColorTheme = useThemeStore((state) => state.activeColorTheme);
  const setActiveColorTheme = useThemeStore(
    (state) => state.setActiveColorTheme
  );
  const updateColorTheme = useThemeStore((state) => state.updateColorTheme);
  const [baseDarkLightness, setBaseDarkLightness] = useState(-1);
  const colors = useThemeStore((state) => state.colors);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

            <Dropdown.TriggerContext>
              <Dropdown.Trigger
                data-size="sm"
                data-color="neutral"
                variant="tertiary"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={classes.dropdown}
              >
                <div
                  className={classes.color}
                  style={{
                    backgroundColor:
                      activeColorTheme.colorTheme.colors.light[11].hex,
                  }}
                ></div>
                <div className={classes.colorName}>
                  {activeColorTheme.colorTheme.name}
                </div>
                {dropdownOpen ? (
                  <ChevronUpIcon aria-hidden />
                ) : (
                  <ChevronDownIcon aria-hidden />
                )}
              </Dropdown.Trigger>
              <Dropdown
                data-size="sm"
                data-color="neutral"
                open={dropdownOpen}
                onClose={() => setDropdownOpen(false)}
              >
                <Dropdown.List>
                  <Dropdown.Item>
                    {colors.main.map((colorTheme, index) => (
                      <Dropdown.Button
                        onClick={() => {
                          setActiveColorTheme(
                            index,
                            "main",
                            colorTheme,
                            ColorService.convert(
                              "hex",
                              colorTheme.colors.light[11].hex
                            )
                          );
                          setDropdownOpen(false);
                        }}
                        key={index}
                      >
                        {colorTheme.name}
                      </Dropdown.Button>
                    ))}
                    {colors.support.map((colorTheme, index) => (
                      <Dropdown.Button
                        onClick={() => {
                          setActiveColorTheme(
                            index,
                            "support",
                            colorTheme,
                            ColorService.convert(
                              "hex",
                              colorTheme.colors.light[11].hex
                            )
                          );
                          setDropdownOpen(false);
                        }}
                        key={index}
                      >
                        {colorTheme.name}
                      </Dropdown.Button>
                    ))}
                  </Dropdown.Item>
                </Dropdown.List>
              </Dropdown>
            </Dropdown.TriggerContext>
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

          <ToggleGroup
            value={internalColorScheme}
            name="toggle-group-nuts"
            data-size="sm"
            data-color="neutral"
            variant="secondary"
            className="subtle-toggle-group"
            onChange={(value) => {
              setInternalColorScheme(value as "light" | "dark");
            }}
          >
            <ToggleGroup.Item value="light">Lys modus</ToggleGroup.Item>
            <ToggleGroup.Item value="dark">Mørk modus</ToggleGroup.Item>
          </ToggleGroup>

          <div className={classes.group}>
            {internalColorScheme === "dark" && (
              <LightnessInput
                label="Base Default lightness"
                description="Som standard blir lightness for Base Default fargen satt til det motsatt av det den er i lys modus."
                value={
                  activeColorTheme.colorTheme.colorMetadata["base-default"]
                    .lightness[internalColorScheme] === -1
                    ? baseDarkLightness
                    : activeColorTheme.colorTheme.colorMetadata["base-default"]
                        .lightness[internalColorScheme] ?? baseDarkLightness
                }
                initialValue={baseDarkLightness}
                onChange={(value) => {
                  if (activeColorTheme) {
                    activeColorTheme.colorTheme.colorMetadata[
                      "base-default"
                    ].lightness[internalColorScheme] = value;
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
                }}
                onReset={() => {
                  const test = getBaseDarkLightness(
                    activeColorTheme.colorTheme.colors.light[11].hex
                  ).toFixed(2);
                  if (activeColorTheme) {
                    activeColorTheme.colorTheme.colorMetadata[
                      "base-default"
                    ].lightness.dark = parseInt(test);
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
                }}
              />
            )}

            <LightnessInput
              label="Steg modifikator"
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
