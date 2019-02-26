import React, { Component } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import QuizPreview from './pages/QuizPreview';
import QuizEngage from './pages/QuizEngage';
import QuizEngagement from './pages/QuizEngagement';
// import QuizAnswers from './pages/QuizAnswers';

import { BrowserRouter as Router, Route } from "react-router-dom"
import Navigation from './components/Navigation'
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
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />

            {/* ProtectedRoutes */}
            <PrivateRoute path={['/dashboard', '/profile', '/quiz']} component={Navigation} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/profile" component={Profile} />

            <PrivateRoute exact path="/quiz/:quizId" component={QuizPreview} />
            <PrivateRoute path="/quiz/:quizId/engage" component={QuizEngage} />
            <PrivateRoute path="/quiz/:quizId/engagements/:quizEngagementId" component={QuizEngagement} />
            {/* <PrivateRoute path="/quiz/:quizId/feedback" component={QuizFeedback} />
            <PrivateRoute path="/quiz/:quizId/answers" component={QuizAnswers} /> */}
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
