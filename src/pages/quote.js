import React from "react";
import { graphql } from "gatsby";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactInfo from "../components/contactInfo";

import styles from "../styles/quote.module.css";

const Quote = ({ data }) => {
  const facebookLogo = data.allFile.edges[0].node.childImageSharp.fixed;
  const instagramLogo = data.allFile.edges[1].node.childImageSharp.fixed;
  return (
    <div>
      <Header minified />
      <section className={styles.quoteContainer}>
        <div className={styles.containerColumnLeft}>
          <h2 className={styles.subTitle}>Get a quote</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
            urna magna. Etiam orci augue, gravida eu tempus eget, vehicula in
            tellus. Maecenas in efficitur metus, sed venenatis lectus. Ut
            facilisis euismod nulla, ut fermentum ex vulputate sit amet. Mauris
            dapibus lacus vel nibh maximus pellentesque.
          </p>
          <div className={styles.ContactInfoContainer}>
            <ContactInfo contactIcon={facebookLogo}>
              <a href="">1-456-254-7410</a>
            </ContactInfo>
            <ContactInfo contactIcon={facebookLogo}>
              <a href="">info@allaboutwood.com</a>
            </ContactInfo>
            <ContactInfo contactIcon={facebookLogo}>
              <a href="">All About Wood Services KC</a>
            </ContactInfo>
          </div>
        </div>
        <div className={styles.containerColumnRight}>
          <div className={styles.formContainer}>
            <div className={styles.formElements}>
              <label>
                Name<span className={styles.required}>*</span>
              </label>
              <input type="text" />

              <label>
                Email<span className={styles.required}>*</span>
              </label>
              <input type="text" />
              <label for="email">
                Address<span className={styles.required}>*</span>
              </label>
              <input type="email" placeholder="Address Line" />

              <div className={styles.formAdressContainer}>
                <input type="email" placeholder="City" />
                <input type="email" placeholder="State" />
              </div>

              <label>
                Message<span className={styles.required}>*</span>
              </label>
              <textarea type="email" />
              <button className={styles.submitButton} type="submit">
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export const query = graphql`
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

    bannerFile: allFile(filter: { relativePath: { eq: "banner_filter.png" } }) {
      edges {
        node {
          childImageSharp {
            fluid(pngQuality: 100, fit: CONTAIN) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  }
`;

export default Quote;
