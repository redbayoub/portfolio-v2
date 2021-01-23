<template>
  <div v-if="project">
    <NavBar id="navbar" :empty="true" :fixed="false" />

    <ProjectHero :project="project" />
    <client-only>
      <vue-easy-lightbox
        :moveDisabled="true"
        :visible="showImageModal"
        :imgs="project.screenshots"
        :index="selectedImageIndex"
        @hide="handleHide"
      />
    </client-only>

    <ProjectDetail id="description" :color="project.primary_color">
      <template v-slot:title>
        {{ $t('project_details.description') }}
      </template>
      <template v-slot:description>
        {{ project.custom_description[$i18n.locale] }}
      </template>
    </ProjectDetail>

    <ProjectDetail :color="project.primary_color">
      <template v-slot:title> {{ $t('project_details.role') }} </template>
      <template v-slot:description> {{ project.role[$i18n.locale] }} </template>
    </ProjectDetail>

    <ProjectDetail :color="project.primary_color">
      <template v-slot:title>
        {{ $t('project_details.technologies') }}
      </template>
      <template v-slot:description>
        <div class="chips">
          <Chip v-for="(stack, index) in project.stacks" :key="index">{{
            stack
          }}</Chip>
        </div>
      </template>
    </ProjectDetail>

    <ProjectDetail :color="project.primary_color">
      <template v-slot:title>
        {{ $t('project_details.screenshots') }}
      </template>
      <template v-slot:description>
        <div class="project-screenshots-list no-select" ref="hScroll">
          <img
            :key="index"
            v-for="(url, index) in project.screenshots"
            :src="url"
            class="img-responsive rounded"
            :alt="project.custom_title.en + ' screenshot ' + index"
            @click.prevent="onImageClicked(index)"
          />
        </div>
      </template>
    </ProjectDetail>
    <MyFooter />
  </div>
</template>

<script>
import NavBar from '@/components/Navbar'
import ProjectHero from '@/components/ProjectHero'
import ProjectDetail from '@/components/ProjectDetail'
import Chip from '@/components/Chip'
import SvgIcon from '@/components/SvgPathIcon'
import MyFooter from '@/components/MyFooter'
import { projectDetailsMeta } from '@/plugins/pages_meta'
import { isMobile, toggleScroll } from '@/plugins/utils'

export default {
  name: 'project-details',
  components: {
    NavBar,
    ProjectHero,
    ProjectDetail,
    Chip,
    MyFooter,
    SvgIcon,
  },
  async asyncData({ $content, params, error }) {
    const slug = params.slug
    const project = await $content('projects', slug)
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    return {
      project,
    }
  },
  head() {
    const projectMeta = projectDetailsMeta(this.project)
    const locale = this.$i18n.locale
    return {
      title: projectMeta.title[locale],
      meta: [
        {
          name: 'description',
          hid: 'description',
          content: projectMeta.description[locale],
        },
        {
          name: 'og:title',
          content: projectMeta.og.title[locale],
        },
        {
          name: 'og:description',
          content: projectMeta.og.description[locale],
        },
        {
          name: 'og:image',
          content: projectMeta.og.image[locale],
        },
        {
          name: 'og:url',
          content: projectMeta.og.url[locale],
        },
        {
          name: 'og:site_name',
          content: projectMeta.og.site_name[locale],
        },
        {
          name: 'twitter:image:alt',
          content: projectMeta.twitter.image.alt[locale],
        },
        {
          name: 'twitter:card',
          content: projectMeta.twitter.card,
        },
      ],
    }
  },
  async mounted() {
    if (this.$i18n.locale == 'ar') this.horizontalScrollMultiplier = -1

    if (!isMobile()) {
      const hScroll = this.$refs.hScroll
      hScroll.addEventListener('wheel', this.horizontalScroll, true)
    }
  },
  data() {
    return {
      project: null,
      selectedImageIndex: 0,
      horizontalScrollMultiplier: 1,
      showImageModal: false,
    }
  },

  methods: {
    toggleScroll,
    horizontalScroll(e) {
      e.preventDefault()
      const hScroll = this.$refs.hScroll
      hScroll.scrollLeft += e.deltaY * this.horizontalScrollMultiplier
    },
    async onImageClicked(index) {
      this.selectedImageIndex = index
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
.project-screenshots-list {
  display: flex;
  overflow-x: auto;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 15px;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: black;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: grey;
    border-radius: 50px;
  }

  img + img {
    margin-left: 2em;
  }

  html[lang='ar'] & img + img {
    margin-left: 0;
    margin-right: 2em;
  }

  img {
    height: 300px;

    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072);
  }
}
</style>