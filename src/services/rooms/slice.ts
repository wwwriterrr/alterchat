import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TRoom } from "../../core/types"
import { RoomsFetch } from "./actions"


type TRoomsInitialState = {
    loading: boolean,
    rooms: TRoom[],
    activeRoom: TRoom | null,
}

const initialState: TRoomsInitialState = {
    loading: false,
    rooms: [],
    activeRoom: null,
}

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setRooms: (state, action: PayloadAction<TRoom[]>) => {
            state.rooms = action.payload;
        },
    },
    selectors: {
        getRooms: state => state.rooms,
        getRoomsLoading: state => state.loading,
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
    getRoomsLoading,
} = roomsSlice.selectors;

export const {
    setRooms,
} = roomsSlice.actions;

export type TRoomsInternalActions = ReturnType<typeof roomsSlice.actions[keyof typeof roomsSlice.actions]>
