import React, { Component } from 'react'
import cn from 'classnames'
import uuid from 'uuid'

class Checkbox extends Component {
  constructor () {
    super()
    this.inputId = uuid.v4()
  }

  getInputMessage () {
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
        className={cn('form-field checkbox ' + this.props.className, {
          'top-label': this.props.topLabel,
          'has-error': this.props.error,
          'is-successful': this.props.isSuccessful,
          'is-loading': this.props.isLoading,
          'is-disabled': this.props.disabled,
        })}
      >
        <label htmlFor={this.inputId} className="label">{this.props.label}</label>
        <input
          readOnly={this.props.readOnly}
          type="checkbox"
          className="input"
          checked={this.props.checked}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
          id={this.inputId}
        />
        <div className="check"></div>
        {
          this.getInputMessage()
          ? (
            <div className="input-message">
              {this.getInputMessage()}
            </div>
          ) : null
        }
      </div>
    )
  }
}

export default Checkbox
