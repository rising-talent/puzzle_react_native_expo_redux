import * as mainctions from './main'
import * as checkActions from './check'
import * as firebaseActions from './firebase'
import * as storageActions from './storage'

export const ActionCreators = Object.assign({},
  mainctions,
  checkActions,
  firebaseActions,
  storageActions
);