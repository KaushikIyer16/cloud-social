import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import postReducers, { initialState as postInitialState } from 'home/ducks'
import createSagaMiddleware from 'redux-saga'
import mainSaga from './sagas'
import logger from 'redux-logger'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, logger]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
  posts: postReducers,
})

const initialState = {
  ...postInitialState,
}

export default function setup() {
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )
  sagaMiddleware.run(mainSaga)
  return store
}
