import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './theme/index.scss'
import * as serviceWorker from './serviceWorker'
import createStore from './createStore'
import axios from 'axios'
import { addNotification } from './actions/notifications';

// load logged in user
let token = window.localStorage.getItem('QuizAppToken')
let user = window.localStorage.getItem('QuizAppToken')
if (token) {
  window.user = JSON.parse(user)
  axios.defaults.headers.common['QuizAppToken'] = token
}

let {store, persistor} = createStore()

serviceWorker.register({
  onSuccess: function () {
    store.dispatch(addNotification({
      notification: {
        type: 'serviceWorkerRegistered'
      }
    }))
  },
  onUpdate: function () {
    store.dispatch(addNotification({
      notification: {
        type: 'newVersion'
      }
    }))
  }
})

const rootElement = document.getElementById("root")
ReactDOM.render(<App store={store} persistor={persistor}/>, rootElement)
