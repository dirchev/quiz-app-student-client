import axios from 'axios'
import {quizApps} from 'endpoints'

export let loadQuizApp = () => async dispatch => {
  dispatch({
    type: 'QUIZ_APP_RETRIEVE_REQUEST',
  })
  try {
    let {data} = await axios.get(quizApps.load)
    dispatch({ type: 'QUIZ_APP_RETRIEVE_SUCCESS', payload: {quizApp: data} })
  } catch (err) {
    console.error(err)
    dispatch({ type: 'QUIZ_APP_RETRIEVE_ERROR', payload: {error: err.response.data} })
  }
}
