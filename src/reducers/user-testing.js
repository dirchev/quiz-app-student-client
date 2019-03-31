const DEFAULT_STATE = {
  steps: {
    'Start': false,
    'RegistrationComplete': false,
    'LoginComplete': false,
    'QuizPreview': false,
    'QuizEngage': false,
    'QuizEngagementCompleted': false,
    'QuizEngagementsPreview': false,
    'QuizEngagementPreview': false,
    'Logout': false,
    'End': false
  },
  logs: [],
  flags: {
    'HasSwipedQuiz': false,
    'HasUsedNumbersQuiz': false,
    'HasSwipedQuizFeedback': false,
    'HasUsedNumbersQuizFeedback': false
  }
}
const userTestingReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'SET_USER_TEST_PROGRESS':
      let time =  Date.now()
      if (action.payload.key === 'Start') {
        return {
          ...DEFAULT_STATE,
          steps: {
            ...DEFAULT_STATE.steps,
            Start: time
          }
        }
      }
      if (!state.steps[action.payload.key]) {
        return {
          ...state,
          steps: {
            ...state.steps,
            [action.payload.key]: time
          },
          logs: [
            ...state.logs,
            [action.payload.key, time]
          ]
        }
      } else {
        return {
          ...state,
          logs: [
            ...state.logs,
            [action.payload.key, time]
          ]
        }
      }
    case 'SET_USER_TEST_FLAG':
      return {
        ...state,
        flags: {
          ...state.flags,
          [action.payload.key]: true
        }
      }

    default:
      return state
  }
}

export default userTestingReducer
