import React, { useState } from "react";
import { graphql } from "gatsby";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { Form, Button, Input, Alert } from "antd";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactInfo from "../components/ContactInfo";
import SEO from "../components/SEO";

import styles from "../styles/quote.module.css";
import awsconfig from "../aws-exports";
import { createQuote } from "../graphql/mutations";
import { socials } from "../utils";

Amplify.configure(awsconfig);

const Quote = ({ data }) => {
  const facebookLogo = data.allFile.edges[0].node.childImageSharp.fixed;
  const instagramLogo = data.allFile.edges[1].node.childImageSharp.fixed;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();

  const handleSubmit = async (formData) => {
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
        form.resetFields();
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

  return (
    <div>
      <SEO
        title="Quote"
        description="Get a free quote filling the form with your personal data and we'll
            get in touch with you in the following business days"
      />
      <Header minified />
      <section className={styles.quoteContainer}>
        <div className={styles.introductionContainer}>
          <h2 className={styles.subTitle}>Get a quote</h2>
          <p>
            Get a free quote filling the form with your personal data and we'll
            get in touch with you in the following business days.
          </p>
        </div>
        <div className={styles.ContactInfoContainer}>
          <h3 className={styles.getInTouchTitle}>Get in Touch</h3>
          <ContactInfo contactIcon={faPhone} isIcon>
            <a href="tel:+1 913-401-9400">+1 913-401-9400</a>
          </ContactInfo>
          <ContactInfo contactIcon={faEnvelope} isIcon>
            <a href="mailto:allaboutwoodservices@hotmail.com">
              allaboutwoodservices@hotmail.com
            </a>
          </ContactInfo>
          <ContactInfo contactIcon={facebookLogo}>
            <a href={socials.facebook} target="_blank" rel="noreferrer">
              All About Wood Services KC
            </a>
          </ContactInfo>
          <ContactInfo contactIcon={instagramLogo}>
            <a href={socials.instagram} target="_blank" rel="noreferrer">
              All About Wood Services KC
            </a>
          </ContactInfo>
        </div>

        <Form
          form={form}
          name="quote"
          onFinish={handleSubmit}
          layout={"vertical"}
          className={styles.formContainer}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email" }]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Address" name="addressLine">
              <Input />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item
                label="State"
                name="addressState"
                style={{ display: "inline-block", width: "calc(50% - 4px)" }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="City"
                name="addressCity"
                style={{
                  display: "inline-block",
                  width: "calc(50% - 4px)",
                  marginLeft: "8px",
                }}
              >
                <Input />
              </Form.Item>
            </Form.Item>
            <Form.Item
              label="Message"
              name="message"
              rules={[
                { required: true, message: "Let us know how we can help" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                className={styles.submitButton}
                loading={loading}
              >
                Submit
              </Button>
            </Form.Item>
            {message && message === "error" && (
              <Alert
                message="Error sending the quote"
                description="Ups! There was an error sending the quote. Please try again or
              contact with us, we'll be happy to hear from you."
                type="error"
              />
            )}
            {message && message === "success" && (
              <Alert
                message="Quote sent"
                description="Thank you for sending the quote. We'll make contact with you in
              the following days."
                type="success"
              />
            )}
          </div>
        </Form>
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
            fixed(width: 35, height: 35, quality: 100) {
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
