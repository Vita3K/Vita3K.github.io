<script lang="ts">
    import CompositeMeta from "$lib/components/CompositeMeta.svelte";
    import { m } from "$lib/paraglide/messages.js";

    let { data } = $props();
</script>

<svelte:head>
    <title>Vita3K - {m.nav_blog()}</title>
    <CompositeMeta key="title" content="Vita3K - {m.nav_blog()}" />
    <CompositeMeta
        key="description"
        content={`Vita3K blog - ${data.posts.length} posts`}
    />
</svelte:head>

<section class="blog-page blog-index bg-dark text-white">
    <div class="container" id="blog-container">
        <div class="row blog-index-header text-center">
            <div class="col-lg-10 mx-auto">
                <h1 class="blog-index-title">
                    <strong>{m.nav_blog()}</strong>
                </h1>
                <hr />
                <br />
            </div>
            <div class="col-lg-8 mx-auto">
                <p class="blog-index-copy text-faded mb-1">
                    Our infrequent progress reports on the state of the emulator.
                </p>
            </div>
        </div>

        <div class="blog-list" role="list">
        {#each data.posts as post (post.slug)}
            <article class="blog-card" role="listitem">
                <a class="blog-card-link" href={post.url}>
                    <div class="blog-card-frame">
                        <div class="blog-card-meta">
                            {#if post.publishedLabel}
                                <span class="blog-card-date">{post.publishedLabel}</span>
                            {/if}
                            <span class="blog-card-author">
                                {@html m.blog_written_by({
                                    author: post.meta.author,
                                })}
                            </span>
                        </div>

                        <div class="blog-card-content">
                            <h2 class="blog-post-title section-heading">
                                {post.meta.title}
                            </h2>
                            <p class="blog-card-excerpt">
                                {post.excerptText}
                            </p>
                        </div>

                        <div class="blog-card-cta" aria-hidden="true">
                            <span class="read-more">
                                {m.blog_read_more()}
                                <span class="read-more-arrow">→</span>
                            </span>
                        </div>
                    </div>
                </a>
            </article>
        {/each}
        </div>
    </div>
</section>
