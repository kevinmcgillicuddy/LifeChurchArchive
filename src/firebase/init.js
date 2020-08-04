import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'

var config = {
    apiKey: "AIzaSyAF2VbjdWbQk79nINQV5wBn-uMy844gY7s",
    authDomain: "lcarchivewebsite.firebaseapp.com",
    databaseURL: "https://lcarchivewebsite.firebaseio.com",
    projectId: "lcarchivewebsite",
    storageBucket: "lcarchivewebsite.appspot.com",
    messagingSenderId: "718129445517",
    appId: "1:718129445517:web:0284d6bbb57384c87800c4"
};
firebase.initializeApp(config);
export const firestore = firebase.firestore()
export const db = firebase.database()
export const auth = firebase.auth()
export const storage = firebase.storage()
