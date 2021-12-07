<template>
  <div class="rotate-content">
    <div class="rotate-content-inner">
      <slot />
    </div>
    <div class="bg"></div>
  </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue'

    export default defineComponent({
        components: {},
    })
</script>

<style scoped lang="scss">
$size:350px;
$size2:270px;
.rotate-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: $size;
  height: $size;
  margin: 24px auto;
}
.bg {
  position: absolute;
  left: 0;
  top: 0;
  width: $size;
  height: $size;
  background: center / contain no-repeat url("../assets/images/bg_circle.png");
  animation-name: rotate;
  animation-duration: 5s;
  animation-timing-function: cubic-bezier(0.5, 0.51, 0.51, 0.52);
  animation-iteration-count: infinite;
}
.rotate-content-inner {
  background: #FFF;
  box-sizing: border-box;
  border-radius: 100%;
  width: $size2;
  height: $size2;
  margin: 48px auto;
  color: $color-primary;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 10px solid $color-primary;
}

@keyframes rotate {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
