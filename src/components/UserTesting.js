import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { faFlask, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from 'components/Form/Checkbox'
import cn from 'classnames'
import SwipeUpDown from "./SwipeUpDown";

const TASKS = [
  'Start',
  'RegistrationComplete',
  'LoginComplete',
  'QuizPreview',
  'QuizEngagementStart',
  'QuizEngagementFinish',
  'QuizFeedbackOpen',
]

const TASKS_DETAILS = {
  'Start': {
    title: 'Start the application.',
    description: 'This is the first task and you already have it done!'
  },
  'RegistrationComplete': {
    title: 'Register an account',
    description: 'Create an account with the details provided.'
  },
  'LoginComplete': {
    title: 'Log in',
    description: 'Log in with the newly createad account'
  },
  'QuizPreview': {
    title: 'Open a quiz',
    description: 'Open the quiz in order to get more details on what this quiz is all about.'
  },
  'QuizEngagementStart': {
    title: 'Engage quiz',
    description: 'Start a quiz attempt.'
  },
  'QuizEngagementFinish': {
    title: 'Finish a quiz',
    description: 'Finish the quiz attempt.'
  },
  'QuizFeedbackOpen': {
    title: 'View quiz mark',
    description: 'View what mark and feedback you have got for the quiz.'
  },
}

class UserTesting extends Component {
  constructor() {
    super()

    this.state = {
      opened: 0
    }

    this.togglePanelOpened = this.togglePanelOpened.bind(this)
    this.startTest = this.startTest.bind(this)
    this.setOpenedState = this.setOpenedState.bind(this)

    this.contentRef = React.createRef();
  }

  getCurrentTask() {
    let taskId
    for (taskId of TASKS) {
      if (!this.props.userTesting.steps[taskId]) break
    }
    if (!taskId) return
    return {
      _id: taskId,
      ...TASKS_DETAILS[taskId]
    }
  }

  togglePanelOpened(e) {
    e.preventDefault()
    this.setState(({ opened }) => ({
      opened: opened === 0 ? 2 : 0
    }))
  }

  setOpenedState(newStep) {
    if (newStep < 0) newStep = 0
    if (newStep > 2) newStep = 2
    this.setState({ opened: newStep })
  }

  startTest(e) {
    e.preventDefault()
    this.props.startTest()
  }

  componentDidUpdate () {
    if (this.state.opened === 1) {
      document.getElementById('root').style.paddingBottom = '100px'
    } else {
      document.getElementById('root').style.paddingBottom = '20px'
    }
  }

  render() {
    return (
      <SwipeUpDown
        contentRef={this.contentRef}
        step={this.state.opened}
        steps={[-50, -100]}
        onSwipeChange={this.setOpenedState}>
        <div className={cn('user-testing-panel', {opened: this.state.opened})}>
          <button onClick={this.togglePanelOpened} className="title">
            <FontAwesomeIcon icon={this.state.opened ? faChevronDown : faChevronUp} />
            <div className="content">
              <span>
                {
                  this.props.userTesting.steps['Start']
                    ? this.getCurrentTask().title
                    : 'User testing session!'
                }
              </span>&nbsp;
              <FontAwesomeIcon icon={faFlask} />
            </div>
            <FontAwesomeIcon icon={this.state.opened ? faChevronDown : faChevronUp} />
          </button>

          <div className="content-wrapper">
            <div className="content" ref={this.contentRef}>
              {this.renderContent()}
            </div>
          </div>
        </div>
      </SwipeUpDown>
    )
  }

  renderContent() {
    let taskDetails = this.getCurrentTask()
    let taskStatus = this.props.userTesting.steps[taskDetails._id]
    return (
      <Fragment>
        <div className={cn('form', {hidden: this.state.opened !== 1})}>
          <Checkbox
            readOnly
            className={cn("checkbox-success", { 'crossed': !!taskStatus })}
            label={taskDetails.title}
            checked={!!taskStatus}
            helpText={taskDetails.description}
          />
        </div>
        <div className={cn({hidden: this.state.opened !== 2})}>
          <h4>User Testing Information</h4>
          {this.renderTasks()}
          <button className="button button-primary button-small" onClick={this.startTest}>Start</button>
        </div>
      </Fragment>
    )
  }

  renderTasks() {
    return (
      <div className="form">
        {
          TASKS.map((taskId) => {
            let taskDetails = TASKS_DETAILS[taskId]
            let taskStatus = this.props.userTesting.steps[taskId]
            return (
              <Checkbox
                key={taskId}
                readOnly
                className={cn("checkbox-success", { 'crossed': !!taskStatus })}
                label={taskDetails.title}
                checked={!!taskStatus}
                helpText={taskDetails.description}
              />
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    userTesting: state.userTesting
  }
}

const mapDispatchToProps = function (dispatch, props) {
  return {
    startTest: () => {
      dispatch({
        type: 'SET_USER_TEST_PROGRESS',
        payload: { key: 'Start' }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTesting)
