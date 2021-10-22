import { isSuccess, isFailure } from 'common/util'

export const actionTypes = {
  GET_POSTS: '[Posts] Get all Posts',
  ADD_USERNAME: '[Posts] Add Usernames',
  CREATE_POST: '[Posts] Create Posts',
  ADD_LIKE: '[Posts] Add like to post',
  UPLOAD_IMAGE: '[Posts] Upload Image to KV',
}

export const actions = {
  getAllPosts: () => ({
    type: actionTypes.GET_POSTS,
    notify: 'Your post has been successfully posted',
  }),
  getAllPostsSuccess: (posts) => ({
    type: isSuccess(actionTypes.GET_POSTS),
    posts,
  }),
  getAllPostsFailure: (error) => ({
    type: isFailure(actionTypes.GET_POSTS),
    error,
  }),
  addUserNames: (userName) => ({
    type: isSuccess(actionTypes.ADD_USERNAME),
    userName,
  }),
  addPost: (postDetails) => ({
    type: actionTypes.CREATE_POST,
    postDetails,
  }),
  addPostSuccess: (post) => ({
    type: isSuccess(actionTypes.CREATE_POST),
    post,
  }),
  addPostFailure: (error) => ({
    type: isFailure(actionTypes.CREATE_POST),
    error,
  }),
  incrementLike: (postKey) => ({
    type: actionTypes.ADD_LIKE,
    postKey,
  }),
  incrementLikeSuccess: (post) => ({
    type: isSuccess(actionTypes.ADD_LIKE),
    post,
  }),
  incrementLikeFailure: (error) => ({
    type: isFailure(actionTypes.ADD_LIKE),
    error,
  }),
  uploadImage: (image, title, userName) => ({
    type: actionTypes.UPLOAD_IMAGE,
    image,
    title,
    userName,
  }),
  uploadImageSuccess: (post) => ({
    type: isSuccess(actionTypes.UPLOAD_IMAGE),
    postDetails: post,
  }),
  uploadImageFailure: (error) => ({
    type: isFailure(actionTypes.UPLOAD_IMAGE),
    error,
  }),
}

export const initialState = {
  all: {},
  userName: '',
}

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case isSuccess(actionTypes.GET_POSTS):
      return {
        ...state,
        all: action.posts
          .map((post) => {
            const key = post.key
            return {
              [key]: {
                ...state.all[key],
                ...post,
              },
            }
          })
          .reduce(
            (accumulator, current) => ({
              ...accumulator,
              ...current,
            }),
            state.all
          ),
      }

    case isSuccess(actionTypes.ADD_USERNAME):
      return {
        ...state,
        userName: action.userName,
      }
    case isSuccess(actionTypes.ADD_LIKE):
    case isSuccess(actionTypes.CREATE_POST):
      const key = action.post.key
      return {
        ...state,
        all: {
          ...state.all,
          [key]: action.post,
        },
      }
    default:
      return state
  }
}
