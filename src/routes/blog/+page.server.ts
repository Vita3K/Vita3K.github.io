import { getAllPosts } from '$lib/posts';

export async function load() {
  return {
    posts: await getAllPosts()
  };
}
