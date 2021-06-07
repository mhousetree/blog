import React, { useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import marked from 'marked'
import moment from "moment"

import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import scss from 'highlight.js/lib/languages/scss'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'
import shell from 'highlight.js/lib/languages/shell'
import coffeescript from 'highlight.js/lib/languages/coffeescript'
import 'highlight.js/styles/atom-one-light.css'

import Seo from '../../components/seo/seo'
import Layout from '../../components/layout/layout'
import * as styles from "./postpage.module.css"

hljs.registerLanguage('xml', xml)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('coffeescript', coffeescript)
hljs.registerLanguage('shell', shell)

export const pageQuery = graphql`
    query PostPageQuery($id: ID!) {
        gcms {
            post(where: {id: $id}) {
                title
                category {
                    name
                    slug
                }
                tags {
                    ... on GraphCMS_Tag {
                        name
                        slug
                    }
                }
                date
                publishedAt
                updatedAt
                content
            }
        }
    }
`

const PostPage = ({ data, location, pageContext }) => {
    const { previous_slug, next_slug, previous_title, next_title } = pageContext
    const post = data.gcms.post
    useEffect(() => {
        hljs.initHighlighting();
    });

    return (
        <Layout location={location}>
            <Seo title={post.title} />
            <article className={styles.postWrapper}>
                <div className={styles.postMetadata}>
                    <h2>{post.title}</h2>
                    <div>
                        <p>{post.date ? moment(post.date).format(`YYYY-MM-DD HH:mm`) : moment(post.updatedAt).format(`YYYY-MM-DD HH:mm`)}</p>
                        <p>{moment(post.publishedAt).format(`YYYY-MM-DD HH:mm`)}</p>
                        <p><Link to={`/categories/${post.category.slug}`}>{post.category.name}</Link></p>
                    </div>
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
                <hr />
                <section dangerouslySetInnerHTML={{ __html: marked(post.content) }} />
            </article>
            <section className={styles.prev_next}>
                <div>
                    {previous_slug ? (
                        <Link to={`/posts/${previous_slug}`} rel="prev">
                            {previous_title}
                        </Link>
                    ) : <span class={styles.disable}>No previous post.</span>}
                </div>
                <div>
                    {next_slug ? (
                        <Link to={`/posts/${next_slug}`} rel="next">
                            {next_title}
                        </Link>
                    ) : <span class={styles.disable}>No next post.</span>}
                </div>
            </section>
        </Layout>
    )
}


export default PostPage