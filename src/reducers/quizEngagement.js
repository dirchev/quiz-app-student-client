const DEFAULT_STATE = null

const quizEngagementReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'QUIZ_ENGAGEMENT_CREATE_SUCCESS':
    case 'QUIZ_ENGAGEMENT_RESUME_SUCCESS':
      return action.payload.quizEngagement._id
    case 'QUIZ_ENGAGEMENT_CANCEL_SUCCESS':
    case 'QUIZ_ENGAGEMENT_END':
      return null
    default:
      return state
  }
}

export default quizEngagementReducer
