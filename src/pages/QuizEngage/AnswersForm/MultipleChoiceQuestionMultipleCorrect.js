import React, { Component } from "react"

class MultipleChoiceQuestionMultipleCorrect extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    if (e.target.checked) {
      // add the answer to the rest of the answers
      this.props.onAnswerChange([
        ...this.props.answer,
        e.target.value
      ])
    } else {
      // remove the answer from the rest of the answers
      this.props.onAnswerChange(this.props.answer.filter((i) => i !== e.target.value))
    }
  }

  render() {
    let question = this.props.question
    return (
      <div className="answer-select">
        {
          question.answers.map((answer, index) => {
            return (
              <div key={index} className="answer-select-item checkbox">
                <label htmlFor={this.props.question._id + '' + index}>{answer.text}</label>
                <input
                  id={this.props.question._id + '' + index}
                  type="checkbox"
                  checked={this.props.answer.indexOf(answer._id) !== -1}
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

MultipleChoiceQuestionMultipleCorrect.defaultProps = {
  answer: []
}

export default MultipleChoiceQuestionMultipleCorrect
