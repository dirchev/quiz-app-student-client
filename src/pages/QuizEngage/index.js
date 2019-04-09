import React, { Component } from "react"
import { connect } from "react-redux";
import QuizEngageQuestion from "./Question";
import { Link, Redirect } from 'react-router-dom';
import { createQuizEngagement, updateQuizEngagement, finishQuizEngagement, endQuizEngagement, resumeQuizEngagement } from "../../actions/quizEngagement";
import { getAllErrorMessages } from "../../utils/errorMessages";
import { differenceInMilliseconds } from "date-fns";
import prettyMs from 'pretty-ms'
import Navigation from 'components/Navigation'
import Swipable from "../../components/Swipable";
import { setUserTestProgress, setUserTestFlag } from "../../actions/userTest";
import isMobile from 'is-mobile'
import classNames from 'classnames'

class QuizEngage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      questionIndex: 0,
      timeLeftString: ''
    }

    this.handleAnswerChange = this.handleAnswerChange.bind(this)
    this.changeQuestionIndex = this.changeQuestionIndex.bind(this)
    this.handleFinishQuizEngagement = this.handleFinishQuizEngagement.bind(this)
    this.handleSwipeQuestionIndexChange = this.handleSwipeQuestionIndexChange.bind(this)
  }

  areAllQuestionsAnswered () {
    for (let question of this.props.questions) {
      if (!this.isQuestionAnswered(question)) return false
    }
    return true
  }

  isQuestionAnswered (question) {
    return this.props.quizEngagement.answersGiven[question._id]
  }

  showFinishButton () {
    return !isMobile() ||
      this.state.questionIndex === this.props.questions.length - 1 ||
      this.areAllQuestionsAnswered()
  }

  componentWillMount() {
    this.props.recordUserTestProgress('QuizEngagementStart')
    this.props.setupQuizEngagement()
    this.timeLeftInterval = setInterval(() => {
      if (this.props.quiz.timeLimit && this.props.quizEngagement.startedAt) {
        let timePassedMs = differenceInMilliseconds(new Date(), this.props.quizEngagement.startedAt)
        let timeLimitMs = this.props.quiz.timeLimit * 1000 * 60
        let timeLeftMs = Math.floor((timeLimitMs - timePassedMs) / 1000) * 1000
        this.setState({
          timeLeftString: timeLeftMs > 0
            ? prettyMs(timeLeftMs)
            : 'no time left'
        })
      }
    }, 1000)
  }

  componentWillUnmount() {
    this.props.recordUserTestProgress('QuizEngagementEnd')
    clearInterval(this.timeLeftInterval)
    this.props.endQuizEngagement(this.props.quizEngagement)
  }

  handleQuestionIndexChange(questionIndex) {
    return (event) => {
      event.preventDefault()
      this.changeQuestionIndex(questionIndex)
    }
  }

  changeQuestionIndex(questionIndex) {
    this.props.recordUserTestProgress('QuizEngagementQuestionChange')
    if (questionIndex < 0 || questionIndex > (this.props.questions.length - 1)) return
    this.setState({ questionIndex })
  }

  handleAnswerChange(questionId, answer) {
    this.props.updateQuizEngagement({
      ...this.props.quizEngagement,
      answersGiven: {
        ...this.props.quizEngagement.answersGiven,
        [questionId]: answer
      }
    })
  }

  handleFinishQuizEngagement(e) {
    e && e.preventDefault()
    this.props.recordUserTestProgress('QuizEngagementFinish')
    this.props.finishQuizEngagement(this.props.quizEngagement)
  }

  handleSwipeQuestionIndexChange(newIndex) {
    this.changeQuestionIndex(newIndex)
    this.props.recordUserTestFlag('QuestionSwipe')
  }

  render() {
    if (this.props.shouldRedirect) {
      return (
        <Redirect to={`/quiz/${this.props.quiz._id}/engage/${this.props.quizEngagement._id}`} />
      )
    }
    if (this.props.createError || this.props.finishError) {
      return (
        <div className="alert-container">
          <div className="alert alert-danger">
            <h1>Error!</h1>
            <p>
              {getAllErrorMessages(this.props.createError || this.props.finishError).join('. ')}
            </p>
            You can now return to <Link to="/dashboard" className="alert-link">dashboard</Link>
          </div>
        </div>
      )
    }
    if (this.props.setupLoading || this.props.finishLoading || !this.props.quizEngagement) {
      return (
        <div className="alert-container">
          <div className="alert alert-info">
            <p>
              Starting quiz...
            </p>
          </div>
        </div>
      )
    }
    if (this.props.quizEngagement.finished) {
      return (
        <div className="alert-container">
          <div className="alert alert-success">
            <h1>Quiz Submited!</h1>
            <p>
              You can now return to <Link to="/dashboard" className="alert-link">dashboard</Link>
            </p>
          </div>
        </div>
      )
    }
    return (
      <div className="quiz-engage-container">
        <Navigation title={this.props.quiz.name} />
        <div className="quiz">
          <div className="info">
            {
              isMobile()
                ? (
                  <div className="progress">
                    {
                      this.props.questions.map((question, index) => {
                        let isActive = this.state.questionIndex === index
                        let isAnswered = this.isQuestionAnswered(question)
                        return (
                          <button
                            key={index}
                            className={
                              classNames('item button button-small', {
                                'button-outline': !isActive,
                                'button-blue': !isAnswered,
                                'button-success': isAnswered
                              })
                            }
                            onClick={this.handleQuestionIndexChange(index)}
                          >
                            {index + 1}
                          </button>
                        )
                      })
                    }
                  </div>
                ) : null
            }
            {
              !this.props.quiz.timeLimit
                ? (
                  <div className="timeleft">
                    {this.state.timeLeftString}
                  </div>
                ) : null
            }
          </div>
          <Swipable
            className="questions"
            selectedChildIndex={this.state.questionIndex}
            onSelectedChildIndexChange={this.handleSwipeQuestionIndexChange}
          >
            {
              this.props.questions.map((question, index) => {
                return (
                  <QuizEngageQuestion
                    key={question._id}
                    question={question}
                    quizEngagement={this.props.quizEngagement}
                    onAnswerChange={this.handleAnswerChange}
                  />
                )
              })
            }
          </Swipable>
          {
            this.showFinishButton()
            ? (
              <div className="controls">
                <button className="button button-danger button" onClick={this.handleFinishQuizEngagement}>Finish Quiz</button>
              </div>
            ) : null
          }

        </div>
      </div>
    )
  }
}

