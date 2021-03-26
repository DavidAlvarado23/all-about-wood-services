import React, { useState, useEffect, useCallback } from "react";
import Img from "gatsby-image";
import { graphql } from "gatsby";

import styles from "../styles/services.module.css";
import Title from "../components/Title";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import SEO from "../components/SEO";

import { chunkArray } from "../utils";

const imageWidth = 520;

const Services = ({ data }) => {
  const [imageLayout, setImageLayout] = useState([]);
  const images = data.servicesImages.edges.map(
    (edge) => edge.node.childImageSharp.fluid
  );

  const createImagesLayout = useCallback(() => {
    const width = window.innerWidth;
    const columnsNumber = Math.floor(width / imageWidth);
    const numberOfColumn = columnsNumber > 0 ? columnsNumber : 1;

    const layout = chunkArray(images, numberOfColumn);

    setImageLayout(layout);
  }, [images, setImageLayout]);

  useEffect(() => {
    createImagesLayout();

    // If window resizes the layout will be created again
    window.addEventListener("resize", createImagesLayout);
    return () => window.removeEventListener("resize", createImagesLayout);
  }, []);

  return (
    <>
      <SEO
        title="Services"
        description="A list of images showing our different services and works done."
      />
      <Header minified />
      <Title>Our Services</Title>
      <div className={styles.imageList}>
        {imageLayout.map((column, i) => (
          <div key={i} className={styles.imageListColumn}>
            {column.map((image, i) => (
              <Img
                key={`Image${i}`}
                fluid={image}
                alt={`Service Gallery ${i}`}
              />
            ))}
          </div>
        ))}
      </div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export const query = graphql`
  query {
    servicesImages: allFile(filter: { relativeDirectory: { eq: "services" } }) {
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

export default Services;
