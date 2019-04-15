import React, { Component, Fragment } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import QuizPreview from './pages/QuizPreview';
import QuizEngage from './pages/QuizEngage';
import QuizEngagements from './pages/QuizEngagements';
import QuizFeedback from './pages/QuizFeedback';
import axios from 'axios'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import NetworkWatcher from './components/NetworkWatcher'
import NotificationsManager from './components/NotificationsManager'
import { Provider } from 'react-redux'
import PrivateRoute from './components/PrivateRoute'
import {loadQuizApp} from 'actions/quizApp'
import { PersistGate } from 'redux-persist/integration/react'

class App extends Component {
  constructor () {
    super()
    this.handleOnBeforeLift = this.handleOnBeforeLift.bind(this)
  }
  componentWillMount () {
    this.props.store.dispatch(loadQuizApp())
  }
  handleOnBeforeLift () {
    // set requests auth token
    axios.defaults.headers.common['authtoken'] = this.props.store.getState().authentication.token
  }
  render() {
    if (this.props.store.getState().loading.QUIZ_APPS_RETRIEVE)
    return (
      <div>Loading</div>
    )
    return (
      <Provider store={this.props.store}>
        <PersistGate persistor={this.props.persistor} onBeforeLift={this.handleOnBeforeLift}>
          <Router>
            <Fragment>
              <Route title="Home" exact path="/" component={Home} />
              <Route title="Login" path="/login" component={Login} />
              <Route title="Register" path="/register" component={Register} />

              {/* ProtectedRoutes */}
              <NetworkWatcher />
              <NotificationsManager />
              <PrivateRoute title="Dashboard" path="/dashboard" component={Dashboard} />

              <PrivateRoute title="Quiz Preview" exact path="/quiz/:quizId" component={QuizPreview} />
              <PrivateRoute title="Quiz Engagements" exact path="/quiz/:quizId/engagements" component={QuizEngagements} />
              <PrivateRoute title="Quiz Feedback" path="/quiz/:quizId/feedback/:quizEngagementId" component={QuizFeedback} />
              <Switch>
                <PrivateRoute title="Quiz Attempt" path="/quiz/:quizId/engage/:quizEngagementId" component={QuizEngage} />
                <PrivateRoute title="Quiz Attempt" path="/quiz/:quizId/engage" component={QuizEngage} />
              </Switch>
            </Fragment>
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

export default App;
