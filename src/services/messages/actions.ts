import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { BackendUrl } from '../../core/constants';
import { AppFetch } from '../api';
import { TMessage } from '../../core/types';
import { setMessages, setMessagesMore } from './slice';
// import { BackendUrl } from '../../core/constants';
// import { setMessages, setMessagesMore, type TMessagesResponse } from './slice';
// import axios, { AxiosRequestConfig } from 'axios';
// import { TFile } from '../../core/types';

export const messagesWsConnect = createAction<string, 'MESSAGES_CONNECT'>('MESSAGES_CONNECT');

export const messagesWsDisconnect = createAction('MESSAGES_DISCONNECT');

export type TMessagesWsExternalActions = ReturnType<typeof messagesWsConnect> | ReturnType<typeof messagesWsDisconnect>;

export const MessagesFetch = createAsyncThunk(
    'messages/fetchMessages',
    async ({roomId}: {roomId: number}, {rejectWithValue, dispatch}) => {
        try{
            const url = new URL(`${BackendUrl}/rooms/${roomId}/`);

            const response = await AppFetch(url, {
                method: 'get',
            })

            if(!response.ok){
                return rejectWithValue('Error with fetch messages');
            }

            const data: {messages: TMessage[], more: boolean} = await response.json();

            dispatch(setMessages(data.messages));
            dispatch(setMessagesMore(data.more));

            return;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)

// export const sendMessage = createAsyncThunk(
//     'messages/sendMessage',
//     async ({taskId, content, attach}: {taskId: number, content: string, attach?: number[]}, {rejectWithValue}) => {
//         try{
            
//         }catch (err) {
//             return rejectWithValue(err);
//         }
//     }
// )

// export const editMessage = createAsyncThunk(
//     'messages/editMessage',
//     async ({messageId, content, attach}: {messageId: number, content: string, attach?: number[]}, {rejectWithValue}) => {
//         try{
            
//         }catch (err) {
//             return rejectWithValue(err);
//         }
//     }
// )

// export const removeMessages = createAsyncThunk(
//     'messages/removeMessages',
//     async ({messageIds}: {messageIds: number[]}, {rejectWithValue}) => {
//         try{
            
//         }catch (err) {
//             return rejectWithValue(err);
//         }
//     }
// )
