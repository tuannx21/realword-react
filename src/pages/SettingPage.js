import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { UPDATE_PROFILE_START, CLEAR_PROFILE } from '../store/constant'
import { displayErrors } from '../helpers/utils'

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  errors: state.auth.errorsUpdateProfile
})

const mapDispatchToProps = dispatch => ({
  updateProfile: user => dispatch({ type: UPDATE_PROFILE_START, user }),
  onUnload: () => dispatch({ type: CLEAR_PROFILE })
})

const SettingPage = props => {
  const { currentUser, errors, onUnload, updateProfile } = props
  const [user, setUser] = useState(currentUser)

  useEffect(() => onUnload)

  const onInputChange = event => {
    const targetValue = event.target.value
    const targetName = event.target.name

    setUser({ ...user, [targetName]: targetValue })
  }

  const onHandleSubmit = event => {
    event.preventDefault()
    updateProfile(user)
  }

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
                    onChange={onInputChange} />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg"
                    name="username"
                    type="text"
                    placeholder="Your Name"
                    value={user.username}
                    onChange={onInputChange} />
                </fieldset>
                <fieldset className="form-group">
                  <textarea className="form-control form-control-lg"
                    name="bio"
                    rows="8"
                    placeholder="Short bio about you"
                    value={user.bio}
                    onChange={onInputChange}></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg"
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={user.email}
                    onChange={onInputChange} />
                </fieldset>
                <fieldset className="form-group">
                  <input className="form-control form-control-lg"
                    name="password"
                    type="password"
                    placeholder="Your new password"
                    onChange={onInputChange} />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right" onClick={onHandleSubmit}>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage) 