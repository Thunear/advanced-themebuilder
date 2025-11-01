import { Heading } from "@digdir/designsystemet-react";
import classes from "./Header.module.css";

export function Header() {
  return (
    <div className={classes.header}>
      <div className="container">
        <Heading level={1} data-size="md">
          Temabygger <span className={classes.tag}>Prototype</span>
        </Heading>
        <img className={classes.img} src="img/header.svg" alt="" />
      </div>
    </div>
  );
}
