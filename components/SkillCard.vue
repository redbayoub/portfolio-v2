<template>
  <div class="skill-card">
    <SvgIcon class="" width="100" height="100" :name="svg" :fill="iconFill" />
    <div class="skill-card-body">
      <h5 class="skill-title">{{ title }}</h5>
      <p class="card-text">{{ content }}</p>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgPathIcon";
export default {
  name: "skill-card",
  props: {
    svg: String,
    title: String,
    content: String,
    iconFill: String,
  },
  components: {
    SvgIcon,
  },
};
</script>

<style>
.skill-card {
  color: var(--text-color);
  text-align: center;
}
.skill-card .card-text {
  color: var(--text-color);
  font-size: .9em;
}
.skill-title {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.2;
  margin: 0;
  margin-bottom: 5px;
}
.skill-card-body {
  padding-top: 10px !important;
}
</style>