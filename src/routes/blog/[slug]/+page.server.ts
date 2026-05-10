import { getAllPosts } from '$lib/posts';

export async function load({ params }) {
  const posts = await getAllPosts();
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) {
    return { status: 404 };
  }
  return { post };
}
