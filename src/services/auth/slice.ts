import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type TUser } from '../../core/types'
import { CheckAuth } from './actions'

type TSliceUser = TUser & {access?: string | null, refresh?: string | null}

type TAuthInitialState = {
    loading: boolean,
    authChecked: boolean,
    user: TSliceUser | null,
}

const initialState: TAuthInitialState = {
    loading: false,
    authChecked: false,
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<TSliceUser>) => {
            state.user = action.payload;
        },
        setTokens: (state, action: PayloadAction<{accessToken: string, refreshToken: string}>) => {
            if(state.user){
                state.user.access = action.payload.accessToken;
                state.user.refresh = action.payload.refreshToken;
            }
            localStorage.setItem('access', action.payload.accessToken);
            localStorage.setItem('refresh', action.payload.refreshToken);
        },
    },
    selectors: {
        getUser: state => state.user,
        getAuthChecked: state => state.authChecked,
        getTokens: state => { return {accessToken: state.user?.access, refreshToken: state.user?.refresh} },
    },
    extraReducers: (builder) => {
        builder
            .addCase(CheckAuth.fulfilled, (state) => {
                state.authChecked = true;
            })
            .addCase(CheckAuth.rejected, (state) => {
                state.authChecked = true;
            })
            
    }
})

export default authSlice.reducer;

export const {
    getUser,
    getAuthChecked,
    getTokens,
} = authSlice.selectors;

export const {
    setUser,
    setTokens,
} = authSlice.actions;

export type TAuthInternalActions = ReturnType<typeof authSlice.actions[keyof typeof authSlice.actions]>;
