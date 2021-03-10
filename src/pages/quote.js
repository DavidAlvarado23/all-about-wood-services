import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactInfo from "../components/contactInfo";

import styles from "../styles/quote.module.css";
import { postQuote } from "../services/postQuote.js";

const Quote = ({ data }) => {
  const facebookLogo = data.allFile.edges[0].node.childImageSharp.fixed;
  const instagramLogo = data.allFile.edges[1].node.childImageSharp.fixed;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [adressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [message, setMessage] = useState("");

  const dataFromForm = {
    name: name,
    email: email,
    addressLine: adressLine,
    city: city,
    state: state,
    message: message,
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    postQuote(dataFromForm);
  };

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
              <a href="tel:+1 913-230-4605">1-456-254-7410</a>
            </ContactInfo>
            <ContactInfo contactIcon={facebookLogo}>
              <a href="mailto:jonnymn_12@hotmail.com">info@allaboutwood.com</a>
            </ContactInfo>
            <ContactInfo contactIcon={facebookLogo}>
              <a
                href="https://www.facebook.com/All-about-Wood-Service-KC-102386658266078"
                target="_blank"
              >
                All About Wood Services KC
              </a>
            </ContactInfo>
          </div>
        </div>
        <div className={styles.containerColumnRight}>
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.formElements}>
              <label>
                Name<span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label>
                Email<span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>
                Address<span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                value={adressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                placeholder="Address Line"
                required
              />

              <div className={styles.formAdressContainer}>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  required
                />
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                  required
                />
              </div>

              <label>
                Message<span className={styles.required}>*</span>
              </label>
              <textarea
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button className={styles.submitButton} type="submit">
                Send
              </button>
            </div>
          </form>
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
