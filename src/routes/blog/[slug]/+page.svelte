<script lang="ts">
    const { data } = $props();
    const post = data.post;
</script>

{#if post}
    <div>
        <section class="blog-body bg-dark text-white">
            <div class="container" id="blog-container">
              <div class="row blog-post">
                    <div class="col-lg-12 mx-auto text-center">
                        <h2 class="blog-post-title section-heading"><font color="#bbbbbb">{post.title}</font></h2>
                        <div class="stackedit__html blog-post-body mb-5" align="left">{@html post.html.body}</div>
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
                    <h1>Post not found</h1>
                </div>
            </div>
        </div>
    </section>
{/if}
