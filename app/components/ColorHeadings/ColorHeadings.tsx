import classes from "./ColorHeadings.module.css";

export const ColorHeadings = () => {
  return (
    <div className={classes.headings}>
      <div className={classes.group} style={{ flex: 2 }}>
        <div className={classes.title}>Background</div>
        <div className={classes.labels}>
          <div className={classes.label}>Default</div>
          <div className={classes.label}>Tinted</div>
        </div>
      </div>
      <div className={classes.group} style={{ flex: 4 }}>
        <div className={classes.title}>Surface</div>
        <div className={classes.labels}>
          <div className={classes.label}>Default</div>
          <div className={classes.label}>Tinted</div>
          <div className={classes.label}>Hover</div>
          <div className={classes.label}>Active</div>
        </div>
      </div>
      <div className={classes.group} style={{ flex: 3 }}>
        <div className={classes.title}>Border</div>
        <div className={classes.labels}>
          <div className={classes.label}>Subtle</div>
          <div className={classes.label}>Default</div>
          <div className={classes.label}>Strong</div>
        </div>
      </div>
      <div className={classes.group} style={{ flex: 2 }}>
        <div className={classes.title}>Text</div>
        <div className={classes.labels}>
          <div className={classes.label}>Subtle</div>
          <div className={classes.label}>Default</div>
        </div>
      </div>
      <div className={classes.group} style={{ flex: 5 }}>
        <div className={classes.title}>Base</div>
        <div className={classes.labels}>
          <div className={classes.label}>Default</div>
          <div className={classes.label}>Hover</div>
          <div className={classes.label}>Active</div>
          <div className={classes.label}>Contrast Subtle</div>
          <div className={classes.label}>Contrast Default</div>
        </div>
      </div>
    </div>
  );
};
