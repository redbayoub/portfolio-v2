<template>
  <div>
    <NavBar :empty="true" />
    <div class=" not-found container">
      <span class="status-code"
        ><strong>{{ error.statusCode }}</strong></span
      >
      <span>{{ error_message }}</span>
      <a class="btn btn-primary" href="/">{{ $t('cta.back_to_home') }}</a>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/Navbar'
export default {
  props: ['error'],
  components: {
    NavBar,
  },
  head: {
    htmlAttrs: {
      lang: 'en',
    },
  },
  computed: {
    error_message: function () {
      switch (this.error.statusCode) {
        case 404:
          return this.$t('errors.page_not_found')
          break

        default:
          return this.$t('errors.server_error')
          break
      }
    },
  },
}
</script>


<style lang="scss">
.not-found {
  height: calc(100vh - var(--nav-bar-height));
  //margin: 0 auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  .status-code {
    font-size: 5em;
    letter-spacing: 5px;
    font-weight: 100;
  }

  span {
    margin-bottom: 10px;
    font-size: 1.3em;
  }

  .btn {
    width: 200px;
    margin: 2em auto;
  }
}
</style>