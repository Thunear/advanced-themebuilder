import { Button, Heading } from "@digdir/designsystemet-react";
import classes from "./ColorOverridePane.module.css";
import { ChevronLeftIcon } from "@navikt/aksel-icons";
import {
  ColorOverrideInput,
  ColorSchemeSwitch,
  ColorThemeSwitcher,
} from "~/components";
import { useThemeStore } from "store";
import type { ColorMetadata } from "colors";

type ColorOverridePaneProps = {
  onBackClicked: () => void;
};

export const ColorOverridePane = ({
  onBackClicked,
}: ColorOverridePaneProps) => {
  const activeColorTheme = useThemeStore((state) => state.activeColorTheme);
  const setActiveColorTheme = useThemeStore(
    (state) => state.setActiveColorTheme
  );
  const internalColorScheme = useThemeStore(
    (state) => state.internalColorScheme
  );
  const updateColorTheme = useThemeStore((state) => state.updateColorTheme);

  const handleOverrideChange = (value: string, color2: ColorMetadata) => {
    const updatedColorTheme = {
      ...activeColorTheme.colorTheme,
      colors: {
        ...activeColorTheme.colorTheme.colors,
        [internalColorScheme]: activeColorTheme.colorTheme.colors[
          internalColorScheme
        ].map((color) =>
          color.name === color2.name
            ? { ...color, colorOverride: value }
            : color
        ),
      },
      colorMetadata: {
        ...activeColorTheme.colorTheme.colorMetadata,
        [color2.name]: {
          ...activeColorTheme.colorTheme.colorMetadata[color2.name],
          colorOverride: value,
        },
      },
    };

    setActiveColorTheme(
      activeColorTheme.index,
      activeColorTheme.type,
      updatedColorTheme,
      activeColorTheme.lightColor
    );
    updateColorTheme(
      updatedColorTheme,
      activeColorTheme.index,
      activeColorTheme.type
    );
  };

  return (
    <div>
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
        Overstyr fargesteg manuelt
      </Heading>

      <ColorSchemeSwitch />

      <div className={classes.overrideInputs}>
        {activeColorTheme.colorTheme.colors[internalColorScheme].map(
          (color, index) => (
            <div key={index}>
              <ColorOverrideInput
                name={color.displayName}
                colorPreview={color.hex}
                value={color.colorOverride}
                initialValue={color.hex}
                onChange={(value) => {
                  handleOverrideChange(value, color);
                }}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};
