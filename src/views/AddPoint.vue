<template>
  <section id='add-points'>
    <back-button class='back-button'/>
    <div>
      <div class='points-wrap'>
        <h1><img src="@/assets/images/add_point_title.png" alt="ポイント"></h1>
        <div v-for='(point,index) in points' :key='index' class='point' @click='addPoint(point.point)'>
          <span class='value'>{{ point.point }}</span> {{ point.label }}
        </div>
      </div>
    </div>
    <!-- モーダル -->
    <teleport to="body">
      <transition name="fade">
        <div class="dialog-wrapper" v-if="state.isModalOpen">
          <div class='dialog'>
            <rotate-circle>
              <div>
                <p>
                  がんばったね！
                </p>
                <p class='get-point'>
                  {{state.getPoint}}ポイントゲット！
                </p>
                <div class="current-point">
                  <user-point/>
                  <span>ポイント</span></div>
              </div>
            </rotate-circle>
          </div>
        </div>
      </transition>
    </teleport>
  </section>
</template>


<script lang='ts'>
import {computed, defineComponent, onBeforeMount, reactive} from 'vue'
import {useStore} from 'vuex'
import BackButton from '@/components/BackButton.vue'
import UserPoint from '@/components/UserPoint.vue'
import {gsap} from 'gsap'
import RotateCircle from "@/components/RotateCircle.vue"

interface State {
  isModalOpen: boolean,
  getPoint:number|null
}

export default defineComponent({
  components: {RotateCircle, BackButton, UserPoint},
  setup() {
    const store = useStore()
    const points = computed(() => store.getters.points)
    const state = reactive<State>({
      isModalOpen: false,
      getPoint:null
    })

    const addPoint = async (point: number) => {
      await store.dispatch('setPoint', point)
      state.isModalOpen = true
      state.getPoint = point
      setTimeout(() => {
        state.isModalOpen = false
        state.getPoint = null
      }, 3000)
    }

    return {
      points,
      addPoint,
      state
    }
  }
})
</script>

<style scoped lang='scss'>
#add-points {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
}

.points-wrap {
  position: relative;
  left: 0;
  width: 332px;
  background: #00C2FF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 150px 150px 20px 20px;
  padding: 90px 24px 24px;

  h1 {
    position: absolute;
    left: (332px - 550px) /2;
    top: -20px;
    //transform: translate(50%,0);
    width: 550px;
    height: 91px;
    font-size: 32px;
    //background: url('../assets/images/add_point_title.png') no-repeat center;
    background-size: contain;
    padding-top: 7px;
    font-weight: $font-black;
    text-shadow: 0 0 5px darken($color-secondary, 20%);
    text-align: center;
    color: #FFF;
  }
}

.point {
  cursor: pointer;
  font-size: 16px;
  font-weight: $font-black;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  color: $color-black;
  margin-bottom: 24px;
  padding: 24px;
  display: flex;
  align-items: center;
  text-align: left;

  .value {
    display: block;
    height: 70px;
    width: 70px;
    line-height: 70px;
    font-size: 24px;
    color: $color-primary;
    background: url('../assets/images/icon_point.png');
    margin-right: 18px;
    flex-shrink: 0;
    text-align: center;
  }
}

.back-button {
  position: absolute;
  left: 24px;
  top: 24px;
  z-index: 100;
}

.dialog-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  right: 100%;
  top: 0;
  bottom: 100%;
  background: rgba(#FFF, 0.8);
}

.dialog {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 468px;
  font-size: 16px;

  .get-point {
    font-size: 24px;
    font-weight: $font-black;
    color: $color-primary;
  }

  .current-point {
    display: inline-block;

    > span:last-child {
      display: block;
      font-size: 14px;
      text-align: center;
    }
  }
}


.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  top: 75%;
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
