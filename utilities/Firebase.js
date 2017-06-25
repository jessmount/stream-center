import * as firebase from 'firebase'
    /*

    firebase.auth() - Authentication
    firebase.storage() - Cloud Storage
    firebase.database() - Realtime Database

    */
var config = {
    apiKey: "AIzaSyAPlKKytaKVMI3xEHNHbviuNAcKHgb4f_4"
    , authDomain: "streamhub-3a01b.firebaseapp.com"
    , databaseURL: "https://streamhub-3a01b.firebaseio.com/"
    , storageBucket: "streamhub-3a01b.appspot.com"
, };
export const firebaseRef = firebase.initializeApp(config);