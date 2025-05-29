import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type TWsActionTypes<S, R> = {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    sendMessage?: ActionCreatorWithPayload<S>;
    onConnecting?: ActionCreatorWithoutPayload;
    onOpen?: ActionCreatorWithoutPayload;
    onClose?: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<R>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <S, R>(
    wsActions: TWsActionTypes<S, R>,
    withTokenRefresh: boolean = false
): Middleware<NonNullable<unknown>, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;
        const {
            connect,
            sendMessage,
            onOpen,
            onClose,
            onError,
            onMessage,
            onConnecting,
            disconnect,
        } = wsActions;
        let isConnected = false;
        let reconnectTimer = 0;
        let url = '';
        
        return (next) => (action) => {
            const {dispatch} = store;

            if(connect.match(action)){
                url = action.payload;
                socket = new WebSocket(url);
                isConnected = true;
                onConnecting && dispatch(onConnecting());

                socket.onopen = () => {
                    onOpen && dispatch(onOpen());
                }

                socket.onerror = () => {
                    dispatch(onError('Error with socket connect'))
                }

                socket.onmessage = (event) => {
                    const {data} = event;

                    try{
                        const parsedData = JSON.parse(data);

                        if (withTokenRefresh && parsedData.message === 'Invalid or missing token') {
                            const refreshToken = localStorage.getItem('refreshToken');

                            if(!refreshToken) {
                                dispatch(disconnect());

                                return;
                            }

                            // api.RefreshToken(refreshToken)
                            //     .then(refreshData => {
                            //         const wssUrl = new URL(url);
                            //         wssUrl.searchParams.set(
                            //             "token",
                            //             refreshData.replace('Bearer ', '')
                            //         );
                            //         dispatch(connect(wssUrl.toString()));
                            //     })
                            //     .catch(err => {
                            //         dispatch(onError((err as Error).message));
                            //     });
                        
                            dispatch(disconnect());

                            return;
                        }

                        onMessage && dispatch(onMessage(parsedData));
                        // onMessage.length && onMessage.map(f => {
                        //     f && dispatch(f(parsedData));
                        // })
                    } catch (err) {
                        dispatch(onError((err as Error).message));
                    }
                }

                socket.onclose = () => {
                    onClose && dispatch(onClose());

                    if(isConnected){
                        reconnectTimer = window.setTimeout(() => {
                            const wsUrl = new URL(url);
                            if(wsUrl.searchParams.get('token')){
                                const token = localStorage.getItem('access');
                                if(token){
                                    wsUrl.searchParams.set('token', token);
                                }
                            }
                            dispatch(connect(wsUrl.toString()));
                        }, RECONNECT_PERIOD);
                    }
                }
            }

            if(socket && sendMessage?.match(action)) {
                try{
                    socket.send(JSON.stringify(action.payload));
                } catch (err) {
                    dispatch(onError((err as Error).message));
                }
            }

            if(socket && disconnect.match(action)){
                clearTimeout(reconnectTimer);
                isConnected = false;
                reconnectTimer = 0;
                socket.close();
                socket = null;
            }

            next(action);
        }
    }
}
