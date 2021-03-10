import React from "react";
import Img from "gatsby-image";

import styles from "./index.module.css";
import { colors } from "../../styles";

const ServiceImage = ({ image, title }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.imageRing}
        style={{ border: `2px solid ${colors.white}` }}
      >
        <Img fluid={image} className={styles.image} />
      </div>
      <hr
        className={styles.hr}
        style={{ backgroundColor: colors.white, borderColor: colors.white }}
      />
      <h4 className={styles.title} style={{ color: colors.white }}>
        {title}
      </h4>
    </div>
  );
};

export default ServiceImage;
