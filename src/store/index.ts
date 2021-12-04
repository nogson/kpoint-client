import {createStore} from 'vuex'
import {firestore, storage} from '@/firebase/firestore'
import {toRaw} from '@vue/reactivity'

// import {Present} from '@/types/present'

interface Present {
    name: string
    point: number
    thumbnail: string
}

interface Point {
    id: string
    label: string
    point: number
}

interface UserSate {
    point: number
}

interface State {
    presents: Present[] | null,
    points: Point[] | null,
    userSate: UserSate
    count: number
}

export default createStore({
    state: <State>{
        count: 0,
        presents: null,
        points: null,
        userSate: {point: 0}
    },
    getters: {
        presents: state => {
            return toRaw(state.presents)
        },
        points: state => {
            return toRaw(state.points)
        },
        userSate: state => {
            return state.userSate
        },
    },
    mutations: {
        setPresents: (state, presents: Present[]) => {
            state.presents = presents
        },
        setPoints: (state, points: Point[]) => {
            state.points = points
        },
        setUserSate: (state, userSate: UserSate) => {
            state.userSate = userSate
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
        getPoints: async ({commit}) => {
            const points: Point[] = []
            const querySnapshot = await firestore.collection('points').get()

            querySnapshot.forEach(doc => {
                const id = doc.id
                const label = doc.data().label
                const point = doc.data().point

                points.push({id, label, point})
            })

            commit('setPoints', points)
        },
        getUserState: async ({commit}) => {
            const querySnapshot = await firestore.collection('userState').doc('8SAWnNqC2xtQRcref0FB').get()
            commit('setUserSate', querySnapshot.data())
        },
        setPresent: async ({commit}, present: any) => {
            try {
                // 画像をアップロード
                const storageRef = storage.ref(present.thumbnail.name)
                const snapshot = await storageRef.put(present.thumbnail)

                // 画像のパスを取得
                const path = await snapshot.ref.getDownloadURL()
                present.thumbnail = path

                // データを登録
                const docRef = firestore.collection('presents')
                await docRef.add(
                    present
                )
            } catch (e) {
                console.log('error', e)
            }
        },
        setPointItem: async ({commit, dispatch, state}, item: Point) => {
            // データを登録
            const docRef = firestore.collection('points')
            await docRef.add(
                item
            )
            await dispatch('getPoints')
            return state.points
        },
        updatePointItem: async ({commit, dispatch, state}, items: Point[]) => {
            const docRef = firestore.collection('points')
            // データを登録
            await Promise.all(items.map(async item => {
                if (item.id) {
                    return await docRef.doc(item.id).set(item)
                } else {
                    return await docRef.add(item)
                }

            }))
            await dispatch('getPoints')
            return state.points
        },
        deletePointItem: async ({commit, dispatch, state}, item: Point) => {
            // データを登録
            const docRef = firestore.collection('points')
            await docRef.doc(item.id).delete()
            await dispatch('getPoints')
            return state.points
        },
        setPoint: async ({commit, state}, point: number) => {
            // データを登録
            const docRef = firestore.collection('userState').doc('8SAWnNqC2xtQRcref0FB')
            const params = {point: state.userSate.point + point}
            await docRef.update(params)
            commit('setUserSate', params)
        },
    },
    modules: {}
})
