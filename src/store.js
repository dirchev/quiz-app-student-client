import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
let store
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
} else {
  store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk)
    )
  )
}


export default store
