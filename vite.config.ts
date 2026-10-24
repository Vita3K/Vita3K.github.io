import { paraglideVitePlugin } from '@inlang/paraglide-js';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: '0.0.0.0'
    },
    plugins: [
        sveltekit({
            adapter: adapter(),
            compilerOptions: {
                // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
                runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
            },
            preprocess: [
                mdsvex({
                    extension: '.md'
                }),
                vitePreprocess({
                    style: true,
                }),
            ],
            extensions: ['.svelte', '.md']
        }),
        paraglideVitePlugin({
            project: './project.inlang',
            outdir: './src/lib/paraglide',
            strategy: ["cookie", "globalVariable", "preferredLanguage", "baseLocale"],
        })
    ]
});
