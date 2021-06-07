import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import moment from "moment"

import Seo from "../components/seo/seo"
import Layout from '../components/layout/layout';

import * as styles from "./index/index.module.css";


export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        gcms {
            posts(stage: PUBLISHED, orderBy: createdAt_DESC) {
                category {
                    name
                    slug
                    defaultImage {
                        url
                    }
                }
                title
                slug
                date
                updatedAt
                createdAt
                excerpt
                tags {
                    ... on GraphCMS_Tag {
                        name
                        slug
                    }
                }
            }
        }
    }
`;

const IndexPage = ({ location }) => {
    const {
        site: { siteMetadata },
        gcms: { posts },
    } = useStaticQuery(pageQuery);
    const siteTitle = siteMetadata.title || `Title`

    return (
        <Layout location={location} title={siteTitle}>
            <Seo title={siteTitle} />
            <h1 className={styles.sectionHeading}>New Posts</h1>
            <section className={styles.postsWrapper}>
                {posts.map(({ slug, ...post }) =>
                    <article key={slug}>
                        <Link to={`/posts/${slug}`}>
                            <div>
                                <LazyLoadImage src={post.category.defaultImage.url} alt={post.category.name} />
                                <span>
                                    <Link to={`/categories/${post.category.slug}`}>
                                        {post.category.name}
                                    </Link>
                                </span>
                            </div>
                            <div>
                                <p>{post.date ? moment(post.date).format(`YYYY/MM/DD`) : moment(post.updatedAt)}</p>
                                <h2>{post.title}</h2>
                                <p>
                                    {post.excerpt}
                                </p>
                                <ul>
                                    {post.tags.map(({ id, ...tag }) =>
                                        <li key={id}>
                                            <Link to={`/tags/${tag.slug}`}>
                                                {tag.name}
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </Link>
                    </article>
                )}
            </section>
        </Layout>
    )
}

export default IndexPage