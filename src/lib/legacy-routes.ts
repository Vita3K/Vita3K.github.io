export function normalizeLegacyPathname(pathname: string): string {
    let normalizedPathname = pathname;

    if (normalizedPathname.endsWith(".html")) {
        normalizedPathname = normalizedPathname.slice(0, -".html".length);
    }

    if (normalizedPathname === "/index") {
        return "/";
    }

    const legacyBlogMatch = normalizedPathname.match(
        /^\/(\d{4})\/(\d{2})\/(\d{2})\/(.+)$/,
    );

    if (legacyBlogMatch) {
        const [, year, month, day, slug] = legacyBlogMatch;
        return `/blog/${year}-${month}-${day}-${slug}`;
    }

    return normalizedPathname;
}
