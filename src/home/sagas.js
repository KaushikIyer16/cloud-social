import { takeEvery, put } from 'redux-saga/effects'
import { actionTypes, actions } from './ducks'
import { isSuccess } from 'common/util'
import api from 'api'

const postSagas = [
  takeEvery(actionTypes.GET_POSTS, onGetPostData),
  takeEvery(actionTypes.CREATE_POST, onCreatePost),
  takeEvery(actionTypes.UPLOAD_IMAGE, onUploadImage),
  takeEvery(isSuccess(actionTypes.UPLOAD_IMAGE), onCreatePost),
  takeEvery(actionTypes.ADD_LIKE, onIncrementLike),
]

function* onGetPostData(action) {
  try {
    const response = yield api.get(
      'https://cloud-social-runner.kaushikiyer.workers.dev/posts'
    )
    yield put(actions.getAllPostsSuccess(response.data))
  } catch (error) {
    const { response } = error
    yield actions.getAllPostsFailure(response.data)
  }
}

function* onCreatePost(action) {
  try {
    const response = yield api.post(
      'https://cloud-social-runner.kaushikiyer.workers.dev/posts',
      {},
      action.postDetails
    )
    yield put(actions.addPostSuccess(response.data))
  } catch (error) {
    const { response } = error
    yield actions.addPostFailure(response.data)
  }
}

function* onUploadImage(action) {
  try {
    const key = action.userName + '_' + action.title.replaceAll(' ', '_')
    yield api.post(
      `https://cloud-social-runner.kaushikiyer.workers.dev/posts/media/${key}`,
      {
        'Content-Type': 'image/*',
      },
      action.image
    )

    yield put(
      actions.uploadImageSuccess({
        title: action.title,
        username: action.userName,
        content: `https://cloud-social-runner.kaushikiyer.workers.dev/assets/${key}`,
        type: 'IMAGE',
        likes: 0,
      })
    )
  } catch (error) {
    const { response } = error
    yield actions.uploadImageFailure(response.data)
  }
}

function* onIncrementLike(action) {
  try {
    const response = yield api.post(
      'https://cloud-social-runner.kaushikiyer.workers.dev/posts/likes',
      {},
      {
        postKey: action.postKey,
      }
    )

    yield put(actions.incrementLikeSuccess(response.data))
  } catch (error) {
    const { response } = error
    yield actions.incrementLikeFailure(response.data)
  }
}

export default postSagas;