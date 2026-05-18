<script>
  import * as Sections from '$lib/sections'
  import '$lib/css/style.css'
  export let data
  $: sections = data.sectionsCollection.items
  $: seo = data?.seo ?? null
  console.log('seo', data.seo)
</script>

<svelte:head>
  <title>{seo?.title ? seo.title : data.pageTitle}</title>

  {#if seo}
 
     <title>{seo?.title ? seo.title : data.pageTitle}</title>

    {#if seo.description}
      <meta name="description" content={seo.description} />
      <meta property="og:description" content={seo.description} />
    {/if}

    {#if seo?.image}
      <meta property="og:image:url" content={seo.image.url} />
      <meta property="og:image:width" content={seo.image.width} />
      <meta property="og:image:height" content={seo.image.height} />
    {/if}
    
    {#if seo.title}
      <meta property="og:title" content={seo.title} />
    {/if}
    
    {#if seo.ogype}
      <meta property="og:type" content={seo.ogype} />
    {/if}

    {#if seo.keywords}
      <meta name="keywords" content={seo.keywords} />
    {/if}
  {/if}
</svelte:head>

{#each sections.sort((a, b) => a.position - b.position) as section}
  <svelte:component this={Sections[section?.component]} data={section} />
{/each}

<style global lang="scss">
  @import 'destyle.css/destyle.css';
</style>
