import { remark } from 'remark';
import remark_html from 'remark-html';

export async function getAllPosts() {
    // Import all markdown files as raw text
    const modules = import.meta.glob('/posts/*.md', { query: '?raw', import: 'default', eager: true });
    const posts = await Promise.all(Object.entries(modules).map(async ([file, raw]: any) => {
        // Extract frontmatter manually (YAML between ---)
        const match = /^---([\s\S]*?)---/.exec(raw);
        const meta: { [key: string]: string } = {};
        let content = raw;
        if (match) {
            // Parse YAML frontmatter
            const yaml = match[1];
            content = raw.slice(match[0].length);
            const lines = yaml.split('\n');

            for (const line of lines) {
                const separatorIndex = line.indexOf(':');

                if (separatorIndex === -1) {
                    continue; // Invalid line
                }

                const key = line.slice(0, separatorIndex).trim();
                if (!key) {
                    continue; // Skip if key is empty
                }
                const rawValue = line.slice(separatorIndex + 1).trim();

                // Clean up the value by removing leading/trailing quotes
                const cleanValue = rawValue.replace(/^"|"$/g, '');

                // Only add to the object if a key actually exists
                meta[key] = cleanValue;
            }
            if (!meta.title) {
                meta.title = file.split('/').pop()?.replace(/\.md$/, '');
            }
        }
        // Convert markdown to HTML
        const processed = await remark()
            .use(remark_html, { sanitize: false })
            .process(content);
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
