import React from 'react'
import { graphql, Link } from 'gatsby'
import moment from "moment"

import Seo from "../../components/seo/seo"
import Layout from '../../components/layout/layout';

import * as styles from "../../pages/index/index.module.css";


export const pageQuery = graphql`
    query CategoriesPageQuery($id: ID!) {
        site {
            siteMetadata {
                title
            }
        }
        gcms {
            category(where: {id: $id}) {
                name
                defaultImage {
                    url
                }
                posts(orderBy: createdAt_DESC) {
                    title
                    slug
                    date
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
    }
`;

const CategoryPage = ({ data, location }) => {
    const category = data.gcms.category
    const posts = category.posts
    const pageTitle = `${category.name} | ${data.site.siteMetadata.title}`

    return (
        <Layout location={location} title={pageTitle}>
            <Seo title={pageTitle} />
            <h1 className={styles.sectionHeading}>Posts in Category: {category.name}</h1>
            <section className={styles.postsWrapper}>
                {posts.map(({ slug, ...post }) =>
                    <article key={slug}>
                        <Link to={`/posts/${slug}`}>
                            <div>
                                <img src={category.defaultImage.url} alt={category.name}></img>
                                <span>{category.name}</span>
                            </div>
                            <div>
                                <p>{moment(post.date).format(`YYYY/MM/DD`)}</p>
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

export default CategoryPage