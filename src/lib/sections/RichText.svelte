<script>
  import Container from '$lib/components/Container.svelte'
  import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

  export let data = {}

  const getAssetMap = (assets = []) => Object.fromEntries(
    assets.map((asset) => [asset.sys.id, asset])
  );

  $: assetMap = getAssetMap(data?.richText?.links?.assets?.block ?? []);
  $: html = documentToHtmlString(data?.richText?.json, {
    renderNode: {
      'embedded-asset-block': (node) => {
        const assetId = node.data.target.sys.id;
        const asset = assetMap[assetId];

        if (!asset?.url) return '';

        return `
          <img
            src="${asset.url}"
            alt=""
            loading="lazy"
          />
        `;
      }
    }
  });
</script>

<section class="rich-text">
  <Container>
    <div class="rich-text__wrapper {data.variant}">
      {#if data.pageTitle == 'Page Title'}
        <h1 class="h1">{data.title}</h1>
      {/if}

      {#if data.pageTitle == 'Section Title'}
        <h2 class="h2">{data.title}</h2>
      {/if}

      {#if data.variant == 'HalfWidth'}
        <div class="rich-text__arrow">
          <img src="../arrow-static.svg" alt="arrow" />
        </div>
      {/if}
      
      <div class="rich-text__content">
        {@html html}
      </div>
    </div>
  </Container>
</section>

<style lang="scss">
  @import '../css/mixins';
  .rich-text {
    &__content {
      display: flex;
      flex-direction: column;
      gap: 20px;

      :global(h2) {
        font-weight: 700;
        color: #07124a;

        @include media-up('lg') {
          font-size: 32px;
        }

        @include media-down('lg') {
          font-size: 24px;
        }
      }

      :global(h3) {
        font-weight: 700;
        color: #07124a;

        @include media-up('lg') {
          font-size: 24px;
        }

        @include media-down('lg') {
          font-size: 18px;
        }
      }

      :global(h4) {
        font-weight: 700;
        color: #07124a;

        @include media-up('lg') {
          font-size: 20px;
        }

        @include media-down('lg') {
          font-size: 16px;
        }
      }

      :global(ol), :global(ul) {
        @include media-up('lg') {
          padding-left: 18px;
        }

        @include media-down('lg') {
          padding-left: 16px;
        }
      }

      :global(ol) {
        list-style: number;
      }

      :global(ul) {
        list-style: disc;
      }

      :global(li), :global(p) {
        line-height: 130%;
        color: #07124a;

        @include media-up('lg') {
          font-size: 18px;
        }

        @include media-down('lg') {
          font-size: 16px;
        }
      }

      :global(img) {
        display: block;
        width: 100%;
      }
    }
    &__wrapper {
      position: relative;
    }
    &__wrapper.FullWidth {
      display: flex;
      flex-direction: column;

      @media (min-width: 993px) {
        & {
          gap: 50px;
        }
      }

      @media (max-width: 992px) {
        & {
          gap: 65px;
        }
      }
    }

    &__wrapper.HalfWidth {
      display: grid;

      @media (min-width: 993px) {
        & {
          grid-template-columns: 1fr 1fr;
        }
      }

      @media (max-width: 992px) {
        & {
          gap: 65px;
        }
      }
    }
  }
</style>
