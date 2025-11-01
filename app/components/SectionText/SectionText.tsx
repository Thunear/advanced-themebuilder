import { Heading, Paragraph } from "@digdir/designsystemet-react";
import classes from "./SectionText.module.css";

type SectionTextProps = {
  heading: string;
  description: string;
};

export const SectionText = ({ heading, description }: SectionTextProps) => {
  return (
    <div className={classes.section}>
      <Heading data-size="sm">{heading}</Heading>
      <Paragraph className={classes.desc}>{description}</Paragraph>
    </div>
  );
};
