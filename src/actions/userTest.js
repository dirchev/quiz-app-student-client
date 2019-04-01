import axios from 'axios'
import {userTests} from 'endpoints'

export let setUserTestProgress = (key) => async (dispatch, getState) => {
  let userTestId = getState().userTesting._id
  if (!userTestId) return
  dispatch({
    type: 'SET_USER_TEST_PROGRESS',
    payload: { key }
  })
  dispatch({
    type: 'USER_TEST_UPDATE_REQUEST',
  })
  try {
    let {data} = await axios.post(userTests.setStep({userTestId}), {key: key, date: Date.now()})
    dispatch({ type: 'USER_TEST_UPDATE_SUCCESS', payload: {userTest: data} })
  } catch (err) {
    console.error(err)
    dispatch({ type: 'USER_TEST_UPDATE_ERROR', payload: {error: err.response.data} })
  }
}

export let setUserTestFlag = (key) => async (dispatch, getState) => {
  let userTestId = getState().userTesting._id
  if (!userTestId) return
  dispatch({
    type: 'SET_USER_TEST_FLAG',
    payload: { key }
  })
  dispatch({
    type: 'USER_TEST_UPDATE_REQUEST',
  })
  try {
    let {data} = await axios.post(userTests.setFlag({userTestId}), {key: key, date: Date.now()})
    dispatch({ type: 'USER_TEST_UPDATE_SUCCESS', payload: {userTest: data} })
  } catch (err) {
    console.error(err)
    dispatch({ type: 'USER_TEST_UPDATE_ERROR', payload: {error: err.response.data} })
  }
}

export let createUserTest = () => async dispatch => {
  dispatch({
    type: 'USER_TEST_CREATE_REQUEST',
  })
  try {
    let {data} = await axios.post(userTests.create(), {key: 'Start', date: Date.now()})
    dispatch({ type: 'USER_TEST_CREATE_SUCCESS', payload: {userTest: data} })
  } catch (err) {
    console.error(err)
    dispatch({ type: 'USER_TEST_CREATE_ERROR', payload: {error: err.response.data} })
  }
}

export let finishUserTest = () => async (dispatch, getState) => {
  let userTestId = getState().userTesting._id
  dispatch({
    type: 'USER_TEST_FINISH_REQUEST',
  })
  try {
    let {data} = await axios.post(userTests.finish({userTestId}), {key: 'Finish', date: Date.now()})
    dispatch({ type: 'USER_TEST_FINISH_SUCCESS', payload: {userTest: data} })
  } catch (err) {
    console.error(err)
    dispatch({ type: 'USER_TEST_FINISH_ERROR', payload: {error: err.response.data} })
  }
}

