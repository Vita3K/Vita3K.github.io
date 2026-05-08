import { remark } from 'remark';
import html from 'remark-html';

export async function getAllPosts() {
    // Import all markdown files as raw text
    const modules = import.meta.glob('/posts/*.md', { query: '?raw', import: 'default', eager: true });
    const posts = await Promise.all(Object.entries(modules).map(async ([file, raw]: any) => {
        // Extract frontmatter manually (YAML between ---)
        const match = /^---([\s\S]*?)---/.exec(raw);
        let meta: { title?: string } = {};
        let content = raw;
        if (match) {
            // Parse YAML frontmatter
            const yaml = match[1];
            content = raw.slice(match[0].length);
            meta = Object.fromEntries(
                yaml.split('\n').map(line => {
                    const idx = line.indexOf(':');
                    if (idx === -1) return null;
                    const key = line.slice(0, idx).trim();
                    const value = line.slice(idx + 1).trim().replace(/^"|"$/g, '');
                    return [key, value];
                }).filter(Boolean)
            );
            if (!meta.title) {
                meta.title = file.split('/').pop()?.replace(/\.md$/, '');
            }
        }
        // Convert markdown to HTML
        const processed = await remark().use(html).process(content);
        const htmlStr = processed.toString();
        const pMatch = htmlStr.match(/<p>([\s\S]*?)<\/p>/i);
        const excerpt = `<p>${pMatch ? pMatch[1] : 'Excerpt not available'}</p>`;
        return {
            meta: meta,
            slug: file.split('/').pop()?.replace(/\.md$/, ''),
            url: `/blog/${file.split('/').pop()?.replace(/\.md$/, '')}`,
            html: { body: htmlStr },
            excerpt,
        };
    }));
    posts.sort((a, b) => (a.slug < b.slug ? 1 : -1));
    return posts;
}
