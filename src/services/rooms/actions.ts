import { createAsyncThunk } from "@reduxjs/toolkit";
import { BackendUrl } from "../../core/constants";
import { AppFetch } from "../api";
import { TRoom } from "../../core/types";
import { setRooms } from "./slice";


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

            return
        } catch (err) {
            return rejectWithValue(`Error with fetch rooms: ${(err as Error).message}`)
        }
    }
)

export type TRoomsExternalActions = ReturnType<typeof RoomsFetch>
