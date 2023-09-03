import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './rootReducer'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { authServices, categoryServices, tagServices, blogServices } from './services/apiSlice'
const persistConfig = {
  key: 'codegyaan',
  blacklist: ['authServices', 'categoryServices', 'tagServices', 'blogServices', 'loader'],
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(authServices.middleware, categoryServices.middleware, tagServices.middleware, blogServices.middleware)
})

setupListeners(store.dispatch)
const persistor = persistStore(store)
export { store, persistor }
export type RootState = ReturnType<typeof store.getState>
