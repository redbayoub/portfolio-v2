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
        <transition-group tag="div" name="list">
          <ProjectListItem
            style="background-color: var(--bg-color)"
            class="item"
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
    this.displayedProjects = this.allProjects.slice(0, this.projectsPerPage)
  },
  data() {
    return {
      projectsPerPage: 2,
      displayedProjects: [],
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
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}

html[lang='ar'] .work {
  direction: rtl;
}

.load-more {
  display: block;
  margin: 0 auto 0;
  max-width: 200px;
}
</style>