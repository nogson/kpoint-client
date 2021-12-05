<template>
  <router-view v-if="state.initialized"/>
</template>

<script lang='ts'>
import {defineComponent, onBeforeMount, reactive} from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  setup() {
    const state = reactive({
      initialized: false
    })
    const store = useStore()
    onBeforeMount(async () => {
      await store.dispatch('getUserState')
      await store.dispatch('getPresents')
      await store.dispatch('getPoints')
      state.initialized = true
    })
    return {
      state
    }
  }
})

</script>

<style lang="scss">
</style>
