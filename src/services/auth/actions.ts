import { createAsyncThunk } from "@reduxjs/toolkit"

export const CheckAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, {rejectWithValue}) => {
        try{
            const access = localStorage.getItem('access');
            const refresh = localStorage.getItem('refresh');

            if(!access || !refresh){
                return rejectWithValue(`Error with auth check: token is missing`);
            }

            
        } catch (err) {
            return rejectWithValue(`Error with auth check: ${(err as Error).message}`);
        }
    }
)

export type TAuthExternalActions = ReturnType<typeof CheckAuth>
