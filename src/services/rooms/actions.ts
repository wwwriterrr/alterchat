import { createAsyncThunk } from "@reduxjs/toolkit";
import { BackendUrl } from "../../core/constants";
import { AppFetch } from "../api";
import { TRoom } from "../../core/types";
import { setActiveRoom, setRooms, setRoomsMore } from "./slice";
import { RootState } from "../store";

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

export type TRoomsExternalActions = ReturnType<typeof RoomsFetch> |
    ReturnType<typeof RoomsSelect>
