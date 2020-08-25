import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'


var config = {
    apiKey: "AIzaSyCkWvJ10kr3N7qzDJI4iADb8HSIjhZUKyw",
    authDomain: "lcarchivewebsite.firebaseapp.com",
    databaseURL: "https://lcarchivewebsite.firebaseio.com",
    projectId: "lcarchivewebsite",
    storageBucket: "lcarchivewebsite.appspot.com",
    messagingSenderId: "718129445517",
    appId: "1:718129445517:web:6858ac1e8e3a62397800c4",
    measurementId: "G-6WR9RG3DXX"
};
firebase.initializeApp(config);


export const firestore = firebase.firestore()
export const db = firebase.database()
export const auth = firebase.auth()
export const storage = firebase.storage()
export const functions = firebase.functions()
