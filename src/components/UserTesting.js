import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { faFlask, faEllipsisH, faFlagCheckered, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from 'components/Form/Checkbox'
import cn from 'classnames'
import SwipeUpDown from "./SwipeUpDown";
import { setUserTestFlag, createUserTest, finishUserTest } from "../actions/userTest";

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
    title: 'Start the user test.',
    description: 'This is the first task. Just click on the "Start" button!'
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
    this.finishTest = this.finishTest.bind(this)
    this.setOpenedState = this.setOpenedState.bind(this)
    this.handleOnWheel = this.handleOnWheel.bind(this)
    this.handleSwipeChange = this.handleSwipeChange.bind(this)

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

  getProgress() {
    let all = TASKS.length
    let completed = TASKS.filter(taskId => this.props.userTesting.steps[taskId]).length
    return completed / all * 100
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

  finishTest(e) {
    e.preventDefault()
    this.props.finishTest()
  }

  toBeFinished () {
    let lastTaskId = TASKS[TASKS.length - 1]
    return !!this.props.userTesting.steps[lastTaskId]
  }

  componentWillReceiveProps (nextProps) {
    let lastTaskId = TASKS[TASKS.length - 1]
    if (nextProps.userTesting.steps[lastTaskId]) {
      this.setState({opened: 2})
    }
  }

  componentDidUpdate () {
    if (this.state.opened === 1) {
      document.getElementById('root').style.paddingBottom = '100px'
    } else {
      document.getElementById('root').style.paddingBottom = '20px'
    }
  }

  handleOnWheel (e) {
    let deltaY = e.deltaY
    this.setOpenedState(this.state.opened - Math.sign(deltaY))
  }

  handleSwipeChange (step) {
    this.setOpenedState(step)
    this.props.setSwipeFlag()
  }

  render() {
    let progress = this.getProgress() + '%'
    return (
      <SwipeUpDown
        contentRef={this.contentRef}
        step={this.state.opened}
        steps={[-50, -100]}
        onSwipeChange={this.handleSwipeChange}>
        <div
          style={{'--progress-percent': progress}}
          onMouseEnter={(e) => this.state.opened === 0 && this.setState({opened: 1, mouseEnter: true})}
          onWheel={this.handleOnWheel}
          onMouseLeave={(e) => this.state.mouseEnter && this.setState({opened: 0, mouseEnter: false})}
          className={cn('user-testing-panel', {opened: this.state.opened})}>
          <div className="drag-icon">
            <FontAwesomeIcon icon={faEllipsisH} />
          </div>
          <button
            onClick={this.togglePanelOpened}
            className="title">
              <span>
                {
                  this.toBeFinished()
                    ? 'User Test Completed!'
                    : this.getCurrentTask().title
                }
                </span>&nbsp;
              <FontAwesomeIcon icon={faFlask} />
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
    if (this.props.loading) {
      return (
        <div>
          <span>Loading...</span>
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      )
    }
    if (this.props.error) {
      return (
        <span>{this.props.error}</span>
      )
    }
    if (!this.props.started) {
      return (
        <div className={cn({hidden: !this.state.opened})}>
          <p>
            Hello, <br/>
            Thank you for participating in this user test!
            In this test, you will be given a set of tasks
            that you have to do. You will be able to see what
            the next task is from this panel. Here you will also
            find how much progress you have made. <br/>
            Good luck and thank you!
          </p>
          <div className="controls row">
            <button className="button button-success" onClick={this.startTest}>Start the test!</button>
          </div>
        </div>
      )
    }
    if (this.toBeFinished()) {
      return (
        <div className={cn({hidden: !this.state.opened})}>
          <p>
            <span>Finish!</span>&nbsp;
            <span><FontAwesomeIcon icon={faFlagCheckered} /></span>&nbsp;
            <span><FontAwesomeIcon icon={faFlagCheckered} /></span>&nbsp;
            <span><FontAwesomeIcon icon={faFlagCheckered} /></span>&nbsp;
            <br/>
            This is the end of the user test! All that is left is to
            click the finish button below. You can also fill in the quiz
            "Questionarrie" (you already know how to do that) in order to
            provide even more of your valuable feedback.<br/>
            THANK YOU!
          </p>
          <div className="controls row">
            <button className="button button-success" onClick={this.finishTest}>Finish the test!</button>
          </div>
        </div>
      )
    }
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
          <h5>Your Progress</h5>
          {this.renderTasks()}
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
    userTesting: state.userTesting,
    loading: state.loading.USER_TEST_CREATE || state.loading.USER_TEST_FINISH,
    started: state.success.USER_TEST_CREATE,
    error: state.error.USER_TEST_CREATE
  }
}

const mapDispatchToProps = function (dispatch, props) {
  return {
    startTest: () => {
      dispatch(createUserTest())
    },
    finishTest: () => {
      dispatch(finishUserTest())
    },
    setSwipeFlag: () => {
      dispatch(setUserTestFlag('UserTestingDrawerSwipe'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTesting)
