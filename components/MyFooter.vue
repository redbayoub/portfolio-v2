<template>
  <footer class="text-center">{{ $t('copyrights') }} Red Bayoub</footer>
</template>

<script>
import SvgIcon from '@/components/SvgPathIcon'
export default {
  name: 'my_footer',
  components: {
    SvgIcon,
  },
}
</script>

<style>
footer {
  background-color: var(--bg-color-darken);
  color: var(--text-color);
  text-transform: capitalize;
  margin: 0 auto;
  font-size: 0.8em;
  padding: 10px 0;
}

html[lang='ar'] footer {
  direction: rtl;
}
</style>