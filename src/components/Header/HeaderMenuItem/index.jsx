import React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

import { colors } from "../../../styles";
import styles from "./index.module.css";

const HeaderMenuItem = ({ linkTo, children, vertical }) => {
  const location = useLocation();

  const active = location.pathname === linkTo;

  if (vertical) {
    return (
      <Link
        to={linkTo}
        className={styles.headerMenuItemVertical}
        style={{
          color: colors.white,
        }}
      >
        <div
          style={{
            height: 40,
            width: 5,
            marginRight: 10,
            backgroundColor: active ? colors.white : colors.primary.hex,
          }}
        />
        {children}
      </Link>
    );
  }

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
