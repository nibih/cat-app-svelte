<script>
  import { onMount } from "svelte";
  import { inview } from "svelte-inview/dist/index";
  import { slide } from "svelte/transition";
  import propComparator from "$lib/utils";

  let posts = [];
  let page = 0;
  const limit = 10;
  let hasMore = true;
  let searchTerm = "";
  let filtered = [];
  let readMore = [];

  const fetchData = async (page) => {
    let queryURL = `https://api.thecatapi.com/v1/breeds?limit=${limit}&page=${page}`;
    fetch(queryURL)
      .then((response) => response.json())
      .then((res) => {
        filtered = posts;
        filtered = posts.filter((value) =>
          value.name.toLowerCase().includes(searchTerm)
        );
        posts.sort(propComparator(`name`));

        if (res.length > 0) {
          posts = [...posts, ...res];
          filtered = posts.filter((value) =>
            value.name.toLowerCase().includes(searchTerm)
          );
        } else hasMore = false;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  };

  onMount(async () => {
    fetchData(page);
  });
  const handleChange = (e) => {
    // To get more results, we'll increment the page by 1
    page++;
    // And fetch more data
    if (hasMore) fetchData(page);
    filtered = posts.filter((value) =>
      value.name.toLowerCase().includes(searchTerm)
    );
  };
</script>

<div class="flex p-3 justify-between">
  <h1 class="text-3xl font-bold m-3">Cat Breeds</h1>
  <input class="border border-slate-400 rounded-lg m-3 p-2" type="text" bind:value={searchTerm} on:input={handleChange} />
</div>

<ul class="grid grid-cols-1 justify-items-center text-center p-3 bg-slate-300">
  {#each filtered as post, i}
    <div
      class="w-full overflow-hidden rounded-lg shadow-lg sm:flex bg-white m-1 p-3"
      on:load={() => (readMore[i] = false)}
    >
      <li class="flex">
        <img
          src={post.image ? post.image.url : ""}
          alt={post.name}
          class="inline object-cover w-24 h-24 mr-2 rounded-lg"
        />
        <div class="text-left">
          <h2 class="text-lg font-bold">
            {post.name}
          </h2>
          <h3 class="">{post.temperament}</h3>
          {#if readMore[i]}
            <h3 class="italic" transition:slide|local>"{post.description}"</h3>
          {/if}
          <button
            on:click={() => {
              readMore[i] = !readMore[i];
            }}
          >
            {#if readMore[i]}
              <h3>Read less</h3>
            {:else}
              <h3>Read more</h3>
            {/if}
          </button>
        </div>
      </li>
    </div>
  {/each}
</ul>

{#if !hasMore}
  <h1 class="text-xl font-bold m-3 text-center">
    That's all folks! ฅ(＾・ω・＾ฅ)
  </h1>
{:else}
  <div use:inview={{}} on:change={handleChange} />
{/if}
