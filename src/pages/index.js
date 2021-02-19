import * as React from "react";
import { graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Title from "../components/Title";

import styles from "../styles/index.module.css";

const IndexPage = ({ data }) => {
  const backgroundBanner = data.allFile.edges[0].node.childImageSharp.fluid;
  const sectionRightImage =
    data.sectionRightImage.edges[0].node.childImageSharp.fluid;

  return (
    <div>
      <BackgroundImage
        className={styles.backgroundBanner}
        fluid={backgroundBanner}
        preserveStackingContext
      >
        <Header />
        <div className={styles.title}>
          <h1>All About Wood Services</h1>
          <h2>
            We are a company dedicated to the construction, creation and
            renovation of wooden spaces, which we seek to satisfy each client
            with our work
          </h2>
        </div>
      </BackgroundImage>
      <Section rightImage={sectionRightImage}>
        <Title>What we do</Title>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet
            neque lorem. Nulla aliquet, nisi sit amet condimentum vestibulum,
            dolor erat facilisis mauris, at pulvinar mi dolor a orci. Nunc ut
            lacus enim. In vel rutrum nibh, id viverra sem.
          </p>
          <p>
            Ut ornare egestas est. Phasellus ac magna ullamcorper, sollicitudin
            lacus in, vehicula ante. Aenean et dapibus elit. In aliquet purus eu
            auctor scelerisque. Vestibulum nec malesuada risus, ut posuere
            lorem. Aliquam metus nisi, laoreet ut mollis ac, finibus ac lorem.
          </p>
        </div>
      </Section>
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

    sectionRightImage: allFile(
      filter: { relativePath: { eq: "works_image_1.jpg" } }
    ) {
      edges {
        node {
          childImageSharp {
            fluid(fit: CONTAIN, maxHeight: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
