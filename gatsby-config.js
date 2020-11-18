module.exports = {
  siteMetadata: {
    title: `Project Monolith Portfolio Website`,
    description: `This is a portfolio website for Project Monolith, a multimedia endaevor by Tsotne Aburjania. It encompasses web development, music production and 3D rendering.`,
    author: `@tsotneaburjania`,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/audio`,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `rgb(0, 0, 0)`,
        theme_color: `rgb(0, 0, 0)`,
        display: `minimal-ui`,
        icon: `src/images/monolith.jpg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
