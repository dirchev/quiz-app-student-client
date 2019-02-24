/**
 * Architecture pattern taken from
 * https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6
 */

export const errorReducer = (state = {}, action) => {
  const { type, payload } = action
  const matches = /(.*)_(REQUEST|ERROR)/.exec(type)
  if (!matches) return state // not an action we care about

  const [, requestName, requestState] = matches;
  return {
    ...state,
    // Store errorMessage
    // e.g. stores errorMessage when receiving GET_TODOS_FAILURE
    //      else clear errorMessage when receiving GET_TODOS_REQUEST
    [requestName]: requestState === 'ERROR' ? payload.error : ''
  }
}

export default errorReducer
