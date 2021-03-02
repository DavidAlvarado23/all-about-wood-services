import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import HeaderMenuItem from "./HeaderMenuItem";
import styles from "./index.module.css";

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { eq: "logo.png" } }) {
        edges {
          node {
            childImageSharp {
              fluid(
                rotate: 90
                maxWidth: 160
                maxHeight: 90
                fit: CONTAIN
                pngQuality: 90
              ) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  `);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Img
          className={styles.logo}
          fluid={data.allFile.edges[0].node.childImageSharp.fluid}
        />
        <div className={styles.menu}>
          <HeaderMenuItem linkTo={"/"}>Home</HeaderMenuItem>
          <HeaderMenuItem linkTo={"/services"}>Services</HeaderMenuItem>
          <HeaderMenuItem linkTo={"/about"}>About</HeaderMenuItem>
          <HeaderMenuItem linkTo={"/quote"}>Quote</HeaderMenuItem>
        </div>
      </div>
    </header>
  );
};

export default Header;
