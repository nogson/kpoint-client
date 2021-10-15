<template>
  <div class="stage">
  </div>
</template>

<script lang="ts">
import * as PIXI from 'pixi.js';
import {Options, Vue} from 'vue-class-component';

@Options({
  props: {
    msg: String
  }
})
export default class Home extends Vue {
  app!: PIXI.Application

  mounted() {
    this.app = new PIXI.Application({
      transparent: true,
      antialias: true,
      resolution: window.devicePixelRatio || 1, // 解像度に合わせた拡大率を指定する
      autoDensity: true, // CSSで見た目のサイズの戻してくれる,
      resizeTo: window
    });

    this.$el.appendChild(this.app.view);
    this.app.renderer.resize(window.innerWidth, window.innerHeight);

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
