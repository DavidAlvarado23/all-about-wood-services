module.exports = {
  siteMetadata: {
    title: "All About Wood Services",
    siteUrl: "https://www.allaboutwoodservices.com/",
    author: "David Alvarado",
  },
  plugins: [
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-offline",
    "gatsby-transformer-sharp",
    "gatsby-plugin-antd",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: [
            "Arbutus Slab",
            "Rubik",
            "Rubik:500",
            "Rubik:300",
            "Rubik:700",
            "BioRhyme",
          ],
        },
        display: "swap",
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "All About Wood Services",
        short_name: "All About Wood Services",
        start_url: "/",
        background_color: "#7D6039",
        theme_color: "#7D6039",
        display: "standalone",
        icon: "src/images/logo.png",
      },
    },
  ],
};
