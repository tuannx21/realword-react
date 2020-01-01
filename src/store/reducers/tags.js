import * as types from '../constant'

const initialState = ["butt", "test", "dragons", "training", "tags", "as", "coffee", "animation", "baby",]

export default (state = initialState, action) => {
  switch (action.type) {
    // case types.FETCH_ARTICLES:
    //   return [ ...state, action.articles ]
    default:
      return state
  }
}