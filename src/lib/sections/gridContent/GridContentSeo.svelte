<script>
  import Container from '$lib/components/Container.svelte'
  import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

  export let data = {}

  const getAssetMap = (assets = []) => Object.fromEntries(
    assets.map((asset) => [asset.sys.id, asset])
  );

  $: assetMap = getAssetMap(data?.richText?.links?.assets?.block ?? []);
  const html = (json) => documentToHtmlString(json, {
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

<section class="seotext">
    <Container>
      <div class="seotext__wrapper">
        <div class="seotext__header">

          {#if data.title}
            <h2 class="h2 seotext__title">{data.title}</h2>
          {/if}

          {#if data?.subtitle}
            <p class="seotext__subtitle">{data.subtitle}</p>
          {/if}

        </div>

        <div class="seotext__items">
          {#each data.contentListCollection.items as item}
            <div class="seotext__item">
              <div class="seotext__name-wrapper">
                <p class="seotext__name">{item.title}</p>
                
              </div>
              <div class="richtext">
                {@html html(item?.richText?.json)}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </Container>
  </section>

<style lang='scss'>
  @import '../../css/mixins';

  .richtext {
    :global(ul), :global(ol) {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }

  .seotext {

    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 50px;
    }

    &__header {
      display: flex;
      flex-direction: column;

      @include media-up('lg') {
        width: 48%;
        gap: 20px;
      }

      @include media-down('lg') {
        gap: 10px;
      }
    }

    &__title {
      font-size: 32px;
      font-weight: bold;
      color: #07124a;
    }

    &__subtitle {
      color: #07124a;
    }

    &__items {
      display: flex;
      flex-direction: column;
      gap: 70px;
    }

    &__item {
      display: flex;
      flex-direction: column;
      position: relative;
      gap: 32px;
    }

    @media (min-width: 768px) {
      &__item {
        width: 49%;
      }
    }

    @media (min-width: 768px) {
      &__item:not(:last-of-type):nth-child(odd):before {
        content: '';
        position: absolute;
        background-repeat: no-repeat;
        width: 50px;
        height: 50px;
        left: -100px;
        bottom: 0;
        opacity: 0.2;
        transform: rotate(90deg);
        background-image: url('Group 109.svg');
      }

      &__item:not(:last-of-type):nth-child(even):before {
        content: '';
        position: absolute;
        background-repeat: no-repeat;
        width: 50px;
        height: 50px;
        left: calc(100% + 50px);
        bottom: 0;
        opacity: 0.2;
        transform: rotate(90deg);
        background-image: url('Group 109.svg');
      }
    }

    @media (max-width: 768px) {
      &__item:not(:last-of-type):nth-child(odd):before {
        content: '';
        position: absolute;
        background-repeat: no-repeat;
        width: 50px;
        height: 50px;
        align-self: center;
        justify-self: center;
        bottom: 0;
        opacity: 0.2;
        top: calc(100% + 46px);
        transform: rotate(90deg);
        background-image: url('Group 109.svg');
      }

      &__item:not(:last-of-type):nth-child(even):before {
        content: '';
        position: absolute;
        background-repeat: no-repeat;
        width: 50px;
        height: 50px;
        align-self: center;
        justify-self: center;
        top: calc(100% + 46px);
        bottom: 0;
        opacity: 0.2;
        transform: rotate(90deg);
        background-image: url('Group 109.svg');
      }
    }

    &__item:nth-child(odd) {
      align-self: flex-end;
    }

    &__name-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      
      text-transform: uppercase;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: calc(50% - 1px);
        z-index: -1;
        width: 100%;
        height: 1px;
        background-color: #0077ff;
      }
    }

    &__name {
      position: relative;
      z-index: 1;
      background-color: white;
      left: 0;
      padding-right: 30px;
      font-size: 24px;
      color: #46506f;
    }

    &__text {
      color: var(--dark-blue);
      font-size: 18px;
    }

    @media (max-width: 786px) {
      &__items {
        gap: 139px;
      }
      &__name-wrapper {
        font-size: 18px;
      }

      &__text {
        font-size: 14px;
      }
    }
  }
</style>