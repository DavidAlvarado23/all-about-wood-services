module.exports = {
  siteMetadata: {
    title: "All About Wood Services",
    siteUrl: "https://master.d212siyu2nt6mf.amplifyapp.com/",
  },
  plugins: [
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-offline",
    "gatsby-transformer-sharp",
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
          families: ["Arbutus Slab", "Rubik", "Rubik:500", "BioRhyme"],
        },
        display: "swap",
      },
    },
  ],
};
