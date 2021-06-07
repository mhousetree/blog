require('dotenv').config()

module.exports = {
    siteMetadata: {
        title: `Mhousetree's Blog`,
        description: ``,
    },
    plugins: [
        {
            resolve: `gatsby-source-graphql`,
            options: {
                typeName: `GraphCMS`,
                fieldName: `gcms`,
                url: `${process.env.GATSBY_GRAPHCMS_URL}`,
            },
        },
        `gatsby-plugin-react-helmet`,
    ],
};