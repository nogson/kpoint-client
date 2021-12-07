<template>
  <div class="user-point" ref="pointRef">
    {{ userPoint }}
  </div>
</template>

<script lang="ts">
    import {computed, defineComponent, onMounted, ref} from 'vue'
    import {useStore} from 'vuex'
    import ShuffleText from 'shuffle-text'

    export default defineComponent({
        components: {},
        setup() {
            const store = useStore()
            const userPoint = computed(() => store.getters.userSate.point)
            const pointRef = ref<HTMLElement>()

            onMounted(() => {
                if (pointRef.value) {
                    const text = new ShuffleText(pointRef.value)
                    text.duration = 1500
                    text.sourceRandomCharacter = '0123456789'
                    text.start()
                }
            })

            return {
                userPoint,
                pointRef
            }
        }
    })
</script>

<style scoped lang="scss">
  .user-point {
    font-weight: $font-black;
    font-size: 72px;
    line-height: 1;
    text-shadow: 0px 4px 0px darken($color-primary, 20%);
    color: $color-primary;
  }
</style>
