import React, { useState } from "react";
import { graphql } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { Input } from "antd";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactInfo from "../components/ContactInfo";

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
        <div className={styles.introductionContainer}>
          <h2 className={styles.subTitle}>Get a quote</h2>
          <p>
            Get a free quote filling the form with your personal data and we'll
            get in touch with you in the following business days
          </p>
        </div>
        <div className={styles.ContactInfoContainer}>
          <h3 className={styles.getInTouchTitle}>Get in Touch</h3>
          <ContactInfo contactIcon={faPhone} isIcon>
            <a href="tel:+1 913-230-4605">1-456-254-7410</a>
          </ContactInfo>
          <ContactInfo contactIcon={faEnvelope} isIcon>
            <a href="mailto:jonnymn_12@hotmail.com">info@allaboutwood.com</a>
          </ContactInfo>
          <ContactInfo contactIcon={facebookLogo}>
            <a href={socials.facebook} target="_blank" rel="noreferrer">
              All About Wood Services KC
            </a>
          </ContactInfo>
        </div>

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.formElements}>
            <label htmlFor="name">
              Name<span className={styles.required}>*</span>
            </label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              name="name"
              onChange={onFormChange}
              required
            />

            <label htmlFor="email">
              Email<span className={styles.required}>*</span>
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              name="email"
              onChange={onFormChange}
              required
            />
            <label htmlFor="addressLine">Address</label>
            <Input
              id="addressLine"
              type="text"
              value={formData.addressLine}
              name="addressLine"
              onChange={onFormChange}
              placeholder="Address Line"
            />

            <div className={styles.formAdressContainer}>
              <Input
                type="text"
                value={formData.addressCity}
                name="addressCity"
                onChange={onFormChange}
                placeholder="City"
              />
              <Input
                type="text"
                value={formData.addressState}
                name="addressState"
                onChange={onFormChange}
                placeholder="State"
              />
            </div>

            <label htmlFor="message">
              Message<span className={styles.required}>*</span>
            </label>
            <Input.TextArea
              id="message"
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
