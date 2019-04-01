import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
let composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default () => {

  const persistConfig = {
    key: 'quiz-app',
    storage,
    blacklist: ['notifications', 'userTesting', 'statuses', 'success', 'loading','error']
  }
  let store = createStore(
    persistReducer(persistConfig, rootReducer),
    composeEnchancers(
      applyMiddleware(thunk)
    )
  )
  let persistor = persistStore(store)
  return { store, persistor }
}

