import axios from 'axios'
import {quizess} from 'endpoints'

export let loadQuizess = () => async dispatch => {
  dispatch({
    type: 'QUIZ_LIST_REQUEST',
  })
  try {
    let {data} = await axios.get(quizess.list)
    dispatch({ type: 'QUIZ_LIST_SUCCESS', payload: {quizess: data} })
  } catch (err) {
    console.error(err)
    dispatch({ type: 'QUIZ_LIST_ERROR', payload: {error: err.response.data} })
  }
}

export let prepareQuiz = ({quizId}) => async dispatch => {
  dispatch({
    type: 'QUIZ_PREPARE_REQUEST',
  })
  try {
    let {data} = await axios.get(quizess.prepare({quizId}))
    dispatch({ type: 'QUIZ_PREPARE_SUCCESS', payload: {questions: data, quizId} })
  } catch (err) {
    console.error(err)
    dispatch({ type: 'QUIZ_PREPARE_ERROR', payload: {error: err.response.data} })
  }
}

export let retrieveQuiz = ({quizId}) => async dispatch => {
  dispatch({
    type: 'QUIZ_RETRIEVE_REQUEST',
  })
  try {
    let {data} = await axios.get(quizess.retrieve({quizId}))
    dispatch({ type: 'QUIZ_RETRIEVE_SUCCESS', payload: {quiz: data, quizId} })
  } catch (err) {
    console.error(err)
    dispatch({ type: 'QUIZ_RETRIEVE_ERROR', payload: {error: err.response.data} })
  }
}
