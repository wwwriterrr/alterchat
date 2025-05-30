import {combineReducers, configureStore, ThunkDispatch} from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { authSlice, TAuthInternalActions } from './auth/slice'
import { 
    roomsSlice, TRoomsInternalActions,
    TWsMessage, wsClose, wsConnecting, wsError, wsMessage, wsOpen,
} from './rooms/slice'
import { editorSlice, TEditorInternalActions } from './editor/slice'
import { socketMiddleware } from './middleware/socketMiddleware'
import { messagesWsConnect, messagesWsDisconnect, TMessagesWsExternalActions } from './rooms/actions'
import { modalSlice, TModalInternalActions } from './modal/slice'
import { TModalExternalActions } from './modal/actions'

export const rootReducer = combineReducers({
    [authSlice.reducerPath]: authSlice.reducer,
    [roomsSlice.reducerPath]: roomsSlice.reducer,
    [editorSlice.reducerPath]: editorSlice.reducer,
    [modalSlice.reducerPath]: modalSlice.reducer,
    // [MessagesSlice.reducerPath]: MessagesSlice.reducer,
})

const messagesMiddleware = socketMiddleware<unknown, TWsMessage>({
    connect: messagesWsConnect,
    disconnect: messagesWsDisconnect,
    onConnecting: wsConnecting,
    onOpen: wsOpen,
    onClose: wsClose,
    onError: wsError,
    onMessage: wsMessage,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(messagesMiddleware)
})

type TApplicationActions = TAuthInternalActions | 
    TRoomsInternalActions | 
    TEditorInternalActions | 
    // TMessagesWsInternalActions | 
    TMessagesWsExternalActions | 
    TModalInternalActions

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();