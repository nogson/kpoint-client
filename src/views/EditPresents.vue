<template>
  <section id="edit-presents">
    <h1>プレゼントの登録</h1>
    <form @submit.prevent="onSubmit">
      <label><span>名前</span><input type="text" v-model="form.name" name="name"></label>
      <label><span>ポイント</span><input type="number" v-model="form.point" name="point"></label>
      <label><span>サムネイル</span><input type="file" name="thumbnail" @change="onUpload"></label>
      <button type="submit" data-label="">登録</button>
    </form>
  </section>
</template>


<script lang='ts'>
    import {defineComponent, reactive, onMounted, onBeforeMount, ref} from 'vue'
    import {Stage} from '@/logics/Stage'
    import {useStore} from 'vuex'

    interface FormState {
        name: string | null
        point: number | null
        thumbnail: any
    }

    export default defineComponent({
        components: {},
        setup() {
            const store = useStore()

            const form = reactive<FormState>({
                name: null,
                point: null,
                thumbnail: null
            })

            const onSubmit = async () => {
                await store.dispatch('setPresent', form)
                form.name = null
                form.point = null
                form.thumbnail = null
            }

            const onUpload = (e: Event) => {
                // TODO ASはつかわない
                form.thumbnail = (e.target as HTMLInputElement)?.files?.[0]
            }

            return {
                form,
                onSubmit,
                onUpload
            }
        }
    })

</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  #edit-presents {
    line-height: 1.7;
    padding: 100px;
  }
</style>
