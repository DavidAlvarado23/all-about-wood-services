import React, { useState } from "react";
import { graphql } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import Amplify, { API, graphqlOperation } from "aws-amplify";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactInfo from "../components/contactInfo";

import styles from "../styles/quote.module.css";
import awsconfig from "../aws-exports";
import { createQuote } from "../graphql/mutations";
import { socials } from "../utils";

Amplify.configure(awsconfig);

const Quote = ({ data }) => {
  const facebookLogo = data.allFile.edges[0].node.childImageSharp.fixed;

  const formState = {
    name: "",
    email: "",
    addressLine: "",
    addressCity: "",
    addressState: "",
    message: "",
  };
  const [formData, setFormData] = useState(formState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    setLoading(true);
    try {
      const response = await API.graphql(
        graphqlOperation(createQuote, {
          input: {
            ...formData,
          },
        })
      );

      if (response && response.data.createQuote.status === "SUCCESS") {
        setMessage("success");
      } else {
        setMessage("error");
      }
    } catch (err) {
      setMessage("error");
    } finally {
      setLoading(false);
    }
  };

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log({ loading });
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
            <ContactInfo contactIcon={faPhone} isIcon>
              <a href="tel:+1 913-230-4605">1-456-254-7410</a>
            </ContactInfo>
            <ContactInfo contactIcon={faEnvelope} isIcon>
              <a href="mailto:jonnymn_12@hotmail.com">info@allaboutwood.com</a>
            </ContactInfo>
            <ContactInfo contactIcon={facebookLogo}>
              <a href={socials.facebook} target="_blank">
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
                value={formData.name}
                name="name"
                onChange={onFormChange}
                required
              />

              <label>
                Email<span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                name="email"
                onChange={onFormChange}
                required
              />
              <label>Address</label>
              <input
                type="text"
                value={formData.addressLine}
                name="addressLine"
                placeholder="Address Line"
              />

              <div className={styles.formAdressContainer}>
                <input
                  type="text"
                  value={formData.addressCity}
                  name="addressCity"
                  onChange={onFormChange}
                  placeholder="City"
                />
                <input
                  type="text"
                  value={formData.addressState}
                  name="addressState"
                  onChange={onFormChange}
                  placeholder="State"
                />
              </div>

              <label>
                Message<span className={styles.required}>*</span>
              </label>
              <textarea
                type="text"
                value={formData.message}
                name="message"
                onChange={onFormChange}
                required
              />
              <button
                className={styles.submitButton}
                type="submit"
                disabled={loading}
              >
                {loading && (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    style={{ marginRight: 10 }}
                  />
                )}
                Send
              </button>
            </div>
            {message && message === "error" && (
              <div className={styles.responseMessageError}>
                Ups! There was an error sending the quote. Please try again or
                contact with us, we'll be happy to hear from you.
              </div>
            )}
            {message && message === "success" && (
              <div className={styles.responseMessageSuccess}>
                Thank you for sending the quote. We'll make contact with you in
                the following days.
              </div>
            )}
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
            fixed(width: 35, height: 35) {
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
