import React, { useState } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
import BackgroundImage from "gatsby-background-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Drawer } from "antd";

import { Media } from "../../utils/Media";
import HeaderMenuItem from "./HeaderMenuItem";
import styles from "./index.module.css";
import { colors } from "../../styles";

const Header = ({ minified }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativePath: { eq: "logo.png" } }) {
        edges {
          node {
            childImageSharp {
              fluid(
                rotate: 90
                maxWidth: 160
                maxHeight: 90
                fit: CONTAIN
                quality: 100
              ) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }

      bannerImage: allFile(
        filter: { relativePath: { eq: "banner_filter.png" } }
      ) {
        edges {
          node {
            childImageSharp {
              fluid(quality: 100, fit: CONTAIN, maxWidth: 3080) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  const content = (
    <>
      <Media lessThan="md">
        {(mediaClassNames, renderChildren) => {
          return (
            <div
              className={mediaClassNames}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {renderChildren ? (
                <>
                  <FontAwesomeIcon
                    icon={faBars}
                    size="3x"
                    color={colors.white}
                    style={{
                      position: "absolute",
                      left: "10vw",
                      cursor: "pointer",
                    }}
                    onClick={() => setDrawerVisible(true)}
                  />
                  <Link to="/">
                    <Img
                      className={styles.logo}
                      fluid={data.allFile.edges[0].node.childImageSharp.fluid}
                    />
                  </Link>
                </>
              ) : null}
            </div>
          );
        }}
      </Media>
      <Media greaterThanOrEqual="md">
        {(mediaClassNames, renderChildren) => {
          return (
            <div
              className={mediaClassNames}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {renderChildren ? (
                <>
                  <Link to="/">
                    <Img
                      className={styles.logo}
                      fluid={data.allFile.edges[0].node.childImageSharp.fluid}
                    />
                  </Link>
                  <div className={styles.menu}>
                    <HeaderMenuItem linkTo={"/"}>Home</HeaderMenuItem>
                    <HeaderMenuItem linkTo={"/services"}>
                      Services
                    </HeaderMenuItem>
                    <HeaderMenuItem linkTo={"/about"}>About</HeaderMenuItem>
                    <HeaderMenuItem linkTo={"/quote"}>Quote</HeaderMenuItem>
                  </div>
                </>
              ) : null}
            </div>
          );
        }}
      </Media>
      <Drawer
        title={
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="2x"
            color={colors.white}
            style={{ cursor: "pointer" }}
            onClick={() => setDrawerVisible(false)}
          />
        }
        placement={"left"}
        maskClosable
        closable={false}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        headerStyle={{ backgroundColor: colors.primary.hex, border: 0 }}
        drawerStyle={{ backgroundColor: colors.primary.hex }}
        bodyStyle={{ display: "flex", flexDirection: "column" }}
      >
        <HeaderMenuItem linkTo={"/"} vertical>
          Home
        </HeaderMenuItem>
        <HeaderMenuItem linkTo={"/services"} vertical>
          Services
        </HeaderMenuItem>
        <HeaderMenuItem linkTo={"/about"} vertical>
          About
        </HeaderMenuItem>
        <HeaderMenuItem linkTo={"/quote"} vertical>
          Quote
        </HeaderMenuItem>
      </Drawer>
    </>
  );

  if (minified) {
    return (
      <header
        className={styles.header}
        style={{
          height: "20vh",
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.69) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
      >
        <BackgroundImage
          className={styles.headerContainer}
          fluid={data.bannerImage.edges[0].node.childImageSharp.fluid}
          preserveStackingContext
          style={{ height: "80%" }}
        >
          {content}
        </BackgroundImage>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>{content}</div>
    </header>
  );
};

export default Header;
