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
        <transition-group name="list" tag="div">
          <ProjectListItem
            v-for="project in projects"
            :key="project.slug"
            :project="project"
            @imageClicked="onImageClicked(project)"
          />
        </transition-group>
        <a
          v-if="!loadingMore && projects.length < allProjects.length"
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
  async mounted() {
    await this.$nextTick()
    this.projects = this.allProjects.slice(0, this.projectsPerPage)
  },
  data() {
    return {
      loadingMore: false,
      projectsPerPage: 2,
      projects: [],
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
      const increaseBy = this.projectsPerPage
      this.loadingMore = true
      this.projects.push(
        ...this.allProjects.slice(
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

html[lang='ar'] .work {
  direction: rtl;
}

.load-more {
  display: block;
  margin: 20px auto 0;
  max-width: 200px;
}
</style>