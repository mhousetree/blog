import React from 'react'
import { graphql, Link } from 'gatsby'
import moment from "moment"

import Seo from "../../components/seo/seo"
import Layout from '../../components/layout/layout';

import * as styles from "../../pages/index/index.module.css";


export const pageQuery = graphql`
    query TagsPageQuery($id: ID!) {
        site {
            siteMetadata {
                title
            }
        }
        gcms {
            posts(where: {tags_some: {id: $id}}, orderBy: createdAt_DESC) {
                title
                category {
                    name
                    slug
                    defaultImage {
                        url
                    }
                }
                slug
                date
                excerpt
                tags {
                    name
                    slug
                }
            }
            tag(where: {id: $id}) {
                name
            }
        }
    }
`;

const CategoryPage = ({ data, location }) => {
    const tag = data.gcms.tag
    const posts = data.gcms.posts
    const pageTitle = `${tag.name} | ${data.site.siteMetadata.title}`

    return (
        <Layout location={location} title={pageTitle}>
            <Seo title={pageTitle} />
            <h1 className={styles.sectionHeading}>Posts with Tag: {tag.name}</h1>
            <section className={styles.postsWrapper}>
                {posts.map(({ slug, ...post }) =>
                    <article key={slug}>
                        <Link to={`/posts/${slug}`}>
                            <div>
                                <img src={post.category.defaultImage.url} alt={post.category.name}></img>
                                <span>{post.category.name}</span>
                            </div>
                            <div>
                                <p>{moment(post.date).format(`YYYY/MM/DD`)}</p>
                                <h2>{post.title}</h2>
                                <p>
                                    {post.excerpt}
                                </p>
                                <ul>
                                    {post.tags.map(({ id, ..._tag }) =>
                                        <li key={id}>
                                            <Link to={`/tags/${_tag.slug}`}>
                                                {_tag.name}
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