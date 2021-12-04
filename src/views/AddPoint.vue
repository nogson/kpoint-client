<template>
  <section>
    <router-link to="/"><span class="button-icon-1"><chevron-left :size="32"/></span></router-link>
    <div id="add-points">
      <div class="points-wrap">
        <h1>ポイント</h1>
        <div v-for="(point,index) in points" :key="index" class="point" @click="addPoint(point.point)">
          <span class="value">{{ point.point }}</span> {{ point.label }}
        </div>
      </div>
    </div>
  </section>
</template>


<script lang='ts'>
import {computed, defineComponent, onBeforeMount} from "vue"
import {useStore} from "vuex"
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'


export default defineComponent({
  components: {ChevronLeft},
  setup() {
    const store = useStore()
    const points = computed(() => store.getters.points)

    const addPoint = async (point: number) => {
      await store.dispatch('setPoint', point)
    }

    return {
      points,
      addPoint
    }
  }
})
</script>

<style scoped lang='scss'>
#add-points {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.points-wrap {
  position: relative;
  left: 0;
  width: 380px;
  background: #00C2FF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 100px 100px 20px 20px;
  padding: 90px 24px 24px;

  h1 {
    position: absolute;
    left: (380px - 395px) /2;
    top: -20px;
    //transform: translate(50%,0);
    width: 395px;
    height: 91px;
    font-size: 32px;
    background: url("../assets/images/add_point_title.png");
    padding-top: 7px;
    font-weight: $font-black;
    text-shadow: 0 0 5px darken($color-secondary, 20%);
    text-align: center;
  }
}

.point {
  cursor: pointer;
  font-size: 18px;
  font-weight: $font-black;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  color: $color-black;
  margin-bottom: 24px;
  padding: 24px;
  display: flex;
  align-items: center;
  text-align: center;

  .value {
    display: block;
    height: 70px;
    width: 70px;
    line-height: 70px;
    font-size: 24px;
    color: $color-primary;
    background: url("../assets/images/icon_point.png");
    margin-right: 24px;
  }
}
</style>
