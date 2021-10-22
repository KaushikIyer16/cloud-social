import { all } from 'redux-saga/effects'
import postSagas from 'home/sagas'

const sagasToListenTo = [...postSagas]

export default function* mainSaga() {
  yield all(sagasToListenTo)
}
