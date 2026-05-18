import adapter from '@sveltejs/adapter-netlify'
import sveltePreprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: sveltePreprocess({
    typescript: true,
    preserve: ['ld+json'],
  }),
  kit: {
    inlineStyleThreshold: Infinity,
    adapter: adapter(),
  },
}
