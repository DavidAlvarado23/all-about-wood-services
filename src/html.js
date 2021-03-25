import React from "react";
import PropTypes from "prop-types";
import { mediaStyles } from "./utils/Media";

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <title>All About Wood Services</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Our company it is dedicated in repair rotted wood around windows,
          facias, soffits, doors, and anything made of wood. Our services also
          include painting, priming, and caulking, we bring all our services
          in the area of Kansas City."
        />
        <meta
          name="keywords"
          content="Wood Services, Services, Kansas City, Wood, Company"
        />

        {/* Inject @artsy/fresnel styles in to the head */}
        <style>{mediaStyles}</style>

        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
