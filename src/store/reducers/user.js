import { GET_PROFILE_START, GET_PROFILE_SUCCESS, GET_PROFILE_FAIL, FOLLOW_PROFILE_SUCCESS, UNFOLLOW_PROFILE_SUCCESS, CLEAR_PROFILE } from "../constant"

const initialState = {
  profile: {},
  isLoading: false,
  errors: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_START:
      return { ...state, isLoading: true }
    case GET_PROFILE_SUCCESS:
    case FOLLOW_PROFILE_SUCCESS:
    case UNFOLLOW_PROFILE_SUCCESS:
      return { ...state, isLoading: false, profile: action.data.profile }
    case GET_PROFILE_FAIL:
      return { ...state, isLoading: false, errors: action.errors }
    case CLEAR_PROFILE:
      return { ...state, profile: {} }
    default:
      return state
  }
}