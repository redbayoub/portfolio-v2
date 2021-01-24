<template>
  <div class="chip">
    <slot />
  </div>
</template>

<script>
export default { name: 'chip' }
</script>

<style lang="scss">
.chip {
  display: flex;
  --chip-height: 30px;
  text-align: center;
  background-color: rgba($color: #eeeeee, $alpha: .8);
  border-radius: calc(0.5 * var(--chip-height));
  font-size: 0.8em;
  height: var(--chip-height);
  align-items: center;
  justify-content: center;
}
</style>