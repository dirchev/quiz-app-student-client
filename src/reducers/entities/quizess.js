import arrayToEntities from "utils/arrayToEntities";

const DEFAULT_STATE = {}

const quizessEntities = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'QUIZ_LIST_SUCCESS':
      let quizess = action.payload.quizess.map(function (quiz) {
        return {
          ...quiz,
          questions: quiz.questions ? quiz.questions.map(question => question._id || question) : []
        }
      })
      return {
        ...state,
        ...arrayToEntities(quizess, state)
      }
    case 'QUIZ_RETRIEVE_SUCCESS':
      return {
        ...state,
        [action.payload.quiz._id]: {
          ...state[action.payload.quiz._id],
          ...action.payload.quiz,
          questions: action.payload.quiz.questions.map(({_id}) => _id)
        }
      }
    case 'QUIZ_PREPARE_SUCCESS':
      return {
        ...state,
        [action.payload.quizId]: {
          ...state[action.payload.quizId],
          questions: action.payload.questions.map((question) => question._id || question)
        }
      }
    case 'QUIZ_ENGAGEMENT_LIST_SUCCESS':
      return {
        ...state,
        [action.payload.quizId]: {
          ...state[action.payload.quizId],
          quizEngagements: action.payload.quizEngagements.map(({_id}) => _id)
        }
      }
    default:
      return state
  }
}

export default quizessEntities
