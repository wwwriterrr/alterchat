import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { BackendUrl } from "../../core/constants";
import { AppFetch } from "../api";
import { TRoom, TUser } from "../../core/types";
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
            if(roomId === 0){
                return rejectWithValue('Error with fetch empty room');
            }

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

export const MessagesSend = createAsyncThunk(
    'messages/send',
    async ({roomId, content, userId}: {roomId: number, content: string, userId?: number}, {rejectWithValue}) => {
        try{
            const url = new URL(`${BackendUrl}/rooms/${roomId}/messages/`);

            if(!content){
                return rejectWithValue('Content is required');
            }

            if(roomId === 0 && !userId){
                return rejectWithValue('User ID is required');
            }

            const requestBody: {content: string, user_id?: number} = {content};

            if(roomId === 0){
                requestBody.user_id = userId;
            }

            const response = await AppFetch(url, {
                method: 'post',
                body: JSON.stringify(requestBody),
            })

            if(!response.ok){
                return rejectWithValue('Error with send messages');
            }

            const data: {room_id: number} = await response.json();

            return data.room_id;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

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
                body: JSON.stringify({
                    user_id: userId,
                })
            })

            if(!response.ok){
                if(response.status === 404){
                    const data: {detail: string, members: TUser[]} = await response.json();
                    const fakeRoom: TRoom = {
                        id: 0,
                        dt_created: Math.floor(Date.now() / 1000),
                        title: null,
                        description: null,
                        avatar: null,
                        last_msg: null,
                        dt_modified: null,
                        members: data.members,
                    }
                    return {status: response.status, room: fakeRoom};
                }else{
                    return rejectWithValue(`Error with check room`);
                }
            }

            const data: {room: TRoom} = await response.json();

            return {status: response.status, room: data.room};
        } catch (err) {
            return rejectWithValue(`Error with check room: ${(err as Error).message}`)
        }
    }
)

export const RoomRemove = createAsyncThunk(
    'rooms/remove',
    async ({roomId}: {roomId: number}, {rejectWithValue}) => {
        try{
            const url = `${BackendUrl}/rooms/${roomId}/`;

            const response = await AppFetch(url, {
                method: 'delete',
            })

            if(!response.ok){
                return rejectWithValue('Error with remove room');
            }

            return;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

export type TRoomsExternalActions = ReturnType<typeof RoomsFetch> |
    ReturnType<typeof RoomsSelect> |
    ReturnType<typeof RoomFetch> |
    ReturnType<typeof RoomCheck> | 
    ReturnType<typeof RoomRemove> | 

    ReturnType<typeof MessagesFetch> | 
    ReturnType<typeof MessagesSend>
