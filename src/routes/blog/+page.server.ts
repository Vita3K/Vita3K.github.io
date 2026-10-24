import { getAllPosts } from '#lib/posts.js';

export async function load() {
  return {
    posts: await getAllPosts()
  };
}
