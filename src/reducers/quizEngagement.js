const DEFAULT_STATE = null

const quizEngagementReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'QUIZ_ENGAGEMENT_CREATE_SUCCESS':
      return action.payload.quizEngagement._id
    default:
      return state
  }
}

export default quizEngagementReducer
