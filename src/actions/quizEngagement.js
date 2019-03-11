import axios from 'axios'
import {quizEngagement as quizEngagementEndpoint} from 'endpoints'
import {debounce} from 'lodash'

export let createQuizEngagement = ({quizId}) => async dispatch => {
  dispatch({
    type: 'QUIZ_ENGAGEMENT_CREATE_REQUEST',
  })
  try {
    let {data} = await axios.post(quizEngagementEndpoint.create({quizId}))
    dispatch({ type: 'QUIZ_ENGAGEMENT_CREATE_SUCCESS', payload: {quizEngagement: data, quizId} })
  } catch (err) {
    console.error(err)
    dispatch({ type: 'QUIZ_ENGAGEMENT_CREATE_ERROR', payload: {error: err.response.data} })
  }
}

export let resumeQuizEngagement = ({quizId, quizEngagementId}) => async dispatch => {
  dispatch({
    type: 'QUIZ_ENGAGEMENT_RESUME_REQUEST',
  })
  try {
    let {data} = await axios.post(quizEngagementEndpoint.resume({quizId, quizEngagementId}))
    dispatch({ type: 'QUIZ_ENGAGEMENT_RESUME_SUCCESS', payload: {quizEngagement: data, quizId} })
  } catch (err) {
    console.error(err)
    dispatch({ type: 'QUIZ_ENGAGEMENT_RESUME_ERROR', payload: {error: err.response.data} })
  }
}

let syncQuizEngagementDebounced = debounce(async ({quizEngagement}, dispatch) => {
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

export let updateQuizEngagement = ({quizEngagement}) => async dispatch => {
  dispatch({
    type: 'QUIZ_ENGAGEMENT_LOCAL_UPDATE',
    payload: {quizEngagement}
  })

  syncQuizEngagementDebounced({quizEngagement}, dispatch)
}

export let finishQuizEngagement = ({quizEngagement}) => async dispatch => {
  dispatch({
    type: 'QUIZ_ENGAGEMENT_FINISH_REQUEST',
  })
  syncQuizEngagementDebounced.flush()
  try {
    let {data} = await axios.post(quizEngagementEndpoint.finish({quizId: quizEngagement.quiz, quizEngagementId: quizEngagement._id}), {quizEngagement})
    dispatch({ type: 'QUIZ_ENGAGEMENT_FINISH_SUCCESS', payload: {quizEngagement: data} })
  } catch (err) {
    console.error(err)
    dispatch({ type: 'QUIZ_ENGAGEMENT_FINISH_ERROR', payload: {error: err.response.data} })
  }
}

export let listQuizEngagements = ({quizId}) => async (dispatch, getState) => {
  // do not repeat request that had happened less than 10 seconds ago
  if (Date.now() - getState().requestHistory['QUIZ_ENGAGEMENT_LIST'] < 10000) return
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
