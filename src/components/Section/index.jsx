import React from "react";
import Img from "gatsby-image";

import { colors } from "../../styles";
import styles from "./index.module.css";

const Section = ({ rightImage, children }) => {
  const rgba = `rgba(${colors.primary.rgb}, 0.9)`;

  return (
    <div
      className={styles.container}
      style={{
        background: `linear-gradient(0deg, ${rgba}, ${rgba})`,
      }}
    >
      {rightImage ? (
        <>
          <div className={styles.leftPane}>{children}</div>
          <Img className={styles.rightPane} fluid={rightImage} />
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default Section;
