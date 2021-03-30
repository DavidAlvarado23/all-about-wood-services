import React from "react";
import Img from "gatsby-image";

import { Media } from "../../utils/Media";
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
      <Media lessThan="md">
        {(mediaClassNames, renderChildren) => {
          return (
            <div className={mediaClassNames} style={{ padding: 50 }}>
              {renderChildren ? children : null}
            </div>
          );
        }}
      </Media>
      <Media greaterThanOrEqual="md">
        {(mediaClassNames, renderChildren) => {
          return (
            <div
              className={mediaClassNames}
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              {renderChildren ? (
                rightImage ? (
                  <>
                    <div className={styles.leftPane}>{children}</div>
                    <Img
                      className={styles.rightPane}
                      fluid={rightImage}
                      alt="Right Section"
                    />
                  </>
                ) : (
                  <>{children}</>
                )
              ) : null}
            </div>
          );
        }}
      </Media>
    </div>
  );
};

export default Section;
