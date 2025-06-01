import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { BackendUrl } from "../../core/constants";
import { AppFetch } from "../api";
import { TRoom } from "../../core/types";
import { setActiveRoom, setRooms, setRoomsMore } from "./slice";
import { RootState } from "../store";
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
            const url = new URL(`${BackendUrl}/rooms/${roomId}/messages/`);

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


export const RoomsSelect = createAsyncThunk(
    'rooms/select', 
    async (roomId: number, {rejectWithValue, dispatch, getState}) => {
        try{
            const room = (getState() as RootState).rooms.rooms.find(item => item.id === roomId);

            if(!room){
                return rejectWithValue('404');
            }

            console.log(room);

            dispatch(setActiveRoom(room));
        }catch (err) {
            return rejectWithValue(err);
        }
    }
)

export const RoomsFetch = createAsyncThunk(
    'rooms/fetch',
    async (_, {rejectWithValue, dispatch}) => {
        try{
            const url = `${BackendUrl}/rooms/`;

            const response = await AppFetch(url, {
                method: 'get',
            })

            if(!response.ok){
                return rejectWithValue(`Error with fetch rooms: status ${response.status}`)
            }

            const data: {rooms: TRoom[], more: boolean} = await response.json();

            dispatch(setRooms(data.rooms));
            dispatch(setRoomsMore(data.more));

            return
        } catch (err) {
            return rejectWithValue(`Error with fetch rooms: ${(err as Error).message}`)
        }
    }
)

export const RoomFetch = createAsyncThunk(
    'rooms/roomFetch', 
    async ({roomId}: {roomId: number}) => {
        console.log('Room fetch', roomId);
    }
)

export const RoomCheck = createAsyncThunk(
    'rooms/check',
    async ({userId}: {userId: number}, {rejectWithValue}) => {
        try{
            const url = `${BackendUrl}/rooms/check/`;

            const response = await AppFetch(url, {
                method: 'post',
            })

            return;
        } catch (err) {
            return rejectWithValue(`Error with check room: ${(err as Error).message}`)
        }
    }
)

export type TRoomsExternalActions = ReturnType<typeof RoomsFetch> |
    ReturnType<typeof RoomsSelect> |
    ReturnType<typeof RoomFetch> |
    ReturnType<typeof RoomCheck>
