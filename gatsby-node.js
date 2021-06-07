exports.createPages = async ({ graphql, actions: { createPage } }) => {
    const {
        data: {
            gcms: { posts, categories, tags },
        },
    } = await graphql(`
        {
            gcms {
                posts(stage: PUBLISHED, orderBy: createdAt_DESC) {
                    id
                    slug
                    title
                }
                categories(stage: PUBLISHED) {
                    id
                    slug
                    name
                }
                tags(stage: PUBLISHED) {
                    id
                    slug
                    name
                }
            }
        }
    `);

    posts.forEach(({ id, slug }, index) => {
        const nextPostSlug = index === 0 ? null : posts[index - 1].slug
        const previousPostSlug = index === posts.length - 1 ? null : posts[index + 1].slug
        const nextPostTitle = index === 0 ? null : posts[index - 1].title
        const previousPostTitle = index === posts.length - 1 ? null : posts[index + 1].title

        createPage({
            path: `posts/${slug}`,
            component: require.resolve(`./src/templates/PostPage/PostPage.js`),
            context: {
                id: id,
                previous_slug: previousPostSlug,
                next_slug: nextPostSlug,
                previous_title: previousPostTitle,
                next_title: nextPostTitle,
            },
        })
    });

    categories.forEach(({ id, slug, name }) => {
        createPage({
            path: `categories/${slug}`,
            component: require.resolve(`./src/templates/CategoryPage/CategoryPage.js`),
            context: {
                id,
                name
            },
        })
    });

    tags.forEach(({ id, slug, name }) => {
        createPage({
            path: `tags/${slug}`,
            component: require.resolve(`./src/templates/TagPage/TagPage.js`),
            context: {
                id,
                name
            },
        })
    });
};