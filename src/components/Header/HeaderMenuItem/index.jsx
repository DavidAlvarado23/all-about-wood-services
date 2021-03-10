import React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

import { colors } from "../../../styles";
import styles from "./index.module.css";

const HeaderMenuItem = ({ linkTo, children }) => {
  const location = useLocation();

  const active = location.pathname === linkTo;

  return (
    <Link
      to={linkTo}
      className={styles.headerMenuItem}
      style={{ color: colors.white }}
    >
      {children}
      {active && <div style={{ marginBottom: 10 }} />}
      {active && (
        <hr
          className={styles.hr}
          style={{
            backgroundColor: colors.secondary.hex,
            borderColor: colors.secondary.hex,
          }}
        />
      )}
    </Link>
  );
};

export default HeaderMenuItem;
