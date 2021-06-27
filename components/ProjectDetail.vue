<template>
  <div class="container project-detail">
    <div class="col">
      <div class="line" :style="{ 'background-color': color }"></div>
      <h3 class="title"><slot name="title"></slot></h3>
    </div>
    <div class="col description">
      <slot name="description"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'project-detail',
  props: ['color'],
}
</script>

<style lang="scss">
.project-detail {
  .title {
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  .line {
    height: 4px;
    width: 50px;
    background-color: rgb(70, 70, 70);
    margin-bottom: 5px;
    margin-top: -5px;
    border-radius: 8px;
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
