import {combineReducers, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { authSlice, TAuthInternalActions } from './auth/slice';
import { roomsSlice, TRoomsInternalActions } from './rooms/slice';
// import { TAuthExternalActions } from './auth/actions';
// import { 
//     MessagesSlice, 
//     // TMessagesResponse, 
//     TMessagesWsInternalActions, 
//     TWsMessage, 
//     wsClose, 
//     wsConnecting, 
//     wsError, 
//     wsMessage, 
//     wsOpen,
// } from './messages/slice';
// import { socketMiddleware } from './middleware/socketMiddleware';
// import { 
//     messagesWsConnect, 
//     messagesWsDisconnect, 
//     TMessagesWsExternalActions 
// } from './messages/actions';

export const rootReducer = combineReducers({
    [authSlice.reducerPath]: authSlice.reducer,
    [roomsSlice.reducerPath]: roomsSlice.reducer,
})

// const messagesMiddleware = socketMiddleware<unknown, TWsMessage>({
//     connect: messagesWsConnect,
//     disconnect: messagesWsDisconnect,
//     onConnecting: wsConnecting,
//     onOpen: wsOpen,
//     onClose: wsClose,
//     onError: wsError,
//     onMessage: wsMessage,
// })

export const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false,
    // }).concat(messagesMiddleware)
})

type TApplicationActions = TAuthInternalActions | TRoomsInternalActions;

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();