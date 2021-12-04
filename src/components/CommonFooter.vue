<template>
  <footer>
    <nav>
      <ul>
        <li><router-link to="edit-points">ポイント更新</router-link></li>
        <li><router-link to="edit-presents">おみせ更新</router-link></li>
      </ul>
    </nav>
  </footer>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted} from "vue"
import store from "@/store"

export default defineComponent({
  setup() {


    return {}
  }
})
</script>

<style scoped lang="scss">
ul{
  list-style: none;
  font-size: 14px;
  display: flex;
  margin-top: 64px;
  li {
    margin-left: 24px;
    a:visited,a:link {
      color: $color-black;
    }
    &:first-child{
      margin-left: auto;
    }
  }
}
</style>
