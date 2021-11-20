<template>
  <points v-if="isInitialized"/>
</template>

<script lang='ts'>
import {defineComponent, reactive, onMounted, onBeforeMount, ref} from 'vue'
import {useStore} from 'vuex'
import Points from '@/components/Points.vue'

export default defineComponent({
  components: {Points},
  setup() {
    const store = useStore()
    let isInitialized = ref(false)

    onBeforeMount(async () => {
      await store.dispatch('getUserState')
      await store.dispatch('getPresents')
      await store.dispatch('getPoints')
      isInitialized.value = true
    })

    return {
      isInitialized
    }
  }
})

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
</style>