let mapStateToProps = (state, props) => {
  let quizId = props.match.params.quizId
  let quizEngagementId = props.match.params.quizEngagementId
  let currentQuizEngagement = state.currentQuizEngagement ? state.entities.quizEngagements[state.currentQuizEngagement] : null
  return {
    shouldRedirect: !quizEngagementId && currentQuizEngagement,
    loaded: !!quizEngagementId,
    quizId: quizId,
    quiz: state.entities.quizess[quizId],
    questions: (state.entities.quizess[quizId].questions || []).map((_id) => state.entities.questions[_id]),
    quizEngagement: state.currentQuizEngagement ? state.entities.quizEngagements[state.currentQuizEngagement] : null
  }
}

let mapDispatchToProps = (dispatch, props) => {
  let quizId = props.match.params.quizId
  let quizEngagementId = props.match.params.quizEngagementId
  return {
    setupQuizEngagement: () => {
      if (quizEngagementId) {
        dispatch(resumeQuizEngagement({ quizId, quizEngagementId }))
      } else {
        dispatch(createQuizEngagement({ quizId }))
      }
    },
    updateQuizEngagement: (quizEngagement) => dispatch(updateQuizEngagement({ quizEngagement })),
    finishQuizEngagement: (quizEngagement) => dispatch(finishQuizEngagement({ quizEngagement })),
    endQuizEngagement: (quizEngagement) => dispatch(endQuizEngagement({ quizEngagement })),
    recordUserTestProgress: (key) => {
      dispatch(setUserTestProgress(key))
    },
    recordUserTestFlag: (key) => {
      dispatch(setUserTestFlag(key))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizEngage)
