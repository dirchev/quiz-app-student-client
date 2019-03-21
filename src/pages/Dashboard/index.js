import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import './index.scss'
import { connect } from "react-redux";
import { loadQuizess, prepareQuiz } from "actions/quiz"
import Navigation from 'components/Navigation'
import ContextMenu from "../../components/ContextMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";
import MultilineText from 'components/MultilineText'

class Dashboard extends Component {
  constructor() {
    super()
    this.renderQuiz = this.renderQuiz.bind(this)
    this.handleDownloadQuiz = this.handleDownloadQuiz.bind(this)
  }
  componentWillMount() {
    this.props.listQuizess()
  }

  handleDownloadQuiz (quiz) {
    return (e) => {
      e.preventDefault()
      this.props.prepareQuiz(quiz)
    }
  }

  render() {
    return (
      <Fragment>
        <Navigation />
        <div className="container">
          <div className="quizess-list">
            {
              this.props.quizess.map(this.renderQuiz)
            }
          </div>
        </div>
      </Fragment>
    )
  }

  renderQuiz(quiz) {
    let contextOrIcon = null
    if (quiz.isAvailableOffline) {
      if (quiz.__meta.readyToEngage) {
        contextOrIcon = (<span className="icon icon-primary"><FontAwesomeIcon icon={faSave}/></span>)
      } else if (quiz.__meta.downloading) {
        contextOrIcon = (<span className="icon icon-grey"><FontAwesomeIcon icon={faSpinner} spin/></span>)
      } else if (!this.props.isOffline) {
        contextOrIcon = (
          <ContextMenu className="icon">
            <button onClick={this.handleDownloadQuiz(quiz)} className="item with-icon">
              <span className="icon"><FontAwesomeIcon icon={faDownload}/></span>
              <span className="content">Download</span>
            </button>
          </ContextMenu>
        )
      }
    }
    return (
      <div key={quiz._id} className="assessment-card">
        {contextOrIcon}
        <h2 className="title">{quiz.name}</h2>
        <div className="info">
          {
            quiz.isMandatory
              ? <div className="info-item red">Mandatory</div>
              : null
          }
          {
            !quiz.marksReleased
              ? (
                <div className="info-item yellow">Marks pending.</div>
              )
              : (
                <div className="info-item green">Marks released.</div>
              )
          }
          {
            quiz.__meta.readyToEngage
              ? (
                <div className="info-item primary">Available offline.</div>
              )
              : null
          }
        </div>
        {
          quiz.description
          ? (
            <div className="description">
              <MultilineText text={quiz.description} />
            </div>
          ) : null
        }
        <div className="controls">
          <Link to={`/quiz/${quiz._id}`} className="button button-blue button-small">View Quiz</Link>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state, props) => {
  return {
    isOffline: state.global.isOffline,
    quizApp: state.quizApp,
    quizess: (state.quizApp.quizess || []).map(quizId => state.entities.quizess[quizId]).filter(i => i),
  }
}

let mapDispatchToProps = (dispatch, props) => {
  return {
    listQuizess: () => dispatch(loadQuizess()),
    prepareQuiz: (quiz) => {
      dispatch(prepareQuiz({quizId: quiz._id}))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
