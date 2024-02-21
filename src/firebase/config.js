import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCwarfhOSR_CABAOElvh9jLFtW1hXIQ7xc",
    authDomain: "thedojosite-e6d23.firebaseapp.com",
    projectId: "thedojosite-e6d23",
    storageBucket: "thedojosite-e6d23.appspot.com",
    messagingSenderId: "764736479955",
    appId: "1:764736479955:web:dd99db9f2dccc53b082a26"
};

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }