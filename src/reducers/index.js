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

export default combineReducers({
  authentication: authenticationReducer,
  entities: entitiesReducer,
  quizApp: quizAppReducer,
  currentQuizEngagement: quizEngagementReducer,
  statuses: statusesReducer,
  loading: loadingReducer,
  error: errorReducer,
  success: successReducer,
  global: globalReducer
})
