export let setUserTestProgress = ({key}) => async dispatch => {
  dispatch({
    type: 'SET_USER_TEST_PROGRESS',
    payload: { key }
  })
}

export let setUserTestFlag = ({key}) => async dispatch => {
  dispatch({
    type: 'SET_USER_TEST_FLAG',
    payload: { key }
  })
}

export let finishUserTest = () => async dispatch => {
  dispatch({
    type: 'SET_USER_TEST_FLAG',
    payload: { key: 'End' }
  })
}
