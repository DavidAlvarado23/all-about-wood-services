import React from "react";
import { Link } from "gatsby";

import { colors } from "../../../styles";
import styles from "./index.module.css";

const HeaderMenuItem = ({ linkTo, children }) => {
  return (
    <Link
      to={linkTo}
      className={styles.headerMenuItem}
      style={{ color: colors.white }}
    >
      {children}
    </Link>
  );
};

export default HeaderMenuItem;
