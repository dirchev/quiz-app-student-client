import React, { Component } from "react"
import MultipleChoiceQuestionOneCorrect from './Answers/MultipleChoiceQuestionOneCorrect'
import MultipleChoiceQuestionMultipleCorrect from './Answers/MultipleChoiceQuestionMultipleCorrect'
import FreeShortText from './Answers/FreeShortText'
import FreeLongText from './Answers/FreeLongText'
import MultilineText from "../../components/MultilineText";

const TYPE_COMPONENT_MAP = {
  'MCQ_MULTIPLE_RIGHT': MultipleChoiceQuestionMultipleCorrect,
  'MCQ_ONE_RIGHT': MultipleChoiceQuestionOneCorrect,
  'FREE_SHORT_TEXT': FreeShortText,
  'FREE_LONG_TEXT': FreeLongText,
}

class QuizFeedbackQuestion extends Component {
  render() {
    let question = this.props.question
    return (
      <div className="question-feedback">
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
    let AnswersComponent = TYPE_COMPONENT_MAP[question.type]
    if (!AnswersComponent) return (
      <div className="alert alert-danger">Could not load question</div>
    )
    return (
      <AnswersComponent
        question={this.props.question}
        answerFeedback={this.props.answerFeedback}
        answerGiven={this.props.answerGiven}
        answerMark={this.props.answerMark}
      />
    )
  }
}

export default QuizFeedbackQuestion
