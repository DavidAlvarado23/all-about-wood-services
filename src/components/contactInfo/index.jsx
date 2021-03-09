import React from "react";
import Img from "gatsby-image";
import styles from "./index.module.css";

const contactInfo = ({ contactIcon, children }) => {
  return (
    <div className={styles.contactInfoElement}>
      <Img fixed={contactIcon} className={styles.icon} />
      {children}
    </div>
  );
};

export default contactInfo;
