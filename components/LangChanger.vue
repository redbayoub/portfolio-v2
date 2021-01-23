<template>
  <a href @click.prevent="changeLang()">
    {{ new_lang_name }}
  </a>
</template>

<script>
import { changeLocale } from '@/plugins/utils'
export default {
  name: 'langChanger',

  data() {
    return {
      new_lang: null,
    }
  },
  created() {
    this.new_lang = this.$i18n.locale == 'ar' ? 'en' : 'ar'
  },
  computed: {
    new_lang_name: function () {
      if (this.new_lang == 'ar') {
        return 'العربية'
      } else {
        return 'English'
      }
    },
  },

  methods: {
    changeLang() {
      this.trackChangeLanguage(this.new_lang)
      console.log(this.switchLocalePath(this.new_lang));
      location.replace(this.switchLocalePath(this.new_lang))
    },
    trackChangeLanguage(lang) {
      this.$ga.event({
        eventCategory: 'click',
        eventAction: 'changeLanguage to ' + lang,
      })
    },
  },
}
</script>

<style scoped>
a {
  letter-spacing: 0px !important;
  color: black;
  text-decoration: none;
}
a img {
  margin: 0 10px 0 0;
}
</style>