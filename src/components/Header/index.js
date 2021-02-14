import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import HeaderMenuItem from "./HeaderMenuItem";
import styles from "./index.module.css";

const Header = ({ superimposed }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { eq: "logo.png" } }) {
        edges {
          node {
            childImageSharp {
              fluid(rotate: 90, maxWidth: 160, maxHeight: 90, fit: CONTAIN, pngQuality: 90) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  return (
    <header
      className={styles.header}
      style={superimposed ? { position: "absolute" } : {}}
    >
      <div className={styles.headerContainer}>
        <Img
          className={styles.logo}
          fluid={data.allFile.edges[0].node.childImageSharp.fluid}
        />
        <div className={styles.menu}>
          <HeaderMenuItem>Home</HeaderMenuItem>
          <HeaderMenuItem>Products</HeaderMenuItem>
          <HeaderMenuItem>About</HeaderMenuItem>
        </div>
      </div>
    </header>
  );
};

export default Header;
