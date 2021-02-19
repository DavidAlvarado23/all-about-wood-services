import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import Img from "gatsby-image";

import Title from "../Title";
import styles from "./index.module.css";

const Section = ({ rightImage, children }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { eq: "banner.jpg" } }) {
        edges {
          node {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  const bannerImage = data.allFile.edges[0].node.childImageSharp.fluid;
  return (
    <div className={styles.container}>
      <BackgroundImage
        className={styles.leftPane}
        fluid={bannerImage}
        preserveStackingContext
      >
        {children}
      </BackgroundImage>
      <Img className={styles.rightPane} fluid={rightImage} />
    </div>
  );
};

export default Section;
