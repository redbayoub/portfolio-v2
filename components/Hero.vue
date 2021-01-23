<template>
  <section class="container hero">
    <div class="hero-text">
      <h1 class="hero-header">{{ $t('hero.title') }}</h1>
      <p class="hero-subtitle">{{ $t('hero.lead') }}</p>
      <div class="hero-actions">
        <a
          name
          id
          class="btn btn-primary btn-lg"
          href="#work"
          @click="smoothScrollToElement"
          role="button"
          >{{ $t('hero.cta.explore') }}</a
        >
        <a
          name
          id
          class="btn btn-outline-primary"
          href="#contact"
          @click="smoothScrollToElement"
          role="button"
          >{{ $t('hero.cta.contact') }}</a
        >
      </div>
    </div>
    <div class="hero-image">
      <img
        id="mainHeroImage"
        src="/images/hero_image.svg"
        class="img-responsive"
        alt=""
        width="300px"
      />
    </div>
  </section>
</template>

<script>
import { smoothScrollToElement } from '@/plugins/utils'
export default {
  name: 'hero',
  methods: {
    smoothScrollToElement,
  },
}
</script>

<style lang="scss">
html[lang='ar'] #mainHeroImage {
  transform: scale(-1, 1);
  transform-origin: center;
}
</style>