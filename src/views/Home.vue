<template>
    <canvas ref="canvasRef"></canvas>
</template>

<script lang="ts">
import * as PIXI from 'pixi.js';

import {defineComponent, reactive, onMounted, ref} from 'vue'
import {PixiApp} from "@/logics/PixiApp";

interface State {
  app: PixiApp | null;
}

export default defineComponent({
  components:{
  },
  setup() {
    let canvasRef = ref<HTMLCanvasElement | null>(null)
    let {app} = reactive<State>({
      app: null
    })
    onMounted(() => {
      if (canvasRef.value) {
        app = new PixiApp(canvasRef.value)
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
