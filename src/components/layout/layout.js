import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import "destyle.css"
import "../../style.css"
import * as styles from "./layout.module.css"

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        gcms {
            categories {
                name
                slug
            }
        }
    }
`

const Layout = ({ location, children }) => {
    const rootPath = `${__PATH_PREFIX__}/`
    const isRootPath = location.pathname === rootPath
    const {
        site: { siteMetadata },
        gcms: { categories }
    } = useStaticQuery(pageQuery);
    const siteTitle = siteMetadata.title || `Title`
    let header

    if (isRootPath) {
        header = (
            <>
                <h1 className="main-heading">
                    <Link to="/">{siteTitle}</Link>
                </h1>
                <ul>
                    {categories.map(({ slug, ...category }) =>
                        <li key={slug}>
                            <Link to={`/categories/${slug}`}>
                                {category.name}
                            </Link>
                        </li>
                    )}
                </ul>
            </>
        )
    } else {
        header = (
            <Link className="header-link-none" to="/">
                {siteTitle}
            </Link>
        )
    }

    return (
        <div className={styles.globalWrapper} data-is-root-path={isRootPath}>
            <header className={styles.globalHeader}>{header}</header>
            <main>{children}</main>
            <footer>
                &copy; 2021, Mhousetree
            </footer>
        </div>
    )
}

export default Layout