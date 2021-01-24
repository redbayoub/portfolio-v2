<template>
  <div class="project-details-wrapper">
    <div class="chips">
      <Chip v-for="(stack, index) in project.stacks" :key="index">{{
        stack
      }}</Chip>
    </div>
    <img
      :src="project.thumbnail_img"
      class="project-image"
      :alt="project.custom_title.en + ' image'"
      :style="{ 'background-color': getProjectBgColor() }"
      @click="onImageClicked"
    />
    <div class="project-details">
      <NuxtLink
        :to="localePath('/projects/' + project.slug)"
        class="btn btn-link-primary title"
      >
        {{ project.custom_title[$i18n.locale] }}</NuxtLink
      >

      <p class="description">
        {{ project.summery[$i18n.locale] }}
      </p>
    </div>
  </div>
</template>

<script>
import Chip from '@/components/Chip'
import { getColorValues } from '@/plugins/utils'

export default {
  components: {
    Chip,
  },
  props: ['project'],
  methods: {
    getProjectBgColor() {
      const colorValues = getColorValues(this.project.primary_color)
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

    onImageClicked() {
      this.$emit('imageClicked')
    },
  },
}
</script>

<style lang="scss" scooped>
.project-details {
  .title {
    font-weight: bold;
    font-size: 1.3rem;
  }

  .description {
    font-size: 0.9rem;
    margin: 0.7em 0 1.3em;
    line-height: 1.3em;
  }
}
.project-image {
  max-width: 100%;
  object-fit: cover;
  background-color: rgba(41, 41, 41, 0.8);
}

.project-details-wrapper {
  position: relative;
  margin: 0 auto 2em;
  border-radius: 10px;
  transition: all 0.5s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.12);

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.13), 0 3px 6px rgba(0, 0, 0, 0.18);
  }

  .project-details {
    padding: 1em;
  }

  &.hidden {
    opacity: 0;
    height: 0;
    width: 0;
    margin: 0;
    transform: translateY(-30px);
  }

  img {
    cursor: zoom-in;
    border-radius: 10px 10px 0px 0px;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    position: absolute;
    top: 10px;
    right: 10px;

    html[lang='ar'] & {
      right: 0;
      left: 10px;
    }

    .chip {
      padding: 0px 1em;
      background-color: rgba($color: #242424, $alpha: 0.7);
      color: rgb(228, 228, 228);
      --chip-height: 20px;
      font-size: 0.7em;
    }
  }
}

@media screen and (min-width: $md-brakepoint) {
  .project-details-wrapper {
    display: flex;
    flex-direction: row-reverse;

    .project-details {
      width: 40%;
      margin-right: 1em;
      display: flex;
      flex-direction: column;
    }

    .project-image {
      width: 60%;
      border-radius: 0px 10px 10px 0px;
    }
    html[lang='ar'] & .project-image {
      border-radius: 10px 0px 0px 10px;
    }
  }
  html[lang='ar'] .project-details {
    margin-right: 0;
    margin-left: 1em;
  }
}

@media screen and (min-width: $lg-brakepoint) {
  .project-details-wrapper {
    .project-details {
      width: 30%;
    }
    .project-image {
      width: 70%;
    }
  }
}
</style>