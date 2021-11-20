<template>
  <div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted} from "vue"
import store from "@/store"

export default defineComponent({
  setup() {
    onMounted(() => {
      const userPoint = ref(store.getters.userSate.point)
    })
    
    return {
      //userPoint
    }
  }
})
</script>

<style scoped lang="scss">

</style>
