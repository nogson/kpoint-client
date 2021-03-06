<template>
  <section id="edit-present">
    <article>
      <h1>
        <back-button/>
        <span>プレゼントの追加・編集・削除</span></h1>
      <div class="form-box">
        <div v-for="(present,index) in state.presents" :key="index" class="present">
          <div>
            <dl>
              <dt>名前</dt>
              <dd><input type="text" v-model="present.name" name="name"></dd>
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
          <button type="button" class="button-2" @click="addItem">新規追加</button>
          <button type="button" class="button-1" @click="updateItem" :disabled="disabledUpdateBtn">
            <loader v-if="state.loadingUpdateBtn"/>
            <span v-else>更新</span></button>
        </div>
      </div>
    </article>
  </section>
</template>


<script lang='ts'>
    import {computed, defineComponent, onMounted, reactive} from 'vue'
    import {useStore} from 'vuex'
    import BackButton from '@/components/BackButton.vue'
    import Loader from '@/components/Loader.vue'

    interface Present {
        name: string | null
        point: number | null,
        thumbnail: File | null | undefined
    }

    interface State {
        presents: Present[],
        loadingUpdateBtn: boolean
    }

    export default defineComponent({
        components: {BackButton, Loader},
        setup() {
            const store = useStore()

            const state = reactive<State>({
                presents: store.getters.presents,
                loadingUpdateBtn: false
            })

            onMounted(() => {
                state.presents = store.getters.presents
            })

            const form = reactive<Present>({
                name: null,
                point: null,
                thumbnail: null
            })

            const addItem = () => {
                state.presents.push({
                    name: null,
                    point: null,
                    thumbnail: null
                })
            }

            const updateItem = async () => {
                state.loadingUpdateBtn = true
                await store.dispatch('updatePresents', state.presents)
                state.presents = store.getters.presents
                state.loadingUpdateBtn = false
            }

            const deleteItem = async (present: Present) => {
                await store.dispatch('deletePresent', present)
                state.presents = store.getters.presents
            }

            const onUpload = (e: Event, present: Present) => {

                // TODO ASはつかわない
                present.thumbnail = (e.target as HTMLInputElement)?.files?.[0]
            }

            const disabledUpdateBtn = computed(() => {
                const hasEmptyBox = !!state.presents.find((present: Present) => {
                    return !(present.name && present.point)
                })
                return state.presents.length <= 0 || hasEmptyBox || state.loadingUpdateBtn
            })

            return {
                form,
                state,
                addItem,
                updateItem,
                deleteItem,
                onUpload,
                disabledUpdateBtn
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
      font-size: 18px;
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
      @include sm() {
        align-items: start;
        flex-direction: column;
        gap: 8px;
      }

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

  .present {
    background: #FFF;
    color: $color-black;
    padding: 24px;
    border-radius: 16px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    border: 2px solid $color-black;

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
    @include sm() {
      flex-direction: column;
    }
  }
</style>
