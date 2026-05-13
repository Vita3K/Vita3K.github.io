<script lang="ts">
    import { m } from "$lib/paraglide/messages.js";
    import CompositeMeta from "$lib/components/CompositeMeta.svelte";

    const { data } = $props();
    const post = data.post;

    const title = post ? post.meta.title : m.blog_post_not_found();
    const author = post ? post.meta.author : "";
</script>

<svelte:head>
    <title>{title}</title>
    <CompositeMeta key="title" content={title} />
    <CompositeMeta key="author" content={author} />
    <CompositeMeta
        key="description"
        content={post ? post.meta.description : ""}
    />
</svelte:head>

{#if post}
    <div>
        <section class="blog-body bg-dark text-white">
            <div class="container" id="blog-container">
                <div class="row blog-post">
                    <div class="col-lg-12 mx-auto text-center">
                        <h2 class="blog-post-title section-heading">
                            <font color="#bbbbbb">{post.meta.title}</font>
                        </h2>
                        <h4>
                            <font color="#777777">
                                {@html m.blog_written_by({
                                    author: post.meta.author,
                                })}
                            </font>
                        </h4>
                        <div
                            class="stackedit__html blog-post-body mb-5"
                            align="left"
                        >
                            {@html post.html.body}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
{:else}
    <section class="blog-post">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 mx-auto text-center">
                    <h1>{m.blog_post_not_found()}</h1>
                </div>
            </div>
        </div>
    </section>
{/if}
