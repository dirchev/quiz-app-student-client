import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './theme/index.scss'
import * as serviceWorker from './serviceWorker'

import axios from 'axios'

// load logged in user
let token = window.localStorage.getItem('QuizAppToken')
let user = window.localStorage.getItem('QuizAppToken')
if (token) {
  window.user = JSON.parse(user)
  axios.defaults.headers.common['QuizAppToken'] = token
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

window.colors = [
  'red',
  'pink',
  'purple',
  'deepPurple',
  'indigo',
  'blue',
  'lightBlue',
  'cyan',
  'teal',
  'green',
  'lightGreen',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deepOrange',
  'brown',
  'grey',
  'blueGrey'
]

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
