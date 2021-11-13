// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import {getAnalytics} from "firebase/analytics"
import "firebase/compat/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//const settings = { timestampsInSnapshots: true }

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIERBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIERBASE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_FIERBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIERBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIERBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIERBASE_APP_ID,
    measurementId: process.env.VUE_APP_FIERBASE_MEASUREMENT_ID
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const db = firebase.firestore()
export const storage = firebase.storage()
export default firebase
