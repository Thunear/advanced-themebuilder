import classes from "./LightnessPresetInput.module.css";

type LightnessPresetInputProps = {
  title: string;
};

export const LightnessPresetInput = ({ title }: LightnessPresetInputProps) => {
  return (
    <div className={classes.box}>
      <div className={classes.title}>{title}</div>
      <div className={classes.gradient}></div>
    </div>
  );
};
