import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { displayErrors } from '../helpers/utils'
import { REGISTER_START } from '../store/constant'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  errors: state.auth.errors
})

const mapDispatchToProps = dispatch => ({
  register: user => dispatch({ type: REGISTER_START, user })
})

class RegisterPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: '',
        username: '',
        password: ''
      }
    }
  }

  onInputChange = event => {
    const targetValue = event.target.value
    const targetName = event.target.name

    this.setState({
      user: {
        ...this.state.user,
        [targetName]: targetValue
      }
    })
  }

  onHandleSubmit = event => {
    event.preventDefault()
    this.setState({
      user: {
        username: '',
        email: '',
        password: ''
      }
    })
    this.props.register(this.state.user)
  }

  render() {
    const { user } = this.state
    const { errors } = this.props

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <Link to="/login">Have an account?</Link>
              </p>

              <ul className="error-messages">
                {displayErrors(errors)}
              </ul>

              <form>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg"
                    name="username"
                    type="text"
                    value={user.username}
                    placeholder="Your Name"
                    onChange={this.onInputChange} />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg"
                    name="email"
                    type="email"
                    user={user.email}
                    placeholder="Email"
                    onChange={this.onInputChange} />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg"
                    name="password"
                    type="password"
                    user="user.password"
                    placeholder="Password"
                    onChange={this.onInputChange} />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right" onClick={this.onHandleSubmit}>Sign up</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)