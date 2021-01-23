<template>
  <footer class="text-center">{{ $t("copyrights") }} Red Bayoub</footer>
</template>

<script>
import SvgIcon from "@/components/SvgPathIcon";
export default {
  name: "my_footer",
  components: {
    SvgIcon,
  },
};
</script>

<style>
footer {
  background-color: #000000;
  color: rgb(230, 230, 230);
  text-transform: capitalize;
  margin: 0 auto;
  font-size: 0.9em;
  padding: 10px 0;
}

html[lang="ar"] footer {
  direction: rtl;
}
</style>