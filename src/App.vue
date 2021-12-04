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
#app {
  font-family: 'M PLUS Rounded 1c', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #FFF;
  font-weight: $font-regular;
  font-size: 40px;
}
</style>
