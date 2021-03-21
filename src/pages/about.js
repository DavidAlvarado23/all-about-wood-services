import * as React from "react";
import Img from "gatsby-image";
import { graphql } from "gatsby";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";

import styles from "../styles/about.module.css";
import { Media } from "../utils/Media";
import { colors } from "../styles";

const About = ({ data }) => {
  const sectionRightImage =
    data.sectionRightImage.edges[0].node.childImageSharp.fluid;
  const aboutUsSectionImage =
    data.aboutUsSectionImage.edges[0].node.childImageSharp.fluid;
  return (
    <div>
      <Header minified />
      <Title>About Us</Title>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutFirstColumn}>
          <Img className={styles.image} fluid={aboutUsSectionImage} />
        </div>
        <div className={styles.aboutSecondColumn}>
          <p>
            We are a company that was born with the desire to grow day by day,
            working as a team providing an excellent service to our clients.
          </p>
        </div>
      </div>
      <Section rightImage={sectionRightImage}>
        <Subtitle>Mission</Subtitle>
        <div style={{ color: colors.white }}>
          <p>
            Reach the expectations of each of our clients in each job. Maintain
            teamwork to grow day by day.
          </p>
        </div>
        <Subtitle>Vision</Subtitle>
        <div style={{ color: colors.white }}>
          <p>
            Being a recognized company in the Kansas City area, because of our
            responsibility, commitment, and honesty.
          </p>
        </div>
      </Section>

      <Footer />
    </div>
  );
};
export const query = graphql`
  query {
    aboutUsSectionImage: allFile(
      filter: { relativePath: { eq: "about_us_image_1.jpg" } }
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

    sectionRightImage: allFile(
      filter: { relativePath: { eq: "about_us_image_2.jpg" } }
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

export default About;
