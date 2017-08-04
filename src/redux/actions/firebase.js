import * as firebase from "firebase";
firebase.initializeApp({
    apiKey: "AIzaSyCtNtVwb1lTDsSU0EDb-mlmD-_J-qOqkvs",
    authDomain: "match-puzzle-58986.firebaseapp.com",
    databaseURL: "https://match-puzzle-58986.firebaseio.com",
    projectId: "match-puzzle-58986",
    storageBucket: "",
    messagingSenderId: "353547857908"
});

export const updateUserTrophy = (id, username, trophy, callback) => {
    return (dispatch, getState) => {
        let userPath = "/Trophy/" + id 
        callback(firebase.database().ref(userPath).update({
            trophy: trophy,
            username: username
        }))
    }
}

