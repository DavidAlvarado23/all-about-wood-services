import React from "react";

import styles from "./index.module.css";

const HeaderMenuItem = ({ children }) => {
  return <div className={styles.headerMenuItem}>{children}</div>;
};

export default HeaderMenuItem;
