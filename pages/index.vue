<template>
  <div>
    <div class="overlay" />
    <NavBar id="navbar"  />
    <Hero id="home" class="scrollable" ref="hero" />
    <Work id="work" class="scrollable" ref="work" :allProjects="all_projects" />
    <Skills id="skills" class="scrollable" ref="skills" />
    <AboutMe id="about" class="scrollable" ref="about" />
    <Contact id="contact" class="scrollable" ref="contact" />
    <MyFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/Navbar'
import Hero from '@/components/Hero'
import AboutMe from '@/components/AboutMe'
import Skills from '@/components/Skills'
import Work from '@/components/Work'
import Contact from '@/components/Contact'
import MyFooter from '@/components/MyFooter'
import scrollspy from '@/plugins/scrollspy.js'
import { homeMeta } from '@/plugins/pages_meta.js'
import {
  initScrollHandler,
  addScrollCallback,
} from '@/plugins/scrollhandler.js'
import {
  initScrollDepth,
  updateScrollDepth,
  getMaxScrollDepth,
} from '@/plugins/scrolldepth.js'

export default {
  head() {
    return {
      title: homeMeta.title[this.$i18n.locale],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: homeMeta.description[this.$i18n.locale],
        },
        {
          name: 'keywords',
          content: homeMeta.keywords[this.$i18n.locale],
        },

        {
          name: 'og:title',
          content: homeMeta.og.title[this.$i18n.locale],
        },
        {
          name: 'og:description',
          content: homeMeta.og.description[this.$i18n.locale],
        },
        {
          name: 'og:image',
          content: homeMeta.og.image[this.$i18n.locale],
        },
        {
          name: 'og:url',
          content: homeMeta.og.url[this.$i18n.locale],
        },
        {
          name: 'og:site_name',
          content: homeMeta.og.site_name[this.$i18n.locale],
        },
        {
          name: 'twitter:image:alt',
          content: homeMeta.twitter.image.alt[this.$i18n.locale],
        },
        {
          name: 'twitter:card',
          content: homeMeta.twitter.card,
        },
      ],
    }
  },

  components: {
    NavBar,
    Hero,
    AboutMe,
    Skills,
    Work,
    Contact,
    MyFooter,
  },
  async asyncData({ $content, params, error }) {
    const all_projects = await $content('projects')
      .sortBy('order', 'desc')
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    return {
      all_projects,
    }
  },
  data() {
    return {
      observer: null,
      currentSection: null,
      all_projects: [],
    }
  },
  mounted() {
    const sections = document.querySelectorAll('.scrollable')
    const menu_links = document.querySelectorAll('.nav-links li')
    initScrollHandler(window)
    initScrollDepth(document, window)
    addScrollCallback(() => scrollspy(window, menu_links, sections))
    addScrollCallback(() => updateScrollDepth())
    window.addEventListener('beforeunload', () => {
      // this is bcoz https://stackoverflow.com/questions/14849201/google-analytics-list-event-values-per-event-label
      this.$ga.event({
        eventCategory: 'scroll_depth',
        eventAction: getMaxScrollDepth().toString(),
      })
    })
  },
}
</script>

<style>
</style>