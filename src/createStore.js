import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

export default () => {

  const persistConfig = {
    key: 'quiz-app',
    storage,
    blacklist: ['notifications']
  }

  let store = createStore(
    persistReducer(persistConfig, rootReducer),
    compose(
      applyMiddleware(thunk),
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
  let persistor = persistStore(store)
  return { store, persistor }
}

