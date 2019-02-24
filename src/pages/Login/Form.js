import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux"
import loginAction from 'actions/login'
import Input from 'components/Form/Input'
import { getErrorMessagesForField } from "utils/errorMessages";

class LoginForm extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getErrorForField (field) {
    if (!this.props.loginStatus.error) return ''
    return getErrorMessagesForField(this.props.loginStatus.error, field).join(' ')
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
    this.props.loginUser(this.state)
  }

  render() {
    if (this.props.loginStatus.loading) {
      return (
        <div>Loading</div>
      )
    }
    if (this.props.loginStatus.success) {
      return (
        <Redirect to="/dashboard"/>
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
          <div className="controls separated">
            <Link to="/register" className="button button-primary button-link">Create an account</Link>
            <button onClick={this.handleSubmit} className="button button-primary">Login</button>
          </div>
        </form>
      </div>
    )
  }
}


let mapStateToProps = (state) => {
  return {
    loginStatus: state.statuses.login
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    loginUser: formData => dispatch(loginAction(formData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
