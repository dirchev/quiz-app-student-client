import React, { Component } from 'react'
import cn from 'classnames'
import uuid from 'uuid'

class Textarea extends Component {
  constructor () {
    super()
    this.textareaId = uuid.v4()
  }

  getTextareaMessage () {
    if (this.props.error) {
      return this.props.error
    } else if (this.props.isLoading) {
      return 'Loading...'
    } else if (this.props.helpText) {
      return this.props.helpText
    } else {
      return null
    }
  }

  render () {
    return (
      <div
        className={cn('form-field', {
          'has-error': this.props.error,
          'is-successful': this.props.isSuccessful,
          'is-loading': this.props.isLoading,
        })}
      >
        {
          this.props.label
          ? (
            <label htmlFor={this.TextareaId} className="label">{this.props.label}</label>
          )
          : null
        }
        <textarea
          id={this.TextareaId}
          className="input"
          value={this.props.value}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
          />
        {
          this.getTextareaMessage()
          ? (
            <div className="input-message">
              {this.getTextareaMessage()}
            </div>
          ) : null
        }
      </div>
    )
  }
}

export default Textarea
