<template>
  <div class="work bg-primary-light">
    <section class="container">
      <h1 class="section-title">{{ $t('work.title') }}</h1>
      <client-only>
        <vue-easy-lightbox
          :moveDisabled="true"
          :visible="showImageModal"
          :imgs="imgs"
          @hide="handleHide"
        />
      </client-only>

      <div class="section-content">
        <div ref="projectsList">
          <ProjectListItem
            style="background-color: var(--bg-color)"
            class="item"
            v-for="project in allProjects"
            :key="project.slug"
            :project="project"
            @imageClicked="onImageClicked(project)"
          />
        </div>

        <a
          v-if="displayedProjects < allProjects.length"
          name
          id
          class="btn btn-primary load-more"
          href="#"
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
    </section>
  </div>
</template>

<script>
import ProjectListItem from '@/components/ProjectListItem'
import { toggleScroll } from '@/plugins/utils'
export default {
  name: 'work',
  components: {
    ProjectListItem,
  },
  props: ['allProjects'],
  mounted() {
    const self = this
    this.$refs.projectsList.children.forEach((child, index) => {
      if (index < self.projectsPerPage) {
        child.classList.remove('hidden')
      } else {
        child.classList.add('hidden')
      }
    })
  },
  data() {
    return {
      projectsPerPage: 2,
      displayedProjects: 2,
      showImageModal: false,
      imgs: [],
    }
  },
  methods: {
    toggleScroll,
    getProjectBgColor(project) {
      const colorValues = getColorValues(project.primary_color)
      return (
        'rgba(' +
        colorValues[0] +
        ',' +
        colorValues[1] +
        ',' +
        colorValues[2] +
        ',.4)'
      )
    },
    async loadMore() {
      const self = this
      this.displayedProjects += this.projectsPerPage
      await this.$nextTick()
      this.$refs.projectsList.children.forEach((child, index) => {
        if (index < self.displayedProjects) {
          child.classList.remove('hidden')
        } else {
          child.classList.add('hidden')
        }
      })
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
html[lang='ar'] .work {
  direction: rtl;
}

.load-more {
  display: block;
  margin:0 auto 0;
  max-width: 200px;
}
</style>