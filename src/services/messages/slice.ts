import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type TMessage, WebsocketStatus } from '../../core/types';
import { MessagesFetch } from './actions';

export type TMessagesStore = {
    status: WebsocketStatus,
    messages: TMessage[],
    contextMessage: number | null,
    selectedMessages: number[],
    editedMessage: TMessage | null,
    connectionError: string | null,
    more: boolean,
    messagesLoad: boolean,
}

export type TMessagesResponse = {
    messages: TMessage[],
    more: boolean,
}

export type TWsMessage = {
    message: {
        msg?: TMessage,
        event: 'new_msg' | 'read_msg' | 'upd_msg' | 'rm_msg',
        msg_id?: number,
        room_id?: number,
    }
}

const initialState: TMessagesStore = {
    status: WebsocketStatus.OFFLINE,
    messages: [],
    contextMessage: null,
    selectedMessages: [],
    editedMessage: null,
    connectionError: null,
    more: false,
    messagesLoad: false,
}

export const MessagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
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
            state.more = action.payload;
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
        getMessages: state => state.messages,
        getMessagesError: state => state.connectionError,
        getMessagesWsStatus: state => state.status,
        getMessagesMore: state => state.more,
        getMessagesLoad: state => state.messagesLoad,
        getContextMessage: state => state.contextMessage,
        getEditedMessage: state => state.editedMessage,
        getSelectedMessages: state => state.selectedMessages,
    },
    extraReducers: builder => {
        builder
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

export const {
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
} = MessagesSlice.actions;

export const {
    getMessages,
    getMessagesError,
    getMessagesWsStatus,
    getMessagesMore,
    getMessagesLoad,
    getContextMessage,
    getEditedMessage,
    getSelectedMessages,
} = MessagesSlice.selectors;

export type TMessagesWsInternalActions = ReturnType<typeof MessagesSlice.actions[keyof typeof MessagesSlice.actions]>;
