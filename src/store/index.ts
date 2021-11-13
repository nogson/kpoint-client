import {createStore} from 'vuex'
import {db} from "@/firebase/firestore"
import {toRaw} from '@vue/reactivity'
import {present} from '@/types/present'


interface State {
    presents: present[] | null,
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
        setPresents: (state, presents: present[]) => {
            state.presents = presents
        }
    },
    actions: {
        getPresents: async ({commit}) => {
            // var docRef = db.collection("presents")
            // await docRef.add(
            //     { name: "任天堂Switch",point:1000}
            // )

            const presents: present[] = []
            const querySnapshot = await db.collection("presents").get()

            querySnapshot.forEach(doc => {
                const name = doc.data().name
                const point = doc.data().point
                presents.push({name, point})
            })

            commit('setPresents', presents)
        }
    },
    modules: {}
})
