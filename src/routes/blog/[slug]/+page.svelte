<script lang="ts">
    import { m } from "$lib/paraglide/messages.js";
    import CompositeMeta from "$lib/components/CompositeMeta.svelte";

    let { data } = $props();
    let post = $derived(data.post);

    let title = $derived(post ? post.meta.title : m.blog_post_not_found());
    let author = $derived(post ? post.meta.author : "");
</script>

<svelte:head>
    <title>{title}</title>
    <CompositeMeta key="title" content={title} />
    <CompositeMeta key="author" content={author} />
    <CompositeMeta
        key="description"
        content={post ? post.excerptText : ""}
    />
</svelte:head>

{#if post}
    <section class="blog-page blog-detail bg-dark text-white">
        <div class="container" id="blog-container">
            <article class="blog-post">
                <header class="blog-article-header text-center">
                    {#if post.publishedLabel}
                        <p class="blog-eyebrow">{post.publishedLabel}</p>
                    {/if}
                    <h1 class="blog-post-title section-heading">{post.meta.title}</h1>
                    <p class="blog-article-author">
                        {@html m.blog_written_by({
                            author: post.meta.author,
                        })}
                    </p>
                </header>
                <div class="stackedit__html blog-post-body">
                    {@html post.html.body}
                </div>
            </article>
        </div>
    </section>
{:else}
    <section class="blog-page blog-detail bg-dark text-white">
        <div class="container" id="blog-container">
            <div class="blog-post blog-post-missing text-center">
                <h1>{m.blog_post_not_found()}</h1>
            </div>
        </div>
    </section>
{/if}
