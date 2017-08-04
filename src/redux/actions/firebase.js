import * as types from '../types'
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

export const getTopPlayers = (callback) => {
    return (dispatch, getState) => {
        let userPath = "/Trophy"
        firebase.database().ref(userPath).on('value', (snapshot) => {
            var Data = {}
            if(snapshot.val()){
                Data = snapshot.val()
                dispatch(setTopPlayer(sortByTrophy(Data)))
            }
            callback(Object.keys(Data).length)
        })
    }
}

export const sortByTrophy = (Data) => {
    let s_Data = []
    Object.keys(Data).map(function(key, index){
        s_Data.push(Data[key])
    })
    return s_Data.sort(function(a, b) {
        return (a['trophy'] > b['trophy']) ? -1 : ((a['trophy'] < b['trophy']) ? 1 : 0);
    });
}

export const setTopPlayer = (data) => {
    return {
        type: types.TOP_PLAYERS,
        data
    }
}

