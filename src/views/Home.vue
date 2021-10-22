<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script lang="ts">
import {defineComponent, reactive, onMounted, ref} from 'vue'
import {Stage} from "@/logics/Stage";

interface State {
  stage: Stage | null;
}

export default defineComponent({
  components: {},
  setup() {
    let canvasRef = ref<HTMLCanvasElement | null>(null)
    let {stage} = reactive<State>({
      stage: null
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
