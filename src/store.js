import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import persistState from 'redux-localstorage'
import axios from 'axios'

let store
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  store = createStore(
    reducer,
    compose(
      persistState(),
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
} else {
  store = createStore(
    reducer,
    compose(
      persistState(),
      applyMiddleware(thunk)
    )
  )
}

const authentication = store.getState().authentication

if (authentication.token) {
  axios.defaults.headers.common['authtoken'] = authentication.token
}


export default store
