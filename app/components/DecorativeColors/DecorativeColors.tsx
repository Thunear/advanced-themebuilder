import { useThemeStore } from "store";
import classes from "./DecorativeColors.module.css";
import { Divider } from "@digdir/designsystemet-react";
import { SectionText } from "../SectionText/SectionText";
import { DecorativeColorRow } from "../DecorativeColorRow/DecorativeColorRow";
import { getLightnessFromHex } from "colors";

export const DecorativeColors = () => {
  const colors = useThemeStore((state) => state.colors);
  const internalColorScheme = useThemeStore(
    (state) => state.internalColorScheme,
  );
  const decorativeSteps = useThemeStore((state) => state.decorativeSteps);
  const decorativeStartLightness = useThemeStore(
    (state) => state.decorativeStartLightness,
  );
  const decorativeEndLightness = useThemeStore(
    (state) => state.decorativeEndLightness,
  );

  return (
    <div className={classes.container}>
      <SectionText
        heading="Dekorative farger"
        description="Dekorative farger kan brukes til illustrasjoner og grafikk. Disse fargene påvirker ikke brukergrensesnittets funksjonalitet eller tilgjengelighet."
      />
      <div className={classes.section} data-color-scheme={internalColorScheme}>
        <div className={classes.labels}>
          {Array.from({ length: decorativeSteps }, (_, index) => {
            const decorativeColor =
              colors.main[0]?.decorativeColors?.[internalColorScheme]?.[index];
            return (
              <div key={index} className={classes.stepLabel}>
                deco-{index + 1}
                <div className={classes.lightnessLabel}>
                  {decorativeColor
                    ? getLightnessFromHex(
                        decorativeColor as `#${string}`,
                      ).toFixed(0)
                    : "-"}
                </div>
              </div>
            );
          })}
        </div>
        {colors.main.map((color, index) => (
          <div key={index} className={classes.row}>
            <div className={classes.rowLabel}>{color.name}</div>
            <DecorativeColorRow colorTheme={color} />
          </div>
        ))}
        <Divider />
        {colors.neutral.map((color, index) => (
          <div key={index} className={classes.row}>
            <div className={classes.rowLabel}>{color.name}</div>
            <DecorativeColorRow colorTheme={color} />
          </div>
        ))}
        <Divider />
        {colors.support.map((color, index) => (
          <div key={index} className={classes.row}>
            <div className={classes.rowLabel}>{color.name}</div>
            <DecorativeColorRow colorTheme={color} />
          </div>
        ))}
      </div>
    </div>
  );
};
