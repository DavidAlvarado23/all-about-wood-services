import * as React from "react";
import { graphql, Link } from "gatsby";
import BackgroundImage from "gatsby-background-image";

import WoodButton from "../components/WoodButton";

const NotFoundPage = ({ data }) => {
  const backgroundBanner = data.allFile.edges[0].node.childImageSharp.fluid;

  return (
    <BackgroundImage
      style={{
        height: "100vh",
        display: "flex",
      }}
      fluid={backgroundBanner}
      preserveStackingContext
    >
      <div
        style={{ display: "flex", flexDirection: "column", padding: "20vh 10%" }}
      >
        <h1 style={{ fontSize: "5em", margin: 0 }}>404</h1>
        <h2 style={{ fontSize: "4em", margin: 0 }}>Page not found.</h2>
        <WoodButton isButton linkTo="/" style={{ margin: 0, marginTop: 20 }}>
          Back to home
        </WoodButton>
      </div>
    </BackgroundImage>
  );
};

export const query = graphql`
  query {
    allFile(filter: { relativePath: { eq: "banner_filter.png" } }) {
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
`;

export default NotFoundPage;
