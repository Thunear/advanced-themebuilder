import classes from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={classes.footer}>
      <div className="container">
        <div className={classes.footerContent}>
          <p>Footer content goes here</p>
        </div>
      </div>
    </footer>
  );
}
