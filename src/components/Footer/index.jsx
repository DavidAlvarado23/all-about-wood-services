import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import BackgroundImage from "gatsby-background-image";

import { Media } from "../../utils/Media";
import styles from "./index.module.css";
import { socials } from "../../utils";

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          relativePath: { in: ["facebook_logo.png", "instagram_logo.png"] }
        }
      ) {
        edges {
          node {
            childImageSharp {
              fixed(width: 30, height: 30) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }

      bannerFile: allFile(
        filter: { relativePath: { eq: "banner_filter.png" } }
      ) {
        edges {
          node {
            childImageSharp {
              fluid(maxWidth: 3080, quality: 100) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  `);

  const facebookLogo = data.allFile.edges[0].node.childImageSharp.fixed;
  const instagramLogo = data.allFile.edges[1].node.childImageSharp.fixed;

  return (
    <footer className={styles.footer}>
      <BackgroundImage
        className={styles.footerImage}
        fluid={data.bannerFile.edges[0].node.childImageSharp.fluid}
        preserveStackingContext
      >
        <div className={styles.footerContainer}>
          <Media lessThan="md">
            <div className={styles.text}>
              © 2021 All About Wood Services
              <br /> All right reserved
            </div>
          </Media>
          <Media greaterThanOrEqual="md">
            <div>© 2021 All About Wood Services | All right reserved</div>
          </Media>
          <div className={styles.snContainer}>
            <a href={socials.facebook} target="_blank" rel="noreferrer">
              <Img fixed={facebookLogo} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <Img style={{ marginLeft: 30 }} fixed={instagramLogo} />
            </a>
          </div>
        </div>
      </BackgroundImage>
    </footer>
  );
};

export default Footer;
