<template>
  <div class="container hero project-hero">
    <div class="hero-text">
      <h1 class="hero-header" :style="{ color: project.primary_color }">
        {{ project.custom_title[$i18n.locale] }}
      </h1>

      <p class="hero-subtitle">{{ project.summery[$i18n.locale] }}</p>

      <div class="hero-actions">
        <a
          name
          id
          class="btn btn-primary btn-lg"
          :class="project.btnClass"
          href="#description"
          role="button"
          >{{ $t("hero.cta.learn_more") }}</a
        >
        <a
          v-if="project.links.page"
          name
          id
          class="btn btn-outline-primary"
          :class="project.btnClass"
          :href="project.links.page"
          role="button"
          >{{ $t("hero.cta.project_page") }}</a
        >
        <a
          v-if="project.links.source_code"
          name
          id
          class="btn btn-outline-primary"
          :class="project.btnClass"
          :href="project.links.source_code"
          role="button"
          >{{ $t("hero.cta.source_code") }}</a
        >
      </div>
    </div>
    <div class="hero-image">
      <img
        :src="project.hero_img"
        class="img-responsive project-image"
        alt=""
        width="300px"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "project-hero",
  props: ["project"],
};
</script>

<style lang="scss">
.project-hero {
  min-height: 80vh;

  .hero-actions {
    display: flex;
    flex-direction: column;
    width: 250px;

    .btn + .btn {
      margin: 1em 0 0;
    }
  }

  .project-image {
    margin: auto 0;
    border-radius: 10px;
    transform: perspective(1500px) rotateY(-45deg) rotateX(10deg);
  }

  html[lang="ar"] & {
    direction: rtl;
  }
  html[lang="ar"] & .project-image {
    transform: perspective(1500px) rotateY(45deg) rotateX(10deg);
  }
}

@media screen and (min-width: $md-brakepoint) {
  .project-hero {
    .hero-text {
      width: 60%;
    }

    .hero-image {
      display: flex;
    }
  }
}
</style>