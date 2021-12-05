<template>
  <section class="home-content">
    <div class="top-content">
      <h1>Kポイント</h1>
      <h2>がんばれ！こうちゃん！！</h2>
      <div class="point-content">
        <div class="point-content-inner">
          <h3>かくとくポイント</h3>
          <user-point/>
          <p class="point-text">ポイント</p>
        </div>
        <div class="bg"></div>
      </div>
    </div>
    <div class="bottom-content">
      <div class="button-wrap">
        <router-link to="add-point">
          <button class="point-button">
            <span><img src="@/assets/images/k_point.png"/><span>ポイント</span></span>
          </button>
        </router-link>
        <router-link to="shop">
          <button class="point-button"><span><img src="@/assets/images/shop.png"/><span>おみせ</span></span></button>
        </router-link>
      </div>
      <common-footer/>
    </div>
  </section>
</template>

<script lang='ts'>
    import {defineComponent} from 'vue'
    import CommonFooter from "@/components/CommonFooter.vue"
    import UserPoint from "@/components/UserPoint.vue"

    export default defineComponent({
        components: {CommonFooter, UserPoint},
        setup() {
            return {}
        }
    })

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  h1 {
    font-weight: $font-black;
    font-size: 48px;
  }

  h2 {
    font-size: 18px;
  }

  .home-content {
    height: 100vh;
  }

  .top-content {
    padding: 64px 0;

    text-align: center;
  }

  .bottom-content {
    padding: 24px;
    background: $color-yellow;


    .button-wrap {
      display: flex;
      gap: 24px;
      justify-content: center;
    }
  }

  .point-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
      width: 383px;
    height: 374px;
    margin: 24px auto;

    .bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 383px;
      height: 374px;
      background: center / contain no-repeat url("../assets/images/bg_circle.png");
      animation-name: rotate;
      animation-duration: 5s;
      animation-timing-function: cubic-bezier(0.5, 0.51, 0.51, 0.52);
      animation-iteration-count: infinite;
    }

    .point-content-inner {
      background: #FFF;
      box-sizing: border-box;
      border-radius: 100%;
      width: 300px;
      height: 300px;
      margin: 48px auto;
      color: $color-primary;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border: 10px solid $color-primary;
    }

    h3 {
      font-size: 20px;
      font-weight: $font-black;
    }

    .point {
      font-weight: $font-black;
      font-size: 72px;
      line-height: 1;
      text-shadow: 0px 4px 0px darken($color-primary, 20%);
    }

    .point-text {
      font-size: 16px;
      font-weight: $font-bold;
    }
  }

  .point-button {
    width: 200px;
    height: 200px;
    transform: rotate(-19deg);
    border-radius: 43% 57% 43% 57% /
    57% 43% 57% 43%;
    background: $color-primary;
    box-shadow: inset 0px 5px 0px lighten($color-primary, 10%), inset 0px -5px 0px darken($color-primary, 10%);

    > span {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transform: rotate(19deg);
      font-size: 32px;
      font-weight: $font-black;
      color: #FFF;
      text-align: center;

      img {
        text-align: center;
      }

    }
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
