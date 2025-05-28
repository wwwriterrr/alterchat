import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type TRoom } from "../../core/types"
import { RoomsFetch } from "./actions"


type TRoomsInitialState = {
    loading: boolean,
    rooms: (TRoom & {draft?: string})[],
    more: boolean,
    activeRoom: TRoom | null,
}

const initialState: TRoomsInitialState = {
    loading: false,
    rooms: [],
    more: false,
    activeRoom: null,
}

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setRooms: (state, action: PayloadAction<TRoom[]>) => {
            state.rooms = action.payload;
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
    }
})

export default roomsSlice.reducer;

export const {
    getRooms,
    getRoom,
    getRoomsLoading,
    getRoomsMore,
    getActiveRoom,
} = roomsSlice.selectors;

export const {
    setRooms,
    setRoomsMore,
    setRoomDraft,
    setActiveRoom,
    selectRoom,
} = roomsSlice.actions;

export type TRoomsInternalActions = ReturnType<typeof roomsSlice.actions[keyof typeof roomsSlice.actions]>
