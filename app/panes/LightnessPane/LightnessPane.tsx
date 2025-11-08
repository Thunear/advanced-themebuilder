import {
  Button,
  Heading,
  Paragraph,
  ToggleGroup,
} from "@digdir/designsystemet-react";
import { colorMetadata, type ColorMetadata } from "../../../colors";
import { ChevronLeftIcon } from "@navikt/aksel-icons";
import { useThemeStore } from "../../../store";
import {
  ColorSchemeSwitch,
  LightnessInput,
  LightnessPresetInput,
} from "../../components";
import classes from "./LightnessPane.module.css";
import { lightnessPresets } from "colors/lightnessPresets";

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
  const activeLightPreset = useThemeStore((state) => state.activeLightPreset);
  const setActiveLightPreset = useThemeStore(
    (state) => state.setActiveLightPreset
  );
  const activeDarkPreset = useThemeStore((state) => state.activeDarkPreset);
  const setActiveDarkPreset = useThemeStore(
    (state) => state.setActiveDarkPreset
  );

  const handleLightnessChange = (
    value: number,
    colorMetadata: ColorMetadata
  ) => {
    ["main", "neutral", "support", "severity"].forEach((category) => {
      colors[category as keyof typeof colors].forEach((colorTheme, i) => {
        colorTheme.colorMetadata[colorMetadata.name].lightness[
          internalColorScheme
        ] = value;
        updateColorTheme(
          colorTheme,
          i,
          category as "main" | "neutral" | "support" | "severity"
        );
      });
    });

    setOnColorThemeChange(onColorThemeChange + 1);
  };

  const handleLightnessPresetChange = (presetKey: string) => {
    const preset = lightnessPresets[internalColorScheme][presetKey].lightness;

    ["main", "neutral", "support", "severity"].forEach((category) => {
      colors[category as keyof typeof colors].forEach((colorTheme, i) => {
        Object.entries(preset).forEach(([colorName, lightnessValue]) => {
          colorTheme.colorMetadata[
            colorName as keyof typeof colorTheme.colorMetadata
          ].lightness[internalColorScheme] = lightnessValue;
        });
        updateColorTheme(
          colorTheme,
          i,
          category as "main" | "neutral" | "support" | "severity"
        );
      });
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
        Endre lyshet på fargene
      </Heading>
      <Paragraph data-size="sm" className={classes.description}>
        Juster på HSLuv lightness for fargene. Dette vil påvirke alle fargene på
        tvers av fargeskalaer.
      </Paragraph>
      <ColorSchemeSwitch />

      <Heading data-size="2xs" className={classes.subHeading}>
        Velg en forhåndsinnstilling for lyshet
      </Heading>

      <div className={classes.presets}>
        {Object.keys(lightnessPresets[internalColorScheme]).map((presetKey) => {
          return (
            <LightnessPresetInput
              onClick={() => {
                handleLightnessPresetChange(presetKey);
                if (internalColorScheme === "light") {
                  setActiveLightPreset(presetKey as any);
                } else {
                  setActiveDarkPreset(presetKey as any);
                }
              }}
              key={presetKey}
              active={
                internalColorScheme === "light"
                  ? activeLightPreset === presetKey
                  : activeDarkPreset === presetKey
              }
              colors={
                lightnessPresets[internalColorScheme][presetKey].lightness
              }
              type={presetKey as "d-aa" | "s-aa" | "d-aaa" | "s-aaa"}
              title={
                (lightnessPresets[internalColorScheme] as any)[presetKey]
                  ?.name || presetKey
              }
            />
          );
        })}
      </div>

      <Heading data-size="2xs" className={classes.subHeading}>
        Juster på lyshet per fargesteg
      </Heading>

      <div className={classes.luminance}>
        <div className={classes.inputs}>
          {Object.values(referenceColorMetadata)
            .filter((colorMetadata) => !colorMetadata.name.includes("base"))
            .map((colorMetadata, refIndex) =>
              refIndex === 11 ? null : (
                <LightnessInput
                  key={refIndex}
                  label={colorMetadata.displayName}
                  oneLiner
                  value={
                    colors.main[0].colorMetadata[colorMetadata.name].lightness[
                      internalColorScheme
                    ]
                  }
                  initialValue={
                    referenceColorMetadata[colorMetadata.name].lightness[
                      internalColorScheme
                    ]
                  }
                  onChange={(value) => {
                    handleLightnessChange(value, colorMetadata);
                    if (internalColorScheme === "light") {
                      setActiveLightPreset(colorMetadata.name);
                    } else {
                      setActiveDarkPreset(colorMetadata.name);
                    }
                  }}
                  onReset={(value) => {
                    handleLightnessChange(value, colorMetadata);
                    if (internalColorScheme === "light") {
                      setActiveLightPreset(colorMetadata.name);
                    } else {
                      setActiveDarkPreset(colorMetadata.name);
                    }
                  }}
                />
              )
            )}
        </div>
      </div>
    </div>
  );
};
