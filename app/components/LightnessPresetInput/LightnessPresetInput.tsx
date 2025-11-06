import classes from "./LightnessPresetInput.module.css";
import cl from "clsx/lite";

type LightnessPresetInputProps = {
  title: string;
  type: "d-aa" | "s-aa" | "d-aaa" | "s-aaa";
  colors: { [key: string]: number };
  onClick: () => void;
  active?: boolean;
};

export const LightnessPresetInput = ({
  title,
  type,
  colors,
  onClick,
  active,
}: LightnessPresetInputProps) => {
  return (
    <div
      className={cl(classes.box, classes[type], active && classes.activeBox)}
      onClick={onClick}
    >
      <div className={classes.title}>{title}</div>
      <div className={classes.colors}>
        <div className={classes.group}>
          <div
            style={{
              backgroundColor: `hsl(0, 0%, ${colors["surface-default"]}%)`,
            }}
            className={cl(classes.color, classes.surfaceDefault)}
          />
          <div
            style={{
              backgroundColor: `hsl(0, 0%, ${colors["surface-tinted"]}%)`,
            }}
            className={cl(classes.color, classes.surfaceTinted)}
          />
          <div
            style={{
              backgroundColor: `hsl(0, 0%, ${colors["surface-hover"]}%)`,
            }}
            className={cl(classes.color, classes.surfaceHover)}
          />
          <div
            style={{
              backgroundColor: `hsl(0, 0%, ${colors["surface-active"]}%)`,
            }}
            className={cl(classes.color, classes.surfaceActive)}
          />
        </div>
        <div className={classes.group}>
          <div
            style={{
              backgroundColor: `hsl(0, 0%, ${colors["border-subtle"]}%)`,
            }}
            className={cl(classes.color, classes.borderSubtle)}
          />
          <div
            style={{
              backgroundColor: `hsl(0, 0%, ${colors["border-default"]}%)`,
            }}
            className={cl(classes.color, classes.borderDefault)}
          />
          <div
            style={{
              backgroundColor: `hsl(0, 0%, ${colors["border-strong"]}%)`,
            }}
            className={cl(classes.color, classes.borderStrong)}
          />
        </div>
        <div className={classes.group}>
          <div
            style={{ backgroundColor: `hsl(0, 0%, ${colors["text-subtle"]}%)` }}
            className={cl(classes.color, classes.textSubtle)}
          />
          <div
            style={{
              backgroundColor: `hsl(0, 0%, ${colors["text-default"]}%)`,
            }}
            className={cl(classes.color, classes.textDefault)}
          />
        </div>
      </div>
    </div>
  );
};
