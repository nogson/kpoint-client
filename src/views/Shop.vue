<template>
  <section>
    <back-button class="back-button" />
    <div id="shop">
      <div class="present-wrap">
        <h1>おみせ</h1>
        <dl v-for="(present,index) in presents" :key="index" class="present" @click="getPresent(present)">
          <dt><img :src="present.thumbnail"></dt>
          <dd>
            <p>{{ present.name }}</p>
            <span class="value"><i></i><span>{{ present.point }}</span></span>
          </dd>
        </dl>
      </div>
    </div>
  </section>
</template>


<script lang='ts'>
    import {computed, defineComponent, onBeforeMount} from "vue"
    import {useStore} from "vuex"
    import BackButton from '@/components/BackButton.vue'

    interface Present {
        name: string
        point: number
        thumbnail: string
    }


    export default defineComponent({
        components: {
            BackButton
        },
        setup() {
            const store = useStore()
            const presents = computed(() => store.getters.presents)

            const getPresent = async (present: Present) => {
                await store.dispatch('setPoint', -present.point)
            }

            return {
                presents,
                getPresent
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
  }

  .present-wrap {
    position: relative;
    left: 0;
    width: 380px;
    background: $color-secondary;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 100px 100px 20px 20px;
    padding: 90px 24px 24px;

    h1 {
      text-align: center;
      position: absolute;
      left: (380px - 395px) /2;
      top: -20px;
      //transform: translate(50%,0);
      width: 395px;
      height: 91px;
      font-size: 32px;
      background: url("../assets/images/shop_title.png");
      padding-top: 7px;
      font-weight: $font-black;
      text-shadow: 0 0 5px darken($color-pink, 20%);
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
    left:24px;
    top:24px;
  }
</style>
