import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"

const Seo = ({ description, lang, meta, title }) => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                    }
                }
            }
        `
    )

    const metaDescription = description || site.siteMetadata.description
    const defaultTitle = site.siteMetadata?.title

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                }
            ].concat(meta)}
        >
            <script>
                {`
                (function(d) {
                    var config = {
                        kitId: '${process.env.GATSBY_FONTS_KITID}',
                        scriptTimeout: 3000,
                        async: true
                    },
                    h=d.documentElement,
                    t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},
                    config.scriptTimeout),tk=d.createElement("script"),
                    f=false,
                    s=d.getElementsByTagName("script")[0],
                    a;
                    h.className+=" wf-loading";
                    tk.src='https://use.typekit.net/'+config.kitId+'.js';
                    tk.async=true;
                    tk.onload=tk.onreadystatechange=function(){
                        a=this.readyState;
                        if(f||a&&a!="complete"&&a!="loaded")return;
                        f=true;
                        clearTimeout(t);
                        try{Typekit.load(config)}catch(e){}};
                        s.parentNode.insertBefore(tk,s)
                    }
                )(document);
                `}
            </script>
        </Helmet>
    )
}

Seo.defaultProps = {
    lang: `ja`,
    meta: [],
    description: ``,
}

Seo.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
}

export default Seo