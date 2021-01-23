<template>
  <div class="projects-page">
    <NavBar id="navbar" :empty="true" :fixed="false" />
    <div class="container page-content">
      <client-only>
        <vue-easy-lightbox
          :moveDisabled="true"
          :visible="showImageModal"
          :imgs="imgs"
          @hide="handleHide"
        />
      </client-only>

      <h3 class="page-title">Projects</h3>

      <transition-group name="list" tag="div" class="projects-list">
        <ProjectListItem
          v-for="project in all_projects"
          :key="project.slug"
          :project="project"
          @imageClicked="onImageClicked(project)"
        />
      </transition-group>

      <a
        v-if="!loadingMore && projects.length < all_projects.length"
        name
        id
        class="btn btn-primary load-more"
        href="#work"
        role="button"
        @click.prevent="loadMore()"
        >{{ $t('work.cta.show_more') }}</a
      >
      <div v-else class="text-center" style="color: grey">
        {{ $t('work.cta.more_projects_on') }}
        <a href="https://github.com/redbayoub" style=""
          ><strong>Github</strong></a
        >
      </div>
    </div>

    <MyFooter />
  </div>
</template>

<script>
import NavBar from '@/components/Navbar'
import ProjectListItem from '@/components/ProjectListItem'
import MyFooter from '@/components/MyFooter'
import { toggleScroll } from '@/plugins/utils.js'
export default {
  async asyncData({ $content, params, error }) {
    const all_projects = await $content('projects')
      .sortBy('order', 'desc')
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    const projectsPerPage = 10
    return {
      all_projects,
      projects: all_projects.slice(0, projectsPerPage),
    }
  },
  components: {
    NavBar,
    ProjectListItem,
    MyFooter,
  },
  data() {
    return {
      loadingMore: false,
      projectsPerPage: 10,
      all_projects: [],
      projects: [],
      showImageModal: false,
      imgs: [],
    }
  },
  methods: {
    toggleScroll,
    async loadMore() {
      const increaseBy = this.projectsPerPage
      this.loadingMore = true
      this.projects.push(
        ...this.all_projects.slice(
          this.projects.length,
          this.projects.length + increaseBy
        )
      )
      await this.$nextTick()
      this.loadingMore = false
    },
    async onImageClicked(project) {
      this.imgs = project.thumbnail_img
      await this.$nextTick()
      this.showImageModal = true
      this.toggleScroll()
    },
    handleHide() {
      this.toggleScroll()
      this.showImageModal = false
    },
  },
}
</script>

<style lang="scss">
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.projects-page {
  html[lang='ar'] & {
    direction: rtl;
  }
  .page-title {
    margin: 0 0 1.5em;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: bold;

    html[lang='ar'] & {
      letter-spacing: 0px;
    }
  }
  .page-content {
    padding: 1.5em 0;
  }
}

.load-more {
  display: block;
  margin: 20px auto 0;
  max-width: 200px;
}
</style>