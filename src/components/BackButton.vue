<template>
  <router-link to="/" class="button"><span class="button-icon-1"><chevron-left :size="32" class="icon"/></span>
  </router-link>
</template>

<script lang="ts">
    import {defineComponent} from 'vue'
    import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'

    export default defineComponent({
        components: {ChevronLeft},
    })
</script>

<style scoped lang="scss">
  .button {
    line-height: 1;
    display: block;
  }
  .icon {
    display: flex;
  }
</style>
