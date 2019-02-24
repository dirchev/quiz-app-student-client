import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { connect } from "react-redux"
import registerAction from 'actions/register'
import Input from 'components/Form/Input'
import { getErrorMessagesForField } from "utils/errorMessages";

class RegisterForm extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      joinCode: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getErrorForField (field) {
    if (!this.props.error) return ''

    return getErrorMessagesForField(this.props.error, field).join(' ')
  }

  handleChange (field) {
    return (event) => {
      let value = event.target.value
      this.setState({
        [field]: value
      })
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.registerUser(this.state)
  }

  render() {
    if (this.props.loading) {
      return (
        <div>Loading</div>
      )
    }
    if (this.props.success) {
      return (
        <div className="alert alert-success">
          <h4>Success!</h4>
          <p>
            You have registered successfully, {this.state.name}. You can
            now <Link to="/login" className="alert-link">login</Link> to
            your account.
          </p>
        </div>
      )
    }
    return (
      <div>
        {
          this.getErrorForField('base')
          ? (
            <div className="alert alert-danger">{this.getErrorForField('base')}</div>
          )
          : null
        }
        <form onSubmit={this.handleSubmit} className="form">
          <Input
            error={this.getErrorForField('name')}
            label="Name"
            type="text"
            className="input"
            placeholder='Please enter your name.'
            value={this.state.name}
            onChange={this.handleChange('name')}
          />
          <Input
            error={this.getErrorForField('email')}
            label="Email"
            type="text"
            className="input"
            placeholder='Please enter your email.'
            value={this.state.email}
            onChange={this.handleChange('email')}
          />
          <Input
            error={this.getErrorForField('password')}
            label="Password"
            type="password"
            className="input"
            placeholder='Please enter your password.'
            value={this.state.password}
            onChange={this.handleChange('password')}
          />
          <Input
            error={this.getErrorForField('joinCode')}
            label="Join Code"
            type="text"
            className="input"
            placeholder='Please enter the join code.'
            helpText="The join code should have been given to you by the module leader."
            value={this.state.joinCode}
            onChange={this.handleChange('joinCode')}
          />
          <div className="controls separated">
            <Link to="/login" className="button button-primary button-link">Already have an account?</Link>
            <button onClick={this.handleSubmit} className="button button-primary">Register</button>
          </div>
        </form>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    success: state.success.REGISTER,
    error: state.error.REGISTER,
    loading: state.loading.REGISTER
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    registerUser: formData => dispatch(registerAction(formData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
