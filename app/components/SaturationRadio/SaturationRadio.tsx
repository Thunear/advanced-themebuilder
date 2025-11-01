import type { ColorTheme } from "store";
import classes from "./SaturationRadio.module.css";
import cl from "clsx/lite";

type SaturationRadioProps = {
  title: string;
  colorScheme: ColorTheme;
  gradientColors: `#${string}`[];
  onClick: () => void;
  value: string;
};

export const SaturationRadio = ({
  title,
  colorScheme,
  onClick,
  value,
  gradientColors,
}: SaturationRadioProps) => {
  return (
    <div
      className={cl(
        classes.box,
        value ===
          colorScheme.colorMetadata["background-default"].interpolation &&
          classes.activeBox
      )}
      onClick={onClick}
    >
      <div className={classes.title}>{title}</div>
      <div
        className={classes.gradient}
        style={{
          background: `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]}, ${gradientColors[2]})`,
        }}
      ></div>
    </div>
  );
};
