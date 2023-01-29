// Redux
import { configureStore, combineReducers } from '@reduxjs/toolkit'
// Reducers
import categoryReducer from './slices/categories';
import productReducer from './slices/products'
// Storage
import AsyncStorage from '@react-native-async-storage/async-storage'
// Redux Persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

const rootReducer = combineReducers({
  appCategory: categoryReducer,
  appProduct: productReducer,
})


const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch