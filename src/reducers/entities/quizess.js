import arrayToEntities from "utils/arrayToEntities";
import {uniq} from 'lodash';

const DEFAULT_STATE = {}

const quizessEntities = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'QUIZ_LIST_SUCCESS':
      return {
        ...state,
        ...arrayToEntities(
            action.payload.quizess.map(item => ({__meta: {}, ...item})),
            state
          )
      }
    case 'QUIZ_RETRIEVE_SUCCESS':
      return {
        ...state,
        [action.payload.quiz._id]: {
          __meta: {},
          ...state[action.payload.quiz._id],
          ...action.payload.quiz,
          questions: action.payload.quiz.questions.map(({_id}) => _id)
        }
      }
    case 'QUIZ_PREPARE_REQUEST':
     return {
       ...state,
       [action.payload.quizId]: {
         ...state[action.payload.quizId],
         __meta: {
            ...state[action.payload.quizId].__meta,
            downloading: true
         }
       }
     }
    case 'QUIZ_PREPARE_SUCCESS':
      return {
        ...state,
        [action.payload.quizId]: {
          ...state[action.payload.quizId],
          questions: action.payload.questions.map((question) => question._id || question),
          __meta: {
            readyToEngage: true,
            downloading: false
          }
        }
      }
    case 'QUIZ_ENGAGEMENT_LIST_SUCCESS':
      return {
        ...state,
        [action.payload.quizId]: {
          ...state[action.payload.quizId],
          quizEngagements: uniq([
            ...(action.payload.quizEngagements || []).map(({_id}) => _id),
            ...(state[action.payload.quizId].quizEngagements || [])
          ])
        }
      }
    case 'QUIZ_ENGAGEMENT_CREATE_SUCCESS':
      return {
        ...state,
        [action.payload.quizId]: {
          ...state[action.payload.quizId],
          quizEngagements: uniq([
            ...(state[action.payload.quizId].quizEngagements || []),
            action.payload.quizEngagement._id
          ])
        }
      }
    case 'QUIZ_ENGAGEMENT_SYNC_SUCCESS':
      return {
        ...state,
        [action.payload.quizId]: {
          ...state[action.payload.quizId],
          quizEngagements: uniq([
            ...state[action.payload.quizId].quizEngagements.filter(id => action.payload.oldId !== id),
            action.payload.quizEngagement._id
          ])
        }
      }
    default:
      return state
  }
}

export default quizessEntities
