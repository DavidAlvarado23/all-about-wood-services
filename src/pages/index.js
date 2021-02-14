import * as React from "react";
import { graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";

import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "../styles/index.module.css";

const IndexPage = ({ data }) => {
  const backgroundBanner = data.allFile.edges[0].node.childImageSharp.fluid;

  return (
    <div>
      <Header superimposed />
      <BackgroundImage
        className={styles.backgroundBanner}
        fluid={backgroundBanner}
        preserveStackingContext
      >
        <div className={styles.title}>
          <h1>All About Wood Services</h1>
          <h2>
            We are a company dedicated to the construction, creation and
            renovation of wooden spaces, which we seek to satisfy each client
            with our work
          </h2>
        </div>
      </BackgroundImage>
      <Footer />
    </div>
  );
};

export const query = graphql`
  query {
    allFile(filter: { relativePath: { eq: "banner_filter.png" } }) {
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
`;

export default IndexPage;
