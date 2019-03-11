/**
 * Architecture pattern taken from
 * https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6
 */

export const requestHistoryReducer = (state = {}, action) => {
  const { type } = action
  const matches = /(.*)_(REQUEST)/.exec(type)
  if (!matches) return state // not an action we care about
  const [, requestName] = matches;

  return {
    ...state,
    [requestName]: Date.now()
  }
}

export default requestHistoryReducer
