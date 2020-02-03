import React, { Component } from 'react'
import { connect } from 'react-redux'
import { UPDATE_PROFILE_START, CLEAR_PROFILE } from '../store/constant'
import { displayErrors } from '../helpers/utils'

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  errors: state.auth.errorsUpdateProfile
})

const mapDispatchToProps = dispatch => ({
  updateProfile: user => dispatch({ type: UPDATE_PROFILE_START, user }),
  onUnload: () => dispatch({type: CLEAR_PROFILE})
})

class SettingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        image: '',
        username: '',
        email: '',
        password: '',
        bio: ''
      }
    }
  }

  componentDidMount() {
    if (this.props.currentUser.username) this.setState({ user: { ...this.props.currentUser } })
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currentUser.username && !state.user.username) {
      return {
        user: { ...props.currentUser }
      }
    }

    return null
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
    this.props.updateProfile(this.state.user)
  }

  render() {
    const { user } = this.state
    const { errors } = this.props

    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <ul className="error-messages">
                {displayErrors(errors)}
              </ul>

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input className="form-control"
                      name="image"
                      type="text"
                      placeholder="URL of profile picture"
                      value={user.image}
                      onChange={this.onInputChange} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input className="form-control form-control-lg"
                      name="username"
                      type="text"
                      placeholder="Your Name"
                      value={user.username}
                      onChange={this.onInputChange} />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea className="form-control form-control-lg"
                      name="bio"
                      rows="8"
                      placeholder="Short bio about you"
                      value={user.bio}
                      onChange={this.onInputChange}></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input className="form-control form-control-lg"
                      name="email"
                      type="text"
                      placeholder="Email"
                      value={user.email}
                      onChange={this.onInputChange} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input className="form-control form-control-lg"
                      name="password"
                      type="password"
                      placeholder="Your new password"
                      onChange={this.onInputChange} />
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right" onClick={this.onHandleSubmit}>
                    Update Settings
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage) 