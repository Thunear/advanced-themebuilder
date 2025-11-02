import {
  Button,
  Heading,
  Paragraph,
  ToggleGroup,
} from "@digdir/designsystemet-react";
import type { ColorMetadata } from "../../../colors";
import { ChevronLeftIcon } from "@navikt/aksel-icons";
import { useThemeStore } from "../../../store";
import { LightnessInput, LightnessPresetInput } from "../../components";
import classes from "./LightnessPane.module.css";

type LightnessPageProps = {
  onBackClicked: () => void;
};

export const LightnessPane = ({ onBackClicked }: LightnessPageProps) => {
  const referenceColorMetadata = useThemeStore(
    (state) => state.referenceColorMetadata
  );
  const internalColorScheme = useThemeStore(
    (state) => state.internalColorScheme
  );
  const setInternalColorScheme = useThemeStore(
    (state) => state.setInternalColorScheme
  );
  const onColorThemeChange = useThemeStore((state) => state.onColorThemeChange);
  const setOnColorThemeChange = useThemeStore(
    (state) => state.setOnColorThemeChange
  );
  const updateColorTheme = useThemeStore((state) => state.updateColorTheme);
  const colors = useThemeStore((state) => state.colors);

  const handleLightnessChange = (value: number, color: ColorMetadata) => {
    colors.main.map((colorTheme, i) => {
      colorTheme.colorMetadata[color.name].lightness[internalColorScheme] =
        value;
      updateColorTheme(colorTheme, i, "main");
    });
    colors.neutral.map((colorTheme, i) => {
      colorTheme.colorMetadata[color.name].lightness[internalColorScheme] =
        value;
      updateColorTheme(colorTheme, i, "neutral");
    });
    colors.support.map((colorTheme, i) => {
      colorTheme.colorMetadata[color.name].lightness[internalColorScheme] =
        value;
      updateColorTheme(colorTheme, i, "support");
    });
    colors.severity.map((colorTheme, i) => {
      colorTheme.colorMetadata[color.name].lightness[internalColorScheme] =
        value;
      updateColorTheme(colorTheme, i, "severity");
    });

    setOnColorThemeChange(onColorThemeChange + 1);
  };

  return (
    <div className={classes.page}>
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
      <Heading className={classes.heading} data-size="xs">
        Juster på lightness (lyshet)
      </Heading>
      <Paragraph data-size="sm" className={classes.description}>
        Juster på HSLuv lightness for fargene. Dette vil påvirke alle fargene på
        tvers av fargeskalaer.
      </Paragraph>
      <ToggleGroup
        value={internalColorScheme}
        name="toggle-group-nuts"
        data-size="sm"
        data-color="neutral"
        className="subtle-toggle-group"
        data-variant="secondary"
        onChange={(value) => {
          setInternalColorScheme(value as "light" | "dark");
        }}
      >
        <ToggleGroup.Item value="light">Lys modus</ToggleGroup.Item>
        <ToggleGroup.Item value="dark">Mørk modus</ToggleGroup.Item>
      </ToggleGroup>

      <Heading data-size="2xs" className={classes.subHeading}>
        Velg preset
      </Heading>

      <div className={classes.presets}>
        <LightnessPresetInput title="Dimmed (AA)" />
        <LightnessPresetInput title="Strong (AA)" />
        <LightnessPresetInput title="Dimmed (AAA)" />
        <LightnessPresetInput title="Strong (AAA)" />
      </div>

      <Heading data-size="2xs" className={classes.subHeading}>
        Juster på lyshet per farge
      </Heading>

      <div className={classes.luminance}>
        <div className={classes.inputs}>
          {Object.values(referenceColorMetadata)
            .filter((color) => !color.name.includes("base"))
            .map((color, refIndex) =>
              refIndex === 11 ? null : (
                <LightnessInput
                  key={refIndex}
                  label={color.displayName}
                  oneLiner
                  value={
                    colors.main[0].colorMetadata[color.name].lightness[
                      internalColorScheme
                    ]
                  }
                  initialValue={
                    referenceColorMetadata[color.name].lightness[
                      internalColorScheme
                    ]
                  }
                  onChange={(value) => {
                    handleLightnessChange(value, color);
                  }}
                  onReset={(value) => {
                    handleLightnessChange(value, color);
                  }}
                />
              )
            )}
        </div>
      </div>
    </div>
  );
};
