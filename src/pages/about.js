import * as React from "react";
import { graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";

import styles from "../styles/about.module.css";
import { colors } from "../styles";

const About = () => {
  return (
    <div>
      <Header/>
      <div className={styles.title}>
        <Title>About Us</Title>
      </div>
      <div className={styles.section}>
      <img className={styles.photo} src="https://furniture-door.com/wp-content/uploads/Woodworking.jpg" alt="Paris" width="600" height="400"></img>
      <br/><br/>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus, tortor sit amet faucibus sodales, nibh nisl semper neque, eu tincidunt metus diam sit amet erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum vel nisi pharetra, sollicitudin diam at, tempor orci. 
      </p>
      <p>
        Nunc sapien mi, finibus quis placerat non, imperdiet sed nunc. Nam molestie erat eu nibh laoreet finibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In hendrerit viverra felis, vel ullamcorper massa ullamcorper quis. Curabitur quis viverra eros. Mauris sit amet neque nec nibh blandit hendrerit nec finibus sem. Nullam dignissim eros nibh, a faucibus mauris condimentum ac. Nam ut est diam. Donec efficitur libero quis mi dapibus tempor. 
      </p>
      
      </div>

      
  
      
  
      <Footer/>
    </div>
  )
};


export default About;



