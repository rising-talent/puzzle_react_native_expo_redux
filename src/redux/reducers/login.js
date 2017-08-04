import createReducer from '../createReducer'
import * as types from '../types'

export const goal = createReducer('', {
  [types.SET_GOAL_NUMBER](state, action) {
    return action.data
  },
});

export const inProg = createReducer('no' , {
  [types.SET_GOAL_NUMBER](state, action) {
    return 'no'
  },
  [types.SET_TIMES](state, action) {
    if(action.data == 0) return 'no'
    else return 'yes'
  },
});

export const history = createReducer([], {
  [types.SET_HISTORY](state, action) {
    return action.data
  },
});

export const level = createReducer(4, {
  [types.SET_LEVEL](state, action) {
    return action.data
  },
});

export const isComplex = createReducer(false, {
  [types.SET_COMPLEXITY](state, action) {
    return action.data
  },
});

export const userId = createReducer('', {
  [types.USER_ID](state, action) {
    return action.data
  },
});

export const userName = createReducer('', {
  [types.USER_NAME](state, action) {
    return action.data
  },
});

export const userTrophy = createReducer(0, {
  [types.USER_TROPHY](state, action) {
    return action.data
  },
});



