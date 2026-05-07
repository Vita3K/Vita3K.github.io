import { render } from "svelte/server";

export async function getAllPosts() {
    // Eagerly import all markdown files in the posts directory
    const modules = import.meta.glob('/posts/*.md', { eager: true });
    const posts = await Promise.all(Object.entries(modules).map(async ([file, mod]: any) => {
        const meta = mod.metadata || mod.frontmatter || {};
        const html = await render(mod.default);
        // Extract the first <p>...</p> as excerpt, fallback to first 300 chars if not found
        let excerpt;
        const match = html.body.match(/<p>([\s\S]*?)<\/p>/i);
        if (match) {
            excerpt = `<p>${match[1]}</p>`;
        } else {
            excerpt = html.body.slice(0, 300) + (html.body.length > 300 ? '...' : '');
        }
        return {
            ...meta,
            // Remove leading slash and extension for slug
            slug: file.split('/').pop()?.replace(/\.md$/, ''),
            url: `/blog/${file.split('/').pop()?.replace(/\.md$/, '')}`,
            html,
            excerpt,
        };
    }));
    // Sort by date descending if available
    posts.sort((a, b) => (a.date < b.date ? 1 : -1));
    return posts;
}
