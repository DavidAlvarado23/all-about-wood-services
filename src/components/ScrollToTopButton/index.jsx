import React, { useEffect, useState } from "react";
import Img from "gatsby-image";
import { useStaticQuery, graphql } from "gatsby";

import { colors } from "../../styles";
import styles from "./index.module.css";

const ScrollToTopButton = () => {
  const data = useStaticQuery(graphql`
    query {
      rightArrow: allFile(filter: { relativePath: { eq: "right_arrow.png" } }) {
        edges {
          node {
            childImageSharp {
              fixed(
                height: 14
                width: 20
                fit: FILL
                rotate: 270
                duotone: { highlight: "#000000", shadow: "#ffffff" }
              ) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `);

  const [buttonDisplay, setButtonDisplay] = useState("none");
  const container = document.querySelector("#___gatsby");

  const onScroll = () => {
    setButtonDisplay(container.scrollTop > 20 ? "block" : "none");
  };

  useEffect(() => {
    onScroll();

    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
  }, []);

  const toTop = () => {
    container.scrollTop = 0;
  };

  const arrow = data.rightArrow.edges[0].node.childImageSharp.fixed;
  return (
    <div
      className={styles.button}
      style={{ display: buttonDisplay, backgroundColor: colors.primary.hex }}
      onClick={toTop}
    >
      <Img fixed={arrow} />
    </div>
  );
};

export default ScrollToTopButton;
