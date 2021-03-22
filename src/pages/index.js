import * as React from "react";
import { graphql, Link } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import Img from "gatsby-image";
import { Carousel } from "antd";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Subtitle from "../components/Subtitle";
import WoodButton from "../components/WoodButton";
import ServiceImage from "../components/ServiceImage";

import styles from "../styles/index.module.css";
import { colors } from "../styles";
import { capitalize } from "../utils";
import { Media } from "../utils/Media";

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
  const aboutUsImage = data.aboutUsImage.edges[0].node.childImageSharp.fluid;
  const rightArrow = data.rightArrow.edges[0].node.childImageSharp.fixed;

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
            <h1 style={{ fontWeight: "bold" }}>All About Wood Services</h1>
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
        <Media lessThan="md">
          <Carousel
            autoplay
            dots={false}
            style={{ paddingTop: 90, paddingBottom: 64 }}
          >
            {carouselImages.map((service) => (
              <div>
                <ServiceImage image={service.image} title={service.title} />
              </div>
            ))}
          </Carousel>
        </Media>
        <Media greaterThanOrEqual="md">
          <div className={styles.carousel}>
            {carouselImages.map((service) => (
              <ServiceImage image={service.image} title={service.title} />
            ))}
          </div>
        </Media>
        <WoodButton showArrow linkTo={"/services"}>
          Check all our services
        </WoodButton>
      </BackgroundImage>
      <Section>
        <Media lessThan="md">
          <Subtitle>About us</Subtitle>
          <p style={{ color: colors.white }}>
            We are a company that was born with the desire to grow day by day,
            working as a team providing an excellent service to our clients.
          </p>
          <Link
            className={styles.aboutUsLearnMore}
            to={"/about"}
            style={{ color: colors.white }}
          >
            <b>Learn more</b>
            <Img fixed={rightArrow} />
          </Link>
        </Media>
        <Media greaterThanOrEqual="md">
          {(mediaClassNames, renderChildren) => {
            return (
              <div
                className={mediaClassNames}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  paddingTop: "40px",
                  paddingBottom: "40px",
                }}
              >
                {renderChildren ? (
                  <>
                    <div className={styles.aboutUsImageContainer}>
                      <Img
                        fluid={aboutUsImage}
                        className={styles.aboutUsImage}
                      />
                    </div>
                    <div
                      className={styles.aboutUsTextContainer}
                      style={{ color: colors.white }}
                    >
                      <Subtitle>About us</Subtitle>
                      <p>
                        We are a company that was born with the desire to grow
                        day by day, working as a team providing an excellent
                        service to our clients.
                      </p>
                      <Link
                        className={styles.aboutUsLearnMore}
                        to={"/about"}
                        style={{ color: colors.white }}
                      >
                        <b>Learn more</b>
                        <Img fixed={rightArrow} />
                      </Link>
                    </div>
                  </>
                ) : null}
              </div>
            );
          }}
        </Media>
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

    aboutUsImage: allFile(
      filter: { relativePath: { eq: "home_about_us.jpg" } }
    ) {
      edges {
        node {
          childImageSharp {
            fluid(fit: CONTAIN) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }

    rightArrow: allFile(filter: { relativePath: { eq: "right_arrow.png" } }) {
      edges {
        node {
          childImageSharp {
            fixed(
              height: 12
              width: 7
              fit: FILL
              duotone: { highlight: "#000000", shadow: "#ffffff" }
            ) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
