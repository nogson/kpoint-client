import {createStore} from 'vuex'
import {firestore, storage} from '@/firebase/firestore'
import {toRaw} from '@vue/reactivity'
// import {Present} from '@/types/present'

interface  Present {
    name: string
    point: number
    thumbnail: string
}

interface State {
    presents: Present[] | null,
    count: number
}

export default createStore({
    state: <State>{
        count: 0,
        presents: null
    },
    getters: {
        presents: state => {
            return toRaw(state.presents)
        }
    },
    mutations: {
        setPresents: (state, presents: Present[]) => {
            state.presents = presents
        }
    },
    actions: {
        getPresents: async ({commit}) => {
            // TODO any型にしないとエラーになる
            const presents: Present[] | any = []
            const querySnapshot = await firestore.collection('presents').get()

            querySnapshot.forEach(doc => {
                const name = doc.data().name
                const point = doc.data().point
                const thumbnail = doc.data().thumbnail

                presents.push({name, point, thumbnail})
            })

            commit('setPresents', presents)
        },
        setPresent: async ({commit}, present: any) => {
            try {
                // 画像をアップロード
                const storageRef = storage.ref(present.thumbnail.name)
                await storageRef.put(present.thumbnail)

                // 画像のパスを取得
                const path = await storageRef.getDownloadURL()
                present.thumbnail = path

                // データを登録
                const docRef = firestore.collection('presents')
                await docRef.add(
                    present
                )
            } catch (e) {
                console.log(e)
            }

        }
    },
    modules: {}
})
