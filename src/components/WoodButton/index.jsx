import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import Img from "gatsby-image";
import { Link } from "gatsby";

import styles from "./index.module.css";
import { colors } from "../../styles";

const WoodButton = ({
  showArrow = false,
  style = {},
  isButton = true,
  linkTo,
  children,
}) => {
  const data = useStaticQuery(graphql`
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

      screw: allFile(filter: { relativePath: { eq: "screw.png" } }) {
        edges {
          node {
            childImageSharp {
              fixed(height: 15, width: 15) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }

      rightArrow: allFile(filter: { relativePath: { eq: "right_arrow.png" } }) {
        edges {
          node {
            childImageSharp {
              fixed(height: 20, width: 14, fit: FILL) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `);

  const rgba = `rgba(${colors.secondary.rgb}, 0.8)`;
  const screw = data.screw.edges[0].node.childImageSharp.fixed;
  const rightArrow = data.rightArrow.edges[0].node.childImageSharp.fixed;

  return (
    <BackgroundImage
      className={styles.container}
      fluid={data.allFile.edges[0].node.childImageSharp.fluid}
      preserveStackingContext
      style={{
        background: `linear-gradient(0deg, ${rgba}, ${rgba})`,
        cursor: isButton ? "pointer" : null,
        ...style,
      }}
    >
      <Link
        to={linkTo}
        className={styles.content}
        style={{ color: colors.black }}
      >
        <Img fixed={screw} />
        {children}
        <>
          {showArrow && <Img fixed={rightArrow} />}
          <Img fixed={screw} />
        </>
      </Link>
    </BackgroundImage>
  );
};

export default WoodButton;
