import { useThemeStore } from "store";
import { ColorRow } from "../ColorRow/ColorRow";
import classes from "./Colors.module.css";
import { Divider } from "@digdir/designsystemet-react";
import { ColorHeadings } from "../ColorHeadings/ColorHeadings";

export const Colors = () => {
  const colors = useThemeStore((state) => state.colors);
  const internalColorScheme = useThemeStore(
    (state) => state.internalColorScheme
  );

  return (
    <div>
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
      </div>
    </div>
  );
};
