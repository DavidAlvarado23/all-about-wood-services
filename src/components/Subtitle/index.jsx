import React from "react";

import { colors } from "../../styles";
import styles from "./index.module.css";

const Subtitle = ({ children }) => {
  return (
    <h2 className={styles.title} style={{ color: colors.white }}>
      {children}
    </h2>
  );
};

export default Subtitle;
