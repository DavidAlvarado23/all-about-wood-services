import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import BackgroundImage from "gatsby-background-image";

import HeaderMenuItem from "./HeaderMenuItem";
import styles from "./index.module.css";

const Header = ({ minified }) => {
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

      bannerImage: allFile(
        filter: { relativePath: { eq: "banner_filter.png" } }
      ) {
        edges {
          node {
            childImageSharp {
              fluid(pngQuality: 100, fit: CONTAIN) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  const content = (
    <>
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
    </>
  );

  if (minified) {
    return (
      <header
        className={styles.header}
        style={{
          height: "20vh",
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.69) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
      >
        <BackgroundImage
          className={styles.headerContainer}
          fluid={data.bannerImage.edges[0].node.childImageSharp.fluid}
          preserveStackingContext
          style={{ height: "80%" }}
        >
          {content}
        </BackgroundImage>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>{content}</div>
    </header>
  );
};

export default Header;
