import axios from 'axios'
import {quizess} from 'endpoints'

export let loadQuizess = () => async (dispatch, getState) => {
  dispatch({
    type: 'QUIZ_LIST_REQUEST',
  })
  let isOffline = getState().global.isOffline
  if (isOffline) return
  try {
    let {data} = await axios.get(quizess.list)
    dispatch({ type: 'QUIZ_LIST_SUCCESS', payload: {quizess: data} })
  } catch (err) {
    console.error(err)
    dispatch({ type: 'QUIZ_LIST_ERROR', payload: {error: err.response.data} })
  }
}

export let prepareQuiz = ({quizId}) => async (dispatch, getState) => {
  dispatch({
    type: 'QUIZ_PREPARE_REQUEST',
  })
  let isOffline = getState().global.isOffline
  let quiz = getState().entities.quizess[quizId]
  if (quiz.questions) return dispatch({ type: 'QUIZ_PREPARE_SUCCESS', payload: {questions: quiz.questions, quizId} })
  if (isOffline) {
    let errorData = {
      name: "ClientError",
      message: "Quiz can not be fetched."
    }
    dispatch({ type: 'QUIZ_PREPARE_ERROR', payload: {error: errorData} })
    return
  }
  try {
    let {data} = await axios.get(quizess.prepare({quizId}))
    dispatch({ type: 'QUIZ_PREPARE_SUCCESS', payload: {questions: data, quizId} })
  } catch (err) {
    console.error(err)
    dispatch({ type: 'QUIZ_PREPARE_ERROR', payload: {error: err.response.data} })
  }
}

export let retrieveQuiz = ({quizId}) => async (dispatch, getState) => {
  dispatch({
    type: 'QUIZ_RETRIEVE_REQUEST',
  })
  let isOffline = getState().global.isOffline
  let quiz = getState().entities.quizess[quizId]
  quiz.questions = (quiz.questions || []).map((_id) => getState().entities.questions[_id])
  if (quiz.questions) return dispatch({ type: 'QUIZ_RETRIEVE_SUCCESS', payload: {quiz: quiz, quizId} })
  if (isOffline) {
    let errorData = {
      name: "ClientError",
      message: "Quiz can not be fetched."
    }
    dispatch({ type: 'QUIZ_PREPARE_ERROR', payload: {error: errorData} })
    return
  }
  try {
    let {data} = await axios.get(quizess.retrieve({quizId}))
    dispatch({ type: 'QUIZ_RETRIEVE_SUCCESS', payload: {quiz: data, quizId} })
  } catch (err) {
    console.error(err)
    dispatch({ type: 'QUIZ_RETRIEVE_ERROR', payload: {error: err.response.data} })
  }
}
