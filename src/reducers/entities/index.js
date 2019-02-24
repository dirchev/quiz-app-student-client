import { combineReducers } from 'redux'
import quizessReducer from './quizess'
import questionsReducer from './questions'
import quizEngagementsReducer from './quizEngagements'

export default combineReducers({
  quizess: quizessReducer,
  questions: questionsReducer,
  quizEngagements: quizEngagementsReducer,
})
