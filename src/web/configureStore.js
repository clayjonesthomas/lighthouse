import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import lighthouse from './reducers'

export default function configureStore(preloadedState) {
  return createStore(
    lighthouse,
    preloadedState,
    applyMiddleware(
      thunkMiddleware
    )
  )
}