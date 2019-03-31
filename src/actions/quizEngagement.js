import axios from 'axios'
import {quizEngagement as quizEngagementEndpoint} from 'endpoints'
import {debounce} from 'lodash'
import uuid from 'uuid'

export let createQuizEngagement = ({quizId}) => async (dispatch, getState) => {
  let quiz = getState().entities.quizess[quizId]
  let isOffline = getState().global.isOffline
  if (isOffline && !quiz.isAvailableOffline) {
    dispatch({ type: 'QUIZ_ENGAGEMENT_CREATE_ERROR', payload: {error: {base: 'Quiz is not available offline.'}} })
  }

  dispatch({
    type: 'QUIZ_ENGAGEMENT_CREATE_REQUEST',
  })

  if (!isOffline) {
    try {
      let {data} = await axios.post(quizEngagementEndpoint.create({quizId}))
      dispatch({ type: 'QUIZ_ENGAGEMENT_CREATE_SUCCESS', payload: {quizEngagement: data, quizId} })
    } catch (err) {
      console.error(err)
      dispatch({ type: 'QUIZ_ENGAGEMENT_CREATE_ERROR', payload: {error: err.response.data} })
    }
  } else {
    let currentUserId = getState().authentication.user._id
    let data = {
      __meta: {
        startedOffline: true,
        synced: false
      },
      "_id": uuid.v4(),
      "quizApp": quiz.quizApp,
      "quiz": quiz._id,
      "student": currentUserId,
      "timeLimit": quiz.timeLimit,
      "answersGiven": {},
      "started": true,
      "startedAt": new Date()
    }
    dispatch({ type: 'QUIZ_ENGAGEMENT_CREATE_SUCCESS', payload: {quizEngagement: data, quizId} })
  }
}

export let resumeQuizEngagement = ({quizId, quizEngagementId}) => async (dispatch, getState) => {
  let isOffline = getState().global.isOffline
  dispatch({
    type: 'QUIZ_ENGAGEMENT_RESUME_REQUEST',
  })

  if (isOffline) {
    let data = {
      ...getState().entities.quizEngagements[quizEngagementId],
      __meta: {
        startedOffline: true,
        synced: false
      }
    }
    dispatch({ type: 'QUIZ_ENGAGEMENT_RESUME_SUCCESS', payload: {quizEngagement: data, quizId} })
  } else {
    try {
      let {data} = await axios.post(quizEngagementEndpoint.resume({quizId, quizEngagementId}))
      dispatch({ type: 'QUIZ_ENGAGEMENT_RESUME_SUCCESS', payload: {quizEngagement: data, quizId} })
    } catch (err) {
      console.error(err)
      dispatch({ type: 'QUIZ_ENGAGEMENT_RESUME_ERROR', payload: {error: err.response.data} })
    }
  }
}

let syncQuizEngagementDebounced = debounce(async ({quizEngagement}, dispatch, getState) => {
  let isOffline = getState().global.isOffline
  if (isOffline) return
  dispatch({
    type: 'QUIZ_ENGAGEMENT_UPDATE_REQUEST',
  })
  try {
    let {data} = await axios.put(quizEngagementEndpoint.update({quizId: quizEngagement.quiz, quizEngagementId: quizEngagement._id}), quizEngagement)
    dispatch({ type: 'QUIZ_ENGAGEMENT_UPDATE_SUCCESS', payload: {quizEngagement: data} })
  } catch (err) {
    console.error(err)
    dispatch({ type: 'QUIZ_ENGAGEMENT_UPDATE_ERROR', payload: {error: err.response.data} })
  }
}, 3000)

export let updateQuizEngagement = ({quizEngagement}) => async (dispatch, getState) => {
  dispatch({
    type: 'QUIZ_ENGAGEMENT_LOCAL_UPDATE',
    payload: {quizEngagement}
  })

  syncQuizEngagementDebounced({quizEngagement}, dispatch, getState)
}

export let finishQuizEngagement = ({quizEngagement}) => async (dispatch, getState) => {
  dispatch({
    type: 'QUIZ_ENGAGEMENT_FINISH_REQUEST',
  })
  syncQuizEngagementDebounced.flush()
  let isOffline = getState().global.isOffline
  if (!isOffline) {
    try {
      let {data} = await axios.post(quizEngagementEndpoint.finish({quizId: quizEngagement.quiz, quizEngagementId: quizEngagement._id}), {quizEngagement})
      dispatch({ type: 'QUIZ_ENGAGEMENT_FINISH_SUCCESS', payload: {quizEngagement: data} })
    } catch (err) {
      console.error(err)
      dispatch({ type: 'QUIZ_ENGAGEMENT_FINISH_ERROR', payload: {error: err.response.data} })
    }
  } else {
    let data = {
      ...quizEngagement,
      finished: true,
      finishedAt: new Date(),
      __meta: {
        ...quizEngagement.__meta,
        synced: false
      }
    }
    dispatch({ type: 'QUIZ_ENGAGEMENT_FINISH_SUCCESS', payload: {quizEngagement: data} })
  }
}

export let listQuizEngagements = ({quizId}) => async (dispatch, getState) => {
  // do not repeat request that had happened less than 10 seconds ago
  if (Date.now() - getState().requestHistory['QUIZ_ENGAGEMENT_LIST'] < 10000) return
  let isOffline = getState().global.isOffline
  if (isOffline) return
  dispatch({
    type: 'QUIZ_ENGAGEMENT_LIST_REQUEST',
  })
  try {
    let {data} = await axios.get(quizEngagementEndpoint.list({quizId}), {quizId})
    dispatch({ type: 'QUIZ_ENGAGEMENT_LIST_SUCCESS', payload: {quizEngagements: data, quizId} })
  } catch (err) {
    console.error(err)
    dispatch({ type: 'QUIZ_ENGAGEMENT_LIST_ERROR', payload: {error: err.response.data} })
  }
}

export let retrieveQuizEngagement = ({quizId, quizEngagementId}) => async dispatch => {
  dispatch({
    type: 'QUIZ_ENGAGEMENT_RETRIEVE_REQUEST',
  })
  try {
    let {data} = await axios.get(quizEngagementEndpoint.retrieve({quizId, quizEngagementId}))
    dispatch({ type: 'QUIZ_ENGAGEMENT_RETRIEVE_SUCCESS', payload: {quizEngagement: data, quizId} })
  } catch (err) {
    console.error(err)
    dispatch({ type: 'QUIZ_ENGAGEMENT_RETRIEVE_ERROR', payload: {error: err.response.data} })
  }
}

export let endQuizEngagement = ({quizEngagement}) => async dispatch => {
  dispatch({
    type: 'QUIZ_ENGAGEMENT_END',
    payload: {quizEngagement}
  })
}


export let syncQuizEngagement = ({_id, ...quizEngagement}) => async (dispatch, getState) => {
  let isOffline = getState().global.isOffline
  if (isOffline) return

  dispatch({
    type: 'QUIZ_ENGAGEMENT_SYNC_REQUEST',
  })

  try {
    let {data} = await axios.post(quizEngagementEndpoint.sync({quizId: quizEngagement.quiz}), quizEngagement)
    dispatch({ type: 'QUIZ_ENGAGEMENT_SYNC_SUCCESS', payload: {quizEngagement: data, quizId: quizEngagement.quiz, oldId: _id} })
  } catch (err) {
    console.error(err)
    dispatch({ type: 'QUIZ_ENGAGEMENT_SYNC_ERROR', payload: {error: err.response.data} })
  }
}
