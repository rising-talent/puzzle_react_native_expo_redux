import * as types from '../types'

export const setGoalNumber = (gn) => {
    return {
        type: types.SET_GOAL_NUMBER,
        data: gn
    }
}

export const resetGoalNumber = (level, isComplex) => {
    return (dispatch, getState) => {
        let gNumber = ''
        if(isComplex){
            gNumber = String(Math.random()).substring(2, 2 + level)
        } 
        else{
            let temp = String(Math.random())
            let index = 2
            while(gNumber.length < level){
                if(gNumber.indexOf(temp.substr(index, 1)) < 0){
                    gNumber += temp.substr(index, 1)
                }
                else{
                    index++
                }
            }
        }
        //alert(gNumber)
        dispatch(setGoalNumber(gNumber))
        dispatch(setTimes(0))
        dispatch(setHistory([]))
    }
}

export const setUserInfo = (info) => {
    return (dispatch, getState) => {
        
        dispatch(setUserID(info.userId))
        dispatch(setUserName(info.username))
        dispatch(setTrophy(info.trophy))
    }
}

export const setUserID = (id) => {
    return {
        type: types.USER_ID,
        data: id
    }
}

export const setUserName = (name) => {
    return {
        type: types.USER_NAME,
        data: name
    }
}

export const setTrophy = (t) => {
    return {
        type: types.USER_TROPHY,
        data: t
    }
}

export const check = (num, goal, times, history) => {
    return (dispatch, getState) => {
        let Y = 0, N = 0
        for (i = 0; i < num.length; i++) { 
            if(num.substr(i, 1) == goal.substr(i, 1)){
                Y++
            }
            else if(num.indexOf(goal.substr(i, 1)) > -1){
                N++
            }
        }
        dispatch(setY(Y))
        dispatch(setN(N))
        dispatch(setTimes(times + 1))
        let temp = {
            number: num,
            state: 'Y' + Y + ', ' + 'N' + N
        }
        history.push(temp)
        dispatch(setHistory(history))
    }
}

export const setY = (y) => {
    return {
        type: types.SET_Y_NUMBER,
        data: y
    }
}

export const setN = (n) => {
    return {
        type: types.SET_N_NUMBER,
        data: n
    }
}

export const setTimes = (t) => {
    return {
        type: types.SET_TIMES,
        data: t
    }
}

export const setHistory = (h) => {
    return {
        type: types.SET_HISTORY,
        data: h
    }
}

export const setLevel = (level) => {
    return {
        type: types.SET_LEVEL,
        data: level
    }
}

export const setComplexity = (complexity) => {
    return {
        type: types.SET_COMPLEXITY,
        data: complexity
    }
}