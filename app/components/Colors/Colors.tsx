import { useThemeStore } from "store";
import { ColorRow } from "../ColorRow/ColorRow";
import classes from "./Colors.module.css";
import { Divider } from "@digdir/designsystemet-react";
import { ColorHeadings } from "../ColorHeadings/ColorHeadings";
import { SectionText } from "../SectionText/SectionText";
import {
  generateColorSchemes,
  getBaseDarkLightness,
  type ColorMetadataByName,
  type CssColor,
  type ThemeInfo,
} from "colors";
import { useEffect } from "react";

export const Colors = () => {
  const colors = useThemeStore((state) => state.colors);
  const internalColorScheme = useThemeStore(
    (state) => state.internalColorScheme
  );
  const showSeverityColors = useThemeStore((state) => state.showSeverityColors);

  return (
    <div>
      <SectionText
        heading="Her ser du fargeskalaene dine"
        description="Det er 4 grupper av farger: Main, Neutral, Support og Severity. 
        Hver gruppe inneholder en eller flere fargeskalaer som består av 16 nyanser hver. Merk at du kan ikke endre navn på Neutral skalaen."
      />
      <div className={classes.section} data-color-scheme={internalColorScheme}>
        <ColorHeadings />
        {colors.main.map((color, index) => (
          <div key={index} className={classes.row}>
            <div className={classes.rowLabel}>{color.name}</div>
            <ColorRow
              colorScale={color.colors}
              showColorMeta={false}
              namespace={color.name}
            />
          </div>
        ))}
        <Divider />
        {colors.neutral.map((color, index) => (
          <div key={index} className={classes.row}>
            <div className={classes.rowLabel}>{color.name}</div>
            <ColorRow
              colorScale={color.colors}
              showColorMeta={false}
              namespace={color.name}
            />
          </div>
        ))}
        <Divider />
        {colors.support.map((color, index) => (
          <div key={index} className={classes.row}>
            <div className={classes.rowLabel}>{color.name}</div>
            <ColorRow
              colorScale={color.colors}
              showColorMeta={false}
              namespace={color.name}
            />
          </div>
        ))}
        {showSeverityColors && (
          <>
            <Divider />
            {colors.severity.map((color, index) => (
              <div key={index} className={classes.row}>
                <div className={classes.rowLabel}>{color.name}</div>
                <ColorRow
                  colorScale={color.colors}
                  showColorMeta={false}
                  namespace={color.name}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
