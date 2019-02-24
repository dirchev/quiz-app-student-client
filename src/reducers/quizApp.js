const DEFAULT_STATE = {}

const quizAppReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'QUIZ_APP_RETRIEVE_SUCCESS':
      return action.payload.quizApp
      case 'QUIZ_LIST_SUCCESS':
      return {
        ...state,
        quizess: action.payload.quizess.map(i => i._id)
      }
    default:
      return state
  }
}

export default quizAppReducer
