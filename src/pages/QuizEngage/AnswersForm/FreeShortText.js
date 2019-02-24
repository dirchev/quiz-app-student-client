import React, { Component } from "react"
import Input from 'components/Form/Input'

class FreeShortText extends Component {
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
        <Input
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

FreeShortText.defaultProps = {
  answer: ''
}

export default FreeShortText
