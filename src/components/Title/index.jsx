import React from "react";

import styles from "./index.module.css";

const Title = ({ children, style }) => {
  return (
    <h1 className={styles.title} style={style}>
      {children}
    </h1>
  );
};

export default Title;
