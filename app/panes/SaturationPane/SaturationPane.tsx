import {
  Button,
  Heading,
  Paragraph,
  ToggleGroup,
} from "@digdir/designsystemet-react";
import {
  type CssColor,
  type InterpolationMode,
  generateColorSchemes,
  getLuminanceFromLightness,
} from "../../../colors";
import { ChevronLeftIcon } from "@navikt/aksel-icons";
import { type ColorTheme, useThemeStore } from "../../../store";
import { ColorThemeSwitcher, SaturationRadio, Slider } from "../../components";
import classes from "./SaturationPane.module.css";
import { useEffect, useState } from "react";
import chroma from "chroma-js";
import cl from "clsx/lite";

type SaturationPaneProps = {
  onBackClicked: () => void;
};

export const SaturationPane = ({ onBackClicked }: SaturationPaneProps) => {
  const getColorTheme = useThemeStore((state) => state.getColorTheme);
  const updateColorTheme = useThemeStore((state) => state.updateColorTheme);
  const activeColorTheme = useThemeStore((state) => state.activeColorTheme);
  const setActiveColorTheme = useThemeStore(
    (state) => state.setActiveColorTheme
  );
  const internalColorScheme = useThemeStore(
    (state) => state.internalColorScheme
  );
  const setInternalColorScheme = useThemeStore(
    (state) => state.setInternalColorScheme
  );
  const [gradientColors, setGradientColors] = useState<{
    rgb: CssColor[];
    oklch: CssColor[];
    lab: CssColor[];
    hsl: CssColor[];
  }>({
    rgb: ["#ffffff" as CssColor, "#000000" as CssColor, "#ff0000" as CssColor],
    oklch: [
      "#ffffff" as CssColor,
      "#000000" as CssColor,
      "#ff0000" as CssColor,
    ],
    lab: ["#ffffff" as CssColor, "#000000" as CssColor, "#ff0000" as CssColor],
    hsl: ["#ffffff" as CssColor, "#000000" as CssColor, "#ff0000" as CssColor],
  });

  const updateGradientColors = () => {
    const activeColor =
      activeColorTheme.colorTheme.colors[internalColorScheme][11].hex;
    const lightnessValues =
      internalColorScheme === "light" ? [90, 50, 25] : [25, 50, 90];

    const updatedGradientColors = { ...gradientColors };

    for (const key in gradientColors) {
      if (Object.prototype.hasOwnProperty.call(gradientColors, key)) {
        const value = gradientColors[key as keyof typeof gradientColors];
        updatedGradientColors[key as keyof typeof gradientColors] = value.map(
          (color, i) =>
            chroma(activeColor)
              .luminance(
                getLuminanceFromLightness(lightnessValues[i]),
                key as InterpolationMode
              )
              .hex() as CssColor
        );
      }
    }

    setGradientColors(updatedGradientColors);
  };

  useEffect(() => {
    updateGradientColors();
  }, [activeColorTheme, internalColorScheme]);

  const handleSaturationChange = (value: number, type: string) => {
    const colorTheme = getColorTheme(
      activeColorTheme.index,
      activeColorTheme.type
    );
    if (!colorTheme) return;

    for (const key of Object.keys(colorTheme.colorMetadata) as Array<
      keyof typeof colorTheme.colorMetadata
    >) {
      if (key.startsWith(type)) {
        activeColorTheme.colorTheme.colorMetadata[key].saturation[
          internalColorScheme
        ] = percentToValue(value);
      }
    }

    const updatedColors = generateColorSchemes({
      lightColor: (colorTheme.lightColor?.hex ||
        colorTheme.colors.light[11].hex) as CssColor,
      darkColor: colorTheme.darkColor?.hex as CssColor | undefined,
      colorMetaData: colorTheme.colorMetadata,
    });

    // Preserve colorOverride values from the existing theme
    const preservedColors = {
      light: updatedColors.light.map((newColor, index) => ({
        ...newColor,
        colorOverride: colorTheme.colors.light[index]?.colorOverride || "",
      })),
      dark: updatedColors.dark.map((newColor, index) => ({
        ...newColor,
        colorOverride: colorTheme.colors.dark[index]?.colorOverride || "",
      })),
    };

    updateColorTheme(
      {
        ...colorTheme,
        colors: preservedColors,
        lightColor: colorTheme.lightColor,
        darkColor: colorTheme.darkColor,
      },
      activeColorTheme.index,
      activeColorTheme.type
    );
  };

  const percentToValue = (percent: number) => {
    return percent / 100 + 1;
  };

  const valueToPercent = (value: number) => {
    return Math.round((value - 1) * 100);
  };

  const updateActiveColorTheme = (interpolation: string) => {
    for (const metadata of Object.values(
      activeColorTheme.colorTheme.colorMetadata
    )) {
      metadata.interpolation = interpolation as InterpolationMode;
    }

    const colors = generateColorSchemes({
      lightColor: (activeColorTheme.colorTheme.lightColor?.hex ||
        activeColorTheme.colorTheme.colors.light[11].hex) as CssColor,
      darkColor: activeColorTheme.colorTheme.darkColor?.hex as
        | CssColor
        | undefined,
      colorMetaData: activeColorTheme.colorTheme.colorMetadata,
    });

    // Preserve colorOverride values from the existing theme
    const preservedColors = {
      light: colors.light.map((newColor, index) => ({
        ...newColor,
        colorOverride:
          activeColorTheme.colorTheme.colors.light[index]?.colorOverride || "",
      })),
      dark: colors.dark.map((newColor, index) => ({
        ...newColor,
        colorOverride:
          activeColorTheme.colorTheme.colors.dark[index]?.colorOverride || "",
      })),
    };

    updateColorTheme(
      {
        ...activeColorTheme.colorTheme,
        colors: preservedColors,
        lightColor: activeColorTheme.colorTheme.lightColor,
        darkColor: activeColorTheme.colorTheme.darkColor,
      },
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
          <ChevronLeftIcon aria-hidden fontSize="1.5rem" /> Avanserte
          innstillinger
        </Button>

        <ColorThemeSwitcher />
      </div>

      <Heading data-size="xs" className={classes.heading}>
        Fargemetning
      </Heading>
      <Paragraph data-size="sm">
        Her kan du justere fargemetningen for de ulike fargene i temaet ditt.
      </Paragraph>

      <ToggleGroup
        value={internalColorScheme}
        name="toggle-group-nuts"
        data-size="sm"
        data-color="neutral"
        data-variant="secondary"
        className={classes.toggleGroup}
        onChange={(value) => {
          setInternalColorScheme(value as "light" | "dark");
        }}
      >
        <ToggleGroup.Item value="light">Lys modus</ToggleGroup.Item>
        <ToggleGroup.Item value="dark">Mørk modus</ToggleGroup.Item>
      </ToggleGroup>

      <Heading data-size="2xs" className={classes.subHeading}>
        Fargeblandingsrom
      </Heading>

      <Paragraph data-size="sm">
        Velg hvilket fargerom som skal brukes til å blande mellom fargene i
        skalaen. Dette påvirker hvordan nyanser endrer seg mellom fargestegene.
      </Paragraph>

      <div className={classes.saturationRadios}>
        <SaturationRadio
          title="RGB"
          value="rgb"
          colorScheme={activeColorTheme.colorTheme}
          gradientColors={gradientColors.rgb}
          onClick={() => {
            updateActiveColorTheme("rgb");
          }}
        />
        <SaturationRadio
          title="OKLCH"
          value="oklch"
          colorScheme={activeColorTheme.colorTheme}
          gradientColors={gradientColors.oklch}
          onClick={() => {
            updateActiveColorTheme("oklch");
          }}
        />
        <SaturationRadio
          title="LAB"
          value="lab"
          colorScheme={activeColorTheme.colorTheme}
          gradientColors={gradientColors.lab}
          onClick={() => {
            updateActiveColorTheme("lab");
          }}
        />
        <SaturationRadio
          title="HSL"
          value="hsl"
          colorScheme={activeColorTheme.colorTheme}
          gradientColors={gradientColors.hsl}
          onClick={() => {
            updateActiveColorTheme("hsl");
          }}
        />
      </div>

      <Heading data-size="2xs" className={classes.subHeading}>
        Finjustering av fargemetning
      </Heading>

      <div className={classes.group}>
        <div className={cl(classes.pop)}></div>
        <Slider
          label="Background fargene"
          min={-50}
          max={50}
          initialValue={internalColorScheme === "light" ? 0 : -30}
          value={valueToPercent(
            activeColorTheme.colorTheme.colorMetadata["background-default"]
              .saturation[internalColorScheme] ?? 0
          )}
          onReset={(value) => {
            handleSaturationChange(value, "background");
          }}
          onChange={(value) => {
            handleSaturationChange(value, "background");
          }}
          onMouseDown={() => {}}
        />
        <Slider
          label="Surface fargene"
          min={-50}
          max={50}
          initialValue={internalColorScheme === "light" ? 0 : -30}
          value={valueToPercent(
            activeColorTheme.colorTheme.colorMetadata["surface-default"]
              .saturation[internalColorScheme] ?? 0
          )}
          onChange={(value) => {
            handleSaturationChange(value, "surface");
          }}
          onReset={(value) => {
            handleSaturationChange(value, "surface");
          }}
        />
        <Slider
          label="Border fargene"
          min={-50}
          max={50}
          initialValue={internalColorScheme === "light" ? 0 : -20}
          value={valueToPercent(
            activeColorTheme.colorTheme.colorMetadata["border-subtle"]
              .saturation[internalColorScheme] ?? 0
          )}
          onChange={(value) => {
            handleSaturationChange(value, "border");
          }}
          onReset={(value) => {
            handleSaturationChange(value, "border");
          }}
        />
        <Slider
          label="Text fargene"
          min={-50}
          max={50}
          initialValue={internalColorScheme === "light" ? 0 : -20}
          value={valueToPercent(
            activeColorTheme.colorTheme.colorMetadata["text-default"]
              .saturation[internalColorScheme] ?? 0
          )}
          onChange={(value) => {
            handleSaturationChange(value, "text");
          }}
          onReset={(value) => {
            handleSaturationChange(value, "text");
          }}
        />
        <Slider
          label="Base fargene"
          min={-50}
          max={50}
          initialValue={internalColorScheme === "light" ? 0 : -30}
          value={valueToPercent(
            activeColorTheme.colorTheme.colorMetadata["base-default"]
              .saturation[internalColorScheme] ?? 0
          )}
          onChange={(value) => {
            handleSaturationChange(value, "base");
          }}
          onReset={(value) => {
            handleSaturationChange(value, "base");
          }}
        />
      </div>
    </div>
  );
};
