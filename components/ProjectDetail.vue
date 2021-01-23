<template>
  <section class="container project-detail">
    <div class="col">
      <h3 class="title"><slot name="title"></slot></h3>
      <div class="line" :style="{ 'background-color': color }"></div>
    </div>
    <div class="col description">
      <slot name="description"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "project-detail",
  props: ["color"],
};
</script>

<style lang="scss">
.project-detail {
  .title {
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  .line {
    height: 4px;
    width: 100px;
    background-color: rgb(70, 70, 70);
    margin-top: 5px;
  }

  .description {
    padding: 1em 0;
    line-height: 1.8em;
  }
}

html[lang="ar"] .project-detail {
  direction: rtl;
  .title {
    letter-spacing: 0px;
  }
}

@media screen and (min-width: $md-brakepoint) {
  .project-detail {
    display: flex;

    .description {
      padding: 0px;
    }

    .col {
      width: 50%;
    }
  }
}
</style>
