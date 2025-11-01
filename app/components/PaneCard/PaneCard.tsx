import React from "react";
import clsx from "clsx/lite";
import classes from "./PaneCard.module.css";

interface CardProps {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  blurry?: boolean;
}

export const PaneCard = ({ title, icon, onClick, blurry }: CardProps) => {
  return (
    <div
      className={clsx(classes.card, blurry ? classes.blurry : "")}
      onClick={onClick}
    >
      <div className={classes.icon}>{icon}</div>
      <div>{title}</div>
    </div>
  );
};
