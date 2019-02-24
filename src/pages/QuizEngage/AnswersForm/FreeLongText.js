import React, { Component } from "react"
import Textarea from 'components/Form/Textarea'

class FreeLongText extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.props.onAnswerChange(e.target.value)
  }

  render() {
    return (
      <div className="answer-select form">
        <Textarea
          label="Answer"
          type="text"
          className="input"
          placeholder='Please enter your answer here.'
          value={this.props.answer}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

FreeLongText.defaultProps = {
  answer: ''
}

export default FreeLongText
