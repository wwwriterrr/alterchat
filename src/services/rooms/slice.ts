import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { TMessage, WebsocketStatus, type TRoom } from "../../core/types"
import { RoomsFetch } from "./actions"
import { MessagesFetch } from "../rooms/actions"
import { AppUtils } from "../../core/utils"

type TRoomsInitialState = {
    loading: boolean,
    rooms: (TRoom & {draft?: string})[],
    more: boolean,
    activeRoom: TRoom | null,

    status: WebsocketStatus,
    messages: TMessage[],
    contextMessage: number | null,
    selectedMessages: number[],
    editedMessage: TMessage | null,
    connectionError: string | null,
    msgMore: boolean,
    messagesLoad: boolean,
}

export type TMessagesResponse = {
    messages: TMessage[],
    more: boolean,
}

export type TWsMessage = {
    message: {
        msg?: TMessage,
        event: 'new_msg' | 'read_msg' | 'upd_msg' | 'rm_msg' | 'new_room' | 'upd_room' | 'rm_room',
        msg_id?: number,
        room_id?: number,
        room?: TRoom,
    }
}

const initialState: TRoomsInitialState = {
    loading: false,
    rooms: [],
    more: false,
    activeRoom: null,

    status: WebsocketStatus.OFFLINE,
    messages: [],
    contextMessage: null,
    selectedMessages: [],
    editedMessage: null,
    connectionError: null,
    msgMore: false,
    messagesLoad: false,
}

