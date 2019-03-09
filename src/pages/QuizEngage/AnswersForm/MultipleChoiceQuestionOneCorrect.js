import React, { Component } from "react"

class MultipleChoiceQuestionOneCorrect extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.props.onAnswerChange(e.target.value)
  }

  render() {
    let question = this.props.question
    return (
      <div className="answer-select">
        {
          question.answers.options.map((answer, index) => {
            return (
              <div key={index} className="answer-select-item radio">
                <label htmlFor={this.props.question._id + '' + index}>{answer.text}</label>
                <input
                  id={this.props.question._id + '' + index}
                  type="radio"
                  checked={this.props.answer === answer._id}
                  value={answer._id}
                  onChange={this.handleChange}
                />
                <div className="check"></div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

MultipleChoiceQuestionOneCorrect.defaultProps = {
  answer: null
}

export default MultipleChoiceQuestionOneCorrect
