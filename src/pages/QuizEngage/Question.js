import React, { Component } from "react"
import MultipleChoiceQuestionOneCorrect from './AnswersForm/MultipleChoiceQuestionOneCorrect'
import MultipleChoiceQuestionMultipleCorrect from './AnswersForm/MultipleChoiceQuestionMultipleCorrect'
import FreeShortText from './AnswersForm/FreeShortText'
import FreeLongText from './AnswersForm/FreeLongText'
import MultilineText from "../../components/MultilineText";

const TYPE_COMPONENT_MAP = {
  'MCQ_MULTIPLE_RIGHT': MultipleChoiceQuestionMultipleCorrect,
  'MCQ_ONE_RIGHT': MultipleChoiceQuestionOneCorrect,
  'FREE_SHORT_TEXT': FreeShortText,
  'FREE_LONG_TEXT': FreeLongText,
}

class QuizEngageQuestion extends Component {
  render() {
    let question = this.props.question
    return (
      <div className="question">
        <h2 className="title">{question.title}</h2>
        <div className="content">
          <MultilineText text={question.content} />
        </div>
        {
          this.renderAnswerSection(question)
        }
      </div>
    )
  }

  renderAnswerSection (question) {
    let handleAnswerChange = (newValue) => {
      this.props.onAnswerChange(question._id, newValue)
    }
    let AnswersComponent = TYPE_COMPONENT_MAP[question.type]
    if (!AnswersComponent) return (
      <div className="alert alert-danger">Could not load question</div>
    )
    return (
      <AnswersComponent question={question} answer={this.props.quizEngagement.answersGiven[question._id]} onAnswerChange={handleAnswerChange} />
    )
  }
}

export default QuizEngageQuestion
