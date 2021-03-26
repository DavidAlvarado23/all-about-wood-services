import React from "react";
import Img from "gatsby-image";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const contactInfo = ({ contactIcon, children, isIcon }) => {
  return (
    <div className={styles.contactInfoElement}>
      {isIcon ? (
        <FontAwesomeIcon icon={contactIcon} size="2x" />
      ) : (
        <Img fixed={contactIcon} className={styles.icon} alt="Contact Icon" />
      )}

      {children}
    </div>
  );
};

export default contactInfo;
