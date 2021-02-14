import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import BackgroundImage from "gatsby-background-image";

import styles from "./index.module.css";

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

      bannerFile: allFile(filter: { relativePath: { eq: "banner.jpg" } }) {
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
          <div>© 2021 All About Wood Services | All right reserved</div>
          <div className={styles.snContainer}>
            <a
              href="https://www.facebook.com/All-about-Wood-Service-KC-102386658266078"
              target="_blank"
            >
              <Img fixed={facebookLogo} />
            </a>
            <a href="https://www.instagram.com" target="_blank">
              <Img style={{ marginLeft: 30 }} fixed={instagramLogo} />
            </a>
          </div>
        </div>
      </BackgroundImage>
    </footer>
  );
};

export default Footer;
