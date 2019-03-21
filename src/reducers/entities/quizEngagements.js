import arrayToEntities from "utils/arrayToEntities"
import {omit} from 'lodash'
const DEFAULT_STATE = {}

const questionsEntities = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'QUIZ_ENGAGEMENT_START_SUCCESS':
    case 'QUIZ_ENGAGEMENT_CREATE_SUCCESS':
    case 'QUIZ_ENGAGEMENT_RESUME_SUCCESS':
    case 'QUIZ_ENGAGEMENT_LOCAL_UPDATE':
    case 'QUIZ_ENGAGEMENT_FINISH_SUCCESS':
    case 'QUIZ_ENGAGEMENT_RETRIEVE_SUCCESS':
      return {
        ...state,
        [action.payload.quizEngagement._id]: {
          __meta: {},
          ...action.payload.quizEngagement
        }
      }
    case 'QUIZ_ENGAGEMENT_LIST_SUCCESS':
      return {
        ...state,
        ...arrayToEntities(action.payload.quizEngagements.map(i => ({__meta: {}, ...i})), state)
      }
    case 'QUIZ_ENGAGEMENT_SYNC_SUCCESS':
      return {
        ...omit(state, action.payload.oldId),
        [action.payload.quizEngagement._id]: {
          ...state[action.payload.oldId],
          ...action.payload.quizEngagement,
          __meta: {
            startedOffline: true,
            synced: true
          }
        }
      }
    default:
      return state
  }
}

export default questionsEntities
