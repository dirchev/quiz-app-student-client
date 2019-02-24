import arrayToEntities from "utils/arrayToEntities";

const DEFAULT_STATE = {}

const questionsEntities = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'QUIZ_PREPARE_SUCCESS':
      return {
        ...state,
        ...arrayToEntities(action.payload.questions)
      }
    default:
      return state
  }
}

export default questionsEntities
