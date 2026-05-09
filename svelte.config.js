import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
    },
    kit: { adapter: adapter() },
    preprocess: [
        mdsvex({
            extension: '.md'
        }),
        vitePreprocess({
            style: true,
        }),
    ],

    extensions: ['.svelte', '.md']
};

export default config;
