import arrayToEntities from "utils/arrayToEntities"
const DEFAULT_STATE = {}

const questionsEntities = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'QUIZ_ENGAGEMENT_START_SUCCESS':
    case 'QUIZ_ENGAGEMENT_CREATE_SUCCESS':
    case 'QUIZ_ENGAGEMENT_LOCAL_UPDATE':
    case 'QUIZ_ENGAGEMENT_FINISH_SUCCESS':
      return {
        ...state,
        [action.payload.quizEngagement._id]: action.payload.quizEngagement
      }
    case 'QUIZ_ENGAGEMENT_LIST_SUCCESS':
      return {
        ...state,
        ...arrayToEntities(action.payload.quizEngagements)
      }
    default:
      return state
  }
}

export default questionsEntities
