<template>
  <section>
    <back-button class="back-button"/>
    <div id="shop">
      <div class="present-wrap">
        <h1><img src="@/assets/images/shop_title.png" alt="おみせ"></h1>
        <div v-if="state.isInsufficientPoint" class="insufficient-point"><span>ポイントが足らない</span>
          <emoticon-cry-outline :size="32" class="icon"/>
        </div>
        <dl v-for="(present,index) in presents" :key="index" class="present" @click="getPresent(present)">
          <dt><img :src="present.thumbnail"></dt>
          <dd>
            <p>{{ present.name }}</p>
            <span class="value"><i></i><span>{{ present.point }}</span></span>
          </dd>
        </dl>
      </div>
    </div>
    <!-- モーダル -->
    <teleport to="body">
      <transition name="fade">
        <div v-if="state.isModalOpen" class="dialog-wrapper">
          <div class='dialog'>
            <rotate-circle>
              <div>
                <p><img :src="state.selectedPresent.thumbnail"></p>
                <p class='get-point'>
                  {{ state.selectedPresent.name }}ゲット！
                </p>
                <div class="current-point">
                  <span>のこり</span>
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
    import {computed, defineComponent, onBeforeMount, reactive} from "vue"
    import {useStore} from "vuex"
    import BackButton from '@/components/BackButton.vue'
    import UserPoint from '@/components/UserPoint.vue'
    import EmoticonCryOutline from 'vue-material-design-icons/EmoticonCryOutline.vue'
    import RotateCircle from "@/components/RotateCircle.vue"

    interface Present {
        name: string
        point: number
        thumbnail: string
    }

    interface State {
        isModalOpen: boolean,
        selectedPresent: Present | null,
        isInsufficientPoint: boolean
    }

    export default defineComponent({
        components: {
            RotateCircle,
            BackButton,
            UserPoint,
            EmoticonCryOutline
        },
        setup() {
            const state = reactive<State>({
                isModalOpen: false,
                selectedPresent: null,
                isInsufficientPoint: false
            })
            const store = useStore()
            const presents = computed(() => store.getters.presents)

            const getPresent = async (present: Present) => {

                if (0 > store.getters.userSate.point - present.point) {
                    state.isInsufficientPoint = true
                    return
                }

                await store.dispatch('setPoint', -present.point)
                state.selectedPresent = present
                state.isModalOpen = true
                state.isInsufficientPoint = false
                setTimeout(() => {
                    state.isModalOpen = false
                    state.selectedPresent = null
                }, 3000)
            }

            return {
                presents,
                getPresent,
                state
            }
        }
    })
</script>

<style scoped lang='scss'>
  #shop {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
  }

  .present-wrap {
    position: relative;
    left: 0;
    width: 332px;
    background: $color-secondary;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 150px 150px 20px 20px;
    padding: 90px 24px 24px;

    h1 {
      text-align: center;
      position: absolute;
      left: (332px - 550px) /2;
      top: -20px;
      //transform: translate(50%,0);
      width: 550px;
      height: 91px;
      font-size: 32px;
      //background: url("../assets/images/shop_title.png") no-repeat center;
      background-size: contain;
      padding-top: 7px;
      font-weight: $font-black;
      text-shadow: 0 0 5px darken($color-pink, 20%);
      color: #FFF;
    }
  }

  .present {
    font-weight: $font-black;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    color: $color-black;
    margin-bottom: 24px;
    padding: 24px;
    display: flex;
    align-items: center;
    cursor: pointer;

    dt {
      width: 80px;
    }

    dd {
      flex: 1;
      margin-left: 16px;
      font-size: 14px;
      text-align: left;

      p {
        margin-bottom: 8px;
        font-weight: $font-bold;
      }
    }

    .value {
      display: inline-flex;
      font-size: 24px;
      color: $color-black;
      display: flex;

      i {
        width: 32px;
        height: 32px;
        margin: 0 8px 0 auto;
        background: url("../assets/images/k_point_s.png") no-repeat center left;
      }
    }
  }

  .back-button {
    position: absolute;
    left: 24px;
    top: 24px;
    z-index: 100;
  }

  .insufficient-point {
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
    font-weight: bold;

    span:first-child {
      display: block;
      margin: -6px 8px 0 0;
    }
  }

  .dialog-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    right: 100%;
    top: 0;
    bottom: 100%;
    background: rgba(#FFF,0.8);
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
    width: 479px;
    height: 468px;
    font-size: 16px;

    img {
      text-align: center;
      margin: 0 auto;
      width: 75px;

    }

    .get-point {
      font-size: 24px;
      font-weight: $font-black;
      color: $color-primary;
    }

    .current-point {
      display: flex;
      align-items: end;
      justify-content: center;
      .user-point {
        font-size: 24px;
        padding: 0 4px;
      }

      > span {
        font-size: 14px;
        line-height: 1;
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
