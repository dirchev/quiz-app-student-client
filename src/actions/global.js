
export let setVar = ({key, value}) => async dispatch => {
  dispatch({
    type: 'SET_GLOBAL_VAR',
    payload: {
      key,
      value
    }
  })
}

export let delVar = ({key}) => async dispatch => {
  dispatch({
    type: 'DEL_GLOBAL_VAR',
    payload: {
      key
    }
  })
}
