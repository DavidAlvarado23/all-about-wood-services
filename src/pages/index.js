import * as React from "react";
import { graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Subtitle from "../components/Subtitle";
import WoodButton from "../components/WoodButton";

import styles from "../styles/index.module.css";
import { colors } from "../styles";

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
          <div style={{ marginBottom: 50 }}>
            <h1>All About Wood Services</h1>
            <h2 style={{ fontWeight: 800 }}>Kansas City, KS</h2>
          </div>
          <WoodButton showArrow linkTo={"/quote"}>
            Get Your Free Quote
          </WoodButton>
        </div>
      </BackgroundImage>
      <Section rightImage={sectionRightImage}>
        <Subtitle>What we do</Subtitle>
        <div style={{ color: colors.white }}>
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
      <BackgroundImage
        className={styles.ourServices}
        fluid={backgroundBanner}
        preserveStackingContext
      >
        <WoodButton isButton={false} style={{ padding: 0, maxWidth: "40rem" }}>
          <h2 className={styles.ourServicesTitle}>Our Services</h2>
        </WoodButton>
        <div>Images components</div>
        <WoodButton showArrow linkTo={"/services"}>
          Check all our services
        </WoodButton>
      </BackgroundImage>
      <Section>About us Section</Section>
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
            fluid {
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
            fluid(fit: CONTAIN, maxHeight: 700, jpegQuality: 100) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
