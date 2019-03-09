import React, { Component } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import QuizPreview from './pages/QuizPreview';
import QuizEngage from './pages/QuizEngage';
import QuizEngagements from './pages/QuizEngagements';
import QuizFeedback from './pages/QuizFeedback';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import NetworkWatcher from './components/NetworkWatcher'
import { Provider } from 'react-redux'
import PrivateRoute from './components/PrivateRoute'
import store from './store'
import {loadQuizApp} from 'actions/quizApp'

class App extends Component {
  componentWillMount () {
    store.dispatch(loadQuizApp())
  }
  render() {
    if (store.getState().loading.QUIZ_APPS_RETRIEVE)
    return (
      <div>Loading</div>
    )
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route title="Home" exact path="/" component={Home} />
            <Route title="Login" path="/login" component={Login} />
            <Route title="Register" path="/register" component={Register} />

            {/* ProtectedRoutes */}
            <NetworkWatcher />
            <PrivateRoute title="Dashboard" path="/dashboard" component={Dashboard} />
            <PrivateRoute title="Profile" path="/profile" component={Profile} />

            <PrivateRoute title="Quiz Preview" exact path="/quiz/:quizId" component={QuizPreview} />
            <PrivateRoute title="Quiz Engagements" exact path="/quiz/:quizId/engagements" component={QuizEngagements} />
            <PrivateRoute title="Quiz Feedback" path="/quiz/:quizId/feedback/:quizEngagementId" component={QuizFeedback} />
            <Switch>
              <PrivateRoute title="Quiz Attempt" path="/quiz/:quizId/engage/:quizEngagementId" component={QuizEngage} />
              <PrivateRoute title="Quiz Attempt" path="/quiz/:quizId/engage" component={QuizEngage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
