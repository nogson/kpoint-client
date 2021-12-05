<template>
  <section id="edit-points">
    <article>
      <h1>
        <back-button />
        <span>ポイントの追加・編集・削除</span></h1>
      <div class="form-box">
        <div v-for="(point,index) in state.points" :key="index" class="point">
          <div>
            <dl>
              <dt>ラベル</dt>
              <dd><input type="text" v-model="point.label" name="label"></dd>
            </dl>
            <dl>
              <dt>ポイント</dt>
              <dd><input type="number" v-model="point.point" name="point"></dd>
            </dl>
          </div>
          <div @click="deleteItem(point)">削除</div>
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
    import BackButton from '@/components/BackButton.vue'

    interface Point {
        label: string | null
        point: number | null
    }

    interface State {
        points: Point[]
    }

    export default defineComponent({
        components: {BackButton},
        setup() {
            const store = useStore()

            const state = reactive<State>({
                points: store.getters.points
            })

            onMounted(() => {
                state.points = store.getters.points
            })

            const form = reactive<Point>({
                label: null,
                point: null
            })

            const addItem = () => {
                state.points.push({
                    label: null,
                    point: null
                })
            }

            const updateItem = async () => {
                await store.dispatch('updatePointItem', state.points)
                state.points = store.getters.points

            }

            const deleteItem = async (point: Point) => {
                await store.dispatch('deletePointItem', point)
                state.points = store.getters.points
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
  #edit-points {
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

      &:first-child {
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
