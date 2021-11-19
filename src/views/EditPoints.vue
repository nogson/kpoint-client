<template>
  <section id="edit-points">
    <h1>ポイントの登録</h1>
    <form @submit.prevent="onSubmit">
      <label><span>ラベル</span><input type="text" v-model="form.label" name="label"></label>
      <label><span>ポイント</span><input type="number" v-model="form.point" name="point"></label>
      <button type="submit">登録</button>
    </form>
  </section>
</template>


<script lang='ts'>
    import {defineComponent, reactive} from 'vue'
    import {useStore} from 'vuex'

    interface FormState {
        label: string | null
        point: number | null
    }

    export default defineComponent({
        components: {},
        setup() {
            const store = useStore()

            const form = reactive<FormState>({
                label: null,
                point: null
            })

            const onSubmit = async () => {
                await store.dispatch('setPointItem', form)
                form.label = null
                form.point = null
            }

            return {
                form,
                onSubmit
            }
        }
    })

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  #edit-points {
    line-height: 1.7;
    padding: 100px;
  }
</style>
