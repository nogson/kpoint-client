import {createStore} from 'vuex'
import {firestore, storage} from '@/firebase/firestore'
import {toRaw} from '@vue/reactivity'

// import {Present} from '@/types/present'

interface Present {
    id: string
    name: string
    point: number
    // TODO File型も
    thumbnail: any
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
                const id = doc.id
                const name = doc.data().name
                const point = doc.data().point
                const thumbnail = doc.data().thumbnail

                presents.push({id, name, point, thumbnail})
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
        updatePresents: async ({commit, dispatch, state}, items: Present[]) => {
            const docRef = firestore.collection('presents')
            // データを登録
            await Promise.all(items.map(async item => {
                // 画像をアップロード
                if (item.thumbnail && typeof item.thumbnail !== 'string') {
                    const storageRef = storage.ref(item.thumbnail.name)
                    const snapshot = await storageRef.put(item.thumbnail)
                    // 画像のパスを取得
                    item.thumbnail = await snapshot.ref.getDownloadURL()
                }
                if (item.id) {
                    console.log(item)
                    return await docRef.doc(item.id).set(item)
                } else {
                    return await docRef.add(item)
                }

            }))
            await dispatch('getPresents')
            return state.presents
        },
        deletePresent: async ({commit, dispatch, state}, item: Present) => {
            // データを登録
            const docRef = firestore.collection('presents')
            await docRef.doc(item.id).delete()
            await dispatch('getPresents')
            return state.presents
        },
        updatePointItem: async ({commit, dispatch, state}, items: Point[]) => {
            const docRef = firestore.collection('points')
            // データを登録
            await Promise.all(items.map(async item => {
                if (item.id) {
                    console.log(item)
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
