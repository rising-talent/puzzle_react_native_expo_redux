import * as loginActions from './login'
import * as homeActions from './home'
import * as firebaseActions from './firebase'
import * as storageActions from './storage'

export const ActionCreators = Object.assign({},
  loginActions,
  homeActions,
  firebaseActions,
  storageActions
);