import * as React from "react";
import { graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Subtitle from "../components/Subtitle";
import WoodButton from "../components/WoodButton";
import ServiceImage from "../components/ServiceImage";

import styles from "../styles/index.module.css";
import { colors } from "../styles";
import { capitalize } from "../utils";

const IndexPage = ({ data }) => {
  const backgroundBanner = data.allFile.edges[0].node.childImageSharp.fluid;
  const sectionRightImage =
    data.sectionRightImage.edges[0].node.childImageSharp.fluid;
  const carouselImages = data.carouselImages.edges.map((edge) => ({
    image: edge.node.childImageSharp.fluid,
    title: capitalize(
      edge.node.childImageSharp.fluid.originalName.split(".")[0]
    ),
  }));

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
            Our company it is dedicated in repair rotted wood around windows,
            facias, soffits, doors, and anything made of wood. Our services also
            include painting, priming, and caulking, we bring all our services
            in the area of Kansas City.
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
        <div className={styles.carousel}>
          {carouselImages.map((service) => (
            <ServiceImage image={service.image} title={service.title} />
          ))}
        </div>
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

    carouselImages: allFile(filter: { relativeDirectory: { eq: "carousel" } }) {
      edges {
        node {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
              originalName
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
