import { combineReducers } from 'redux'
import authenticationReducer from './authentication'
import entitiesReducer from './entities'
import quizAppReducer from './quizApp'
import statusesReducer from './statuses'
import loadingReducer from './loading';
import errorReducer from './error';
import successReducer from './success';
import quizEngagementReducer from './quizEngagement';
import globalReducer from './global'
import requestHistoryReducer from './requestHistory'
import notificationsReducer from './notifications'
import userTestingReducer from './user-testing'
import storage from 'redux-persist/lib/storage'
import {pick} from 'lodash'

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    storage.removeItem('persist:root')
    state = pick(state, [
      'authentication',
      'quizApp'
    ])
  }

  return combineReducers({
    authentication: authenticationReducer,
    entities: entitiesReducer,
    quizApp: quizAppReducer,
    currentQuizEngagement: quizEngagementReducer,
    statuses: statusesReducer,
    loading: loadingReducer,
    error: errorReducer,
    success: successReducer,
    global: globalReducer,
    requestHistory: requestHistoryReducer,
    notifications: notificationsReducer,
    userTesting: userTestingReducer
  })(state, action)
}
export default rootReducer
