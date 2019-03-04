/**
 * Architecture pattern taken from
 * https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6
 */

export const successReducer = (state = {}, action) => {
  const { type } = action
  const matches = /(.*)_(REQUEST|SUCCESS|ERROR)/.exec(type)
  if (!matches) return state // not an action we care about
  const [, requestName, requestState] = matches;
  console.log(requestName, requestState)

  return {
    ...state,
    [requestName]: requestState === 'SUCCESS'
  }
}

export default successReducer
