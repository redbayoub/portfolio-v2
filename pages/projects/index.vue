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
      <div style="height:50px"></div>
      <h2 class="page-title">{{ $t('work.title') }}</h2>

      <transition-group tag="div" name="list">
        <ProjectListItem
          style="background-color: var(--bg-color-darken)"
          v-for="project in displayedProjects"
          :key="project.slug"
          :project="project"
          @imageClicked="onImageClicked(project)"
        />
      </transition-group>

      <a
        v-if="displayedProjects.length < allProjects.length"
        name
        id
        class="btn btn-primary load-more"
        href="#work"
        role="button"
        @click.prevent="loadMore()"
        >{{ $t('work.cta.show_more') }}</a
      >
      <div v-else class="text-center">
        {{ $t('work.cta.more_projects_on') }}
        <a href="https://github.com/redbayoub" class="btn-link-primary"
          ><strong>Github</strong></a
        >
      </div>
    </div>
    <Contact />
    <MyFooter />
  </div>
</template>

<script>
import NavBar from '@/components/Navbar'
import ProjectListItem from '@/components/ProjectListItem'
import MyFooter from '@/components/MyFooter'
import Contact from '@/components/Contact'
import { toggleScroll } from '@/plugins/utils.js'
export default {
  async asyncData({ $content, params, error }) {
    const allProjects = await $content('projects')
      .sortBy('order', 'desc')
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    return {
      allProjects,
    }
  },
  components: {
    NavBar,
    ProjectListItem,
    MyFooter,
    Contact,
  },
  data() {
    return {
      projectsPerPage: 5,
      allProjects: [],
      displayedProjects: [],
      showImageModal: false,
      imgs: [],
    }
  },
  mounted() {
    this.displayedProjects = this.allProjects.slice(0, this.projectsPerPage)
  },
  methods: {
    toggleScroll,
    loadMore() {
      this.displayedProjects = this.allProjects.slice(
        0,
        this.displayedProjects.length + this.projectsPerPage
      )
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
    padding-top: 1.5em;
    padding-bottom: 1.5em;
  }
}

.load-more {
  display: block;
  margin: 20px auto 0;
  max-width: 200px;
}
</style>