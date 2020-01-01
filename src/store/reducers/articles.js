import * as types from '../constant'

const initialState = [
  {
    slug: "how-to-train-your-dragon",
    title: "How to train your dragon",
    description: "Ever wonder how?",
    body: "It takes a Jacobian",
    tagList: ["dragons", "training"],
    createdAt: "2016-02-18T03:22:56.637Z",
    updatedAt: "2016-02-18T03:48:35.824Z",
    favorited: false,
    favoritesCount: 0,
    author: {
      username: "jake",
      bio: "I work at statefarm",
      image: "https://i.stack.imgur.com/xHWG8.jpg",
      following: false
    }
  },
  {
    slug: "how-to-train-your-dragon",
    title: "How to train your dragon",
    description: "Ever wonder how?",
    body: "It takes a Jacobian",
    tagList: ["dragons", "training"],
    createdAt: "2016-02-18T03:22:56.637Z",
    updatedAt: "2016-02-18T03:48:35.824Z",
    favorited: false,
    favoritesCount: 0,
    author: {
      username: "jake",
      bio: "I work at statefarm",
      image: "https://i.stack.imgur.com/xHWG8.jpg",
      following: false
    }
  }
]

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ARTICLES:
      return [ ...state, action.article ]
    default:
      return state
  }
}