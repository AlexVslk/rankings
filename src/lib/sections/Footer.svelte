<script>
  import Container from '$lib/components/Container.svelte'
  import { beforeUpdate } from 'svelte'

  export let data = {}

  let page = ''

  beforeUpdate(() => {
    let pathname = window.location.pathname
    page = pathname.substring(pathname.lastIndexOf('/') + 1)
  })

</script>

  <footer class={`footer ${page == 'contact-us' ? 'footer--contact' : ''}`}>
    <Container>
      <div class={`footer__wrapper ${page == 'contact-us' ? 'footer__wrapper--contact' : ''}`}>
        <div class="footer__inner">
          <p class="footer__rights-text">{data.footerRights}</p>

            <div class="footer__links-wrapper">
              {#each data.socialLinksCollection.items as item}
                <a href={item.link} class="footer__link">
                  <img src={item.socialIcon.url} alt={item.socialIcon.title} class="footer__link-icon" />
                </a>
              {/each}
            </div>
        </div>

          <div class="footer__terms-wrapper">
            {#each data.footerTermsPolicyCollection.items as item}
              <a href={item.link} class="footer__terms">{item.title}</a>
            {/each}
          </div>
      </div>
    </Container>
  </footer>

<style lang="scss">
  @import '../css/mixins';
  @import '../css/functions';

  .footer {
    color: #07124a;

    &--contact {
      background-color: #46506f;

      @include media-down('lg') {
        padding-top: 30px;
      }
    }

    &__inner {
      display: flex;
      flex-wrap: wrap-reverse;
      column-gap: fluid-size(20, 100);
      row-gap: 20px;

      @include media-down('md') {
        gap: 20px;
        justify-content: center;
      }
    }

    &__wrapper {
      position: relative;
      width: 100%;
      padding-top: 20px;
      padding-bottom: 20px;
      display: flex;
      gap: 20px;
      
      @include media-up('lg') {
        justify-content: space-between;
      }

      @include media-down('lg') {
        justify-content: center;
      }

      &--contact {
        filter: brightness(4000%);
      }
    }

    &__links-wrapper {
      display: flex;
      gap: 25px;

      @include media-down('lg') {
        display: none;
      }
    }

    &__terms-wrapper {
      display: flex;
      gap: fluid-size(20, 50);

      @include media-down('lg') {
        display: none;
      }
    }

    &__terms {
      text-wrap: nowrap;
    }

    &__rights-text {
      text-align: center;

      @include media-down('md') {
        font-size: 12px;
        width: 75%;
        line-height: 20px;
      }
    }

    
  }
</style>
