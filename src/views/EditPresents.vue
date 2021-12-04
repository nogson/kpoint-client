<template>
  <section id="edit-present">
    <article>
      <h1>
        <router-link to="/"><span class="button-icon-1"><chevron-left :size="32"/></span></router-link>
        <span>プレゼントの追加・編集・削除</span></h1>
      <div class="form-box">
        <div v-for="(present,index) in state.presents" :key="index" class="point">
          <div>
            <dl>
              <dt>名前</dt>
              <dd><input type="text" v-model="present.label" name="name"></dd>
            </dl>
            <dl>
              <dt>ポイント</dt>
              <dd><input type="number" v-model="present.point" name="point"></dd>
            </dl>
            <dl>
              <dt>サムネイル</dt>
              <dd><input type="file" name="thumbnail" @change="onUpload($event,present)"></dd>
            </dl>
          </div>
          <div @click="deleteItem(present)">削除</div>
        </div>
        <div class="button-wrap">
          <button type="button" class="button-1" @click="addItem">新規追加</button>
          <button type="button" class="button-2" @click="updateItem">更新</button>
        </div>
      </div>
    </article>
  </section>
</template>


<script lang='ts'>
    import {computed, defineComponent, onMounted, reactive} from 'vue'
    import {useStore} from 'vuex'
    import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'

    interface Present {
        name: string | null
        point: number | null
    }

    interface State {
        presents: Present[]
    }

    export default defineComponent({
        components: {ChevronLeft},
        setup() {
            const store = useStore()

            const state = reactive<State>({
                presents: store.getters.presents
            })

            onMounted(() => {
                state.presents = store.getters.points
            })

            const form = reactive<Present>({
                name: null,
                point: null
            })

            const addItem = () => {
                state.presents.push({
                    name: null,
                    point: null
                })
            }

            const updateItem = async () => {
                await store.dispatch('updatePointItem', state.presents)
                state.presents = store.getters.points

            }

            const deleteItem = async (point: Present) => {
                await store.dispatch('deletePointItem', point)
                state.presents = store.getters.points
            }

            const onUpload = (e: Event, present: Present) => {
                // TODO ASはつかわない
                console.log(e, present)
                //present.thumbnail = (e.target as HTMLInputElement)?.files?.[0]
            }

            return {
                form,
                state,
                addItem,
                updateItem,
                deleteItem
            }
        }
    })

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  #edit-present {
    padding: 24px;
    font-size: 18px;

    article {
      margin-bottom: 48px;
    }

    h1 {
      font-size: 24px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;

      > *:first-child {
        margin-right: 16px;
      }
    }

    dl {
      display: flex;
      align-items: center;

      &:not(:last-child) {
        margin-bottom: 16px;
      }

      dt {
        width: 100px;
        flex-shrink: 0;
        font-weight: $font-bold;
      }

      dd {
        width: 100%;

        input {
          width: 100%;
        }
      }
    }
  }

  .point {
    background: #FFF;
    color: $color-black;
    padding: 24px;
    border-radius: 16px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;

    > * {
      &:first-child {
        flex: 1;
        margin-right: 24px;
      }

      &:last-child {
        width: 2em;
        text-align: center;
        font-size: 14px;
        font-weight: $font-bold;
        color: $color-gray2;
        cursor: pointer;
      }
    }
  }

  .button-wrap {
    display: flex;
    justify-content: center;
    gap: 16px;
  }
</style>

<!--<template>-->
<!--  <section id="edit-presents">-->
<!--    <h1>プレゼントの登録</h1>-->
<!--    <form @submit.prevent="onSubmit">-->
<!--      <label><span>名前</span><input type="text" v-model="form.name" name="name"></label>-->
<!--      <label><span>ポイント</span><input type="number" v-model="form.point" name="point"></label>-->
<!--      <label><span>サムネイル</span><input type="file" name="thumbnail" @change="onUpload"></label>-->
<!--      <button type="submit" data-label="">登録</button>-->
<!--    </form>-->
<!--  </section>-->
<!--</template>-->


<!--<script lang='ts'>-->
<!--    import {defineComponent, reactive, onMounted, onBeforeMount, ref} from 'vue'-->
<!--    import {Stage} from '@/logics/Stage'-->
<!--    import {useStore} from 'vuex'-->

<!--    interface FormState {-->
<!--        name: string | null-->
<!--        point: number | null-->
<!--        thumbnail: any-->
<!--    }-->

<!--    export default defineComponent({-->
<!--        components: {},-->
<!--        setup() {-->
<!--            const store = useStore()-->

<!--            const form = reactive<FormState>({-->
<!--                name: null,-->
<!--                point: null,-->
<!--                thumbnail: null-->
<!--            })-->

<!--            const onSubmit = async () => {-->
<!--                await store.dispatch('setPresent', form)-->
<!--                form.name = null-->
<!--                form.point = null-->
<!--                form.thumbnail = null-->
<!--            }-->

<!--            const onUpload = (e: Event) => {-->
<!--                // TODO ASはつかわない-->
<!--                form.thumbnail = (e.target as HTMLInputElement)?.files?.[0]-->
<!--            }-->

<!--            return {-->
<!--                form,-->
<!--                onSubmit,-->
<!--                onUpload-->
<!--            }-->
<!--        }-->
<!--    })-->

<!--</script>-->

<!--&lt;!&ndash; Add 'scoped' attribute to limit CSS to this component only &ndash;&gt;-->
<!--<style scoped lang='scss'>-->
<!--  #edit-presents {-->
<!--    line-height: 1.7;-->
<!--    padding: 100px;-->
<!--  }-->
<!--</style>-->
