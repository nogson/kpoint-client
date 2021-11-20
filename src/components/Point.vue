<template>
  <div class="point-wrap">
    <div class="super-ellipse" :class="{act:isActive,'de-act':!isActive}">
      <span class="point">1</span>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

type Props = {
  isActive: boolean;
};

export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  setup(props: Props) {
    return {}
  }
})
</script>

<style scoped lang="scss">
.point-wrap {
  width: 100px;
  height: 100px;
  position: relative;
}


.super-ellipse {
  width: 100%;
  height: 100%;
  transform: rotate(-19deg);
  border-radius: 43% 57% 43% 57% /
    57% 43% 57% 43%;
  border: 2px solid #FFFFFF;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  &.act {
    background: linear-gradient(135.99deg, #5bd7ff 14.81%, #00B1E9 87.07%);
  }

  &.de-act {
    background: linear-gradient(135.99deg, #D6D6D6 14.81%, #afafaf 87.07%);
  }
}

.point {
  display: block;
  transform: rotate(19deg);
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 58px;
  color: #FFF;
  text-shadow: -1px -1px 0px #989898, 1px 1px 2px #D5D5D5;
}
</style>