const sortRooms = (rooms: TRoom[]) => {
    rooms.sort((a,b) => (b.dt_modified || b.dt_created) - (a.dt_modified || a.dt_created));

    return rooms;
}

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setRooms: (state, action: PayloadAction<TRoom[]>) => {
            const rooms = action.payload;

            state.rooms = sortRooms(rooms);
        },
        addRooms: (state, action: PayloadAction<TRoom[]>) => {
            const rooms = [...state.rooms, ...action.payload];

            state.rooms = sortRooms(rooms);
        },
        updateRoom: (state, action: PayloadAction<{id: number, room?: TRoom, dt?: number, msg?: string | null,}>) => {
            if(action.payload.room){
                const rooms = Array.from(state.rooms);
                const r = rooms.find(item => item.id === action.payload.room?.id);
                if(r){
                    const index = rooms.indexOf(r);
                    rooms.splice(index, 1, action.payload.room);

                    state.rooms = sortRooms(rooms);
                }else{
                    rooms.push(action.payload.room);

                    state.rooms = sortRooms(rooms);
                }
            }else{
                if(state.rooms.find(item => item.id === action.payload.id)){
                    const rooms = Array.from(state.rooms);
                    const r = rooms.find(item => item.id === action.payload.id)!;

                    if(typeof action.payload.dt !== 'undefined'){
                        r.dt_modified = action.payload.dt;
                    }

                    if(typeof action.payload.msg !== 'undefined'){
                        r.last_msg = action.payload.msg;
                    }

                    state.rooms = sortRooms(rooms);
                }
            }
        },
        setRoomsMore: (state, action: PayloadAction<boolean>) => {
            state.more = action.payload;
        },
        setActiveRoom: (state, action: PayloadAction<TRoom | null>) => {
            state.activeRoom = action.payload;
        },
        setRoomDraft: (state, action: PayloadAction<{roomId: number, draft: string | undefined}>) => {
            const room = state.rooms.find(item => item.id === action.payload.roomId);

            if(room){
                room.draft = action.payload.draft;
            }
        },
        selectRoom: (state, action: PayloadAction<number>) => {
            const room = state.rooms.find(item => item.id === action.payload);

            if(!room) return;

            state.activeRoom = room;
        },

        // Messages
        wsConnecting: (state) => {
            state.status = WebsocketStatus.CONNECTING;
        },
        wsOpen: (state) => {
            state.status = WebsocketStatus.ONLINE;
            state.connectionError = null;
        },
        wsClose: (state) => {
            state.status = WebsocketStatus.OFFLINE;
        },
        wsError: (state, action) => {
            state.connectionError = action.payload;
        },
        wsMessage: (state, action: PayloadAction<TWsMessage>) => {
            // state.messages = action.payload.messages;
            if(action.payload.message.event === 'new_msg'){
                const msg = action.payload.message.msg;

                if(msg){
                    if(state.activeRoom?.id === msg.room_id){
                        if(!state.messages.find(item => item.id === msg.id)){
                            state.messages = [...state.messages, msg];
                        }
                    }

                    const rooms = Array.from(state.rooms);
                    const r = rooms.find(item => item.id === action.payload.message.msg?.room_id);
                    if(r){
                        r.dt_modified = msg.dt_modified || msg.dt_created;
                        r.last_msg = AppUtils.stripTags(msg.content);

                        state.rooms = sortRooms(rooms);
                    }
                }
            }else if(action.payload.message.event === 'upd_msg'){
                
            }else if(action.payload.message.event === 'rm_msg'){
                
            }
        },
        setMessages: (state, action: PayloadAction<TMessage[]>) => {
            state.messages = action.payload.reverse();
        },
        addMessages: (state, action: PayloadAction<TMessage[]>) => {
            state.messages = [...state.messages, ...action.payload.reverse()]
        },
        setMessagesMore: (state, action: PayloadAction<boolean>) => {
            state.msgMore = action.payload;
        },
        
        setContextMessage: (state, action: PayloadAction<number | null>) => {
            state.contextMessage = action.payload;
        },
        setEditedMessage: (state, action: PayloadAction<TMessage | null>) => {
            state.editedMessage = action.payload;
        },
        setSelectedMessages: (state, action: PayloadAction<number[]>) => {
            state.selectedMessages = action.payload;
        },
        toggleSelectedMessages: (state, action: PayloadAction<number>) => {
            const index = state.selectedMessages.indexOf(action.payload);

            if(index === -1){
                state.selectedMessages = [...state.selectedMessages, action.payload];
            }else{
                state.selectedMessages.splice(index, 1);
            }
        },
        addSelectedMessages: (state, action: PayloadAction<number[]>) => {
            state.selectedMessages = [...state.selectedMessages, ...action.payload];
        },
    },
    selectors: {
        getRooms: state => state.rooms,
        getRoom: (state, action: PayloadAction<number>) => {
            const room = state.rooms.find(item => item.id === action.payload);
            return room || null;
        },
        getRoomsLoading: state => state.loading,
        getRoomsMore: state => state.more,
        getActiveRoom: state => state.activeRoom,

        // Messages
        getMessages: state => state.messages,
        getMessagesError: state => state.connectionError,
        getMessagesWsStatus: state => state.status,
        getMessagesMore: state => state.msgMore,
        getMessagesLoad: state => state.messagesLoad,
        getContextMessage: state => state.contextMessage,
        getEditedMessage: state => state.editedMessage,
        getSelectedMessages: state => state.selectedMessages,
    },
    extraReducers: (builder) => {
        builder
            .addCase(RoomsFetch.pending, (state) => {
                state.loading = true;
            })
            .addCase(RoomsFetch.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(RoomsFetch.rejected, (state) => {
                state.loading = false;
            })

            // Fetch messages
            .addCase(MessagesFetch.pending, (state) => {
                state.messagesLoad = true;
            })
            .addCase(MessagesFetch.fulfilled, (state) => {
                state.messagesLoad = false;
            })
            .addCase(MessagesFetch.rejected, (state) => {
                state.messagesLoad = false;
            })
    }
})

export default roomsSlice.reducer;

export const {
    getRooms,
    getRoom,
    getRoomsLoading,
    getRoomsMore,
    getActiveRoom,
    // Messages
    getMessages,
    getMessagesError,
    getMessagesWsStatus,
    getMessagesMore,
    getMessagesLoad,
    getContextMessage,
    getEditedMessage,
    getSelectedMessages,
} = roomsSlice.selectors;

export const {
    setRooms,
    addRooms,
    updateRoom,
    setRoomsMore,
    setRoomDraft,
    setActiveRoom,
    selectRoom,
    // Messages
    wsConnecting, 
    wsOpen, 
    wsClose,
    wsError, 
    wsMessage,
    setMessages,
    addMessages,
    setMessagesMore,
    setContextMessage,
    setEditedMessage,
    setSelectedMessages,
    toggleSelectedMessages,
    addSelectedMessages,
} = roomsSlice.actions;

export type TRoomsInternalActions = ReturnType<typeof roomsSlice.actions[keyof typeof roomsSlice.actions]>
