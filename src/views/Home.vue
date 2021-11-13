<template>
  <canvas ref='canvasRef'></canvas>
</template>

<script lang='ts'>
import {defineComponent, reactive, onMounted, onBeforeMount, ref} from 'vue'
import {Stage} from '@/logics/Stage'
import {useStore} from 'vuex'


interface State {
  stage: Stage | null;
}

export default defineComponent({
  components: {},
  setup() {
    const store = useStore()
    let canvasRef = ref<HTMLCanvasElement | null>(null)
    let {stage} = reactive<State>({
      stage: null
    })

    onBeforeMount(async () => {
      await store.dispatch('getPresents')
    })


    onMounted(() => {
      if (canvasRef.value) {
        stage = new Stage(canvasRef.value)
      }
    })

    return {
      canvasRef
    }
  }
})

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
</style>
