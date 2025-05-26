import { createAsyncThunk } from "@reduxjs/toolkit"
import { BackendUrl } from "../../core/constants";
import { AppFetch } from "../api";
import { setTokens, setUser } from "./slice";

export const CheckAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, {rejectWithValue, dispatch}) => {
        try{
            const access = localStorage.getItem('access');
            const refresh = localStorage.getItem('refresh');

            if(!access || !refresh){
                return rejectWithValue(`Error with auth check: token is missing`);
            }

            const actionData = await dispatch(AuthCheckAccessToken({access}));
            if(actionData.type === AuthCheckAccessToken.rejected.type){
                return rejectWithValue('Error with check token')
            }
            
            const getSelfData = await dispatch(AuthGetSelf());
            if(getSelfData.type === AuthGetSelf.rejected.type){
                return rejectWithValue('Error with fetch self data')
            }

            return;
        } catch (err) {
            return rejectWithValue(`Error with auth check: ${(err as Error).message}`);
        }
    }
)

export const AuthCheckAccessToken = createAsyncThunk(
    'auth/checkAccessToken',
    async ({access}: {access: string}, {rejectWithValue}) => {
        try{
            const url = new URL(`${BackendUrl}/token/verify/`);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({token: access})
            });

            if(!response.ok){
                return rejectWithValue('Error with refresh token')
            }

            return;
        } catch (err) {
            return rejectWithValue('Error with check token')
        }
    }
)

type TSelfResponse = {
    id: number,
    name: string,
    avatar: string,
    url: string,
    balance: number,
    is_staff: boolean,
    groups: string[],
    notif: {
        msg: number,
        ntf: number,
    }
}

export const AuthGetSelf = createAsyncThunk(
    'auth/getSelf',
    async (_, {rejectWithValue, dispatch}) => {
        try{
            const url = new URL(`${BackendUrl}/users/self/`);

            const response = await AppFetch(url, {
                method: 'get',
            })

            if(!response.ok){
                return rejectWithValue('Error with fetch current user')
            }

            const data: TSelfResponse = await response.json();

            dispatch(setUser({id: data.id, name: data.name, username: data.name, avatar: data.avatar, access: localStorage.getItem('access'), refresh: localStorage.getItem('refresh')}));

            return;
        } catch (err) {
            return rejectWithValue('Error with fetch self')
        }
    }
)

export const AuthRefreshToken = createAsyncThunk(
    'auth/refreshToken',
    async ({refresh}: {refresh: string}, {rejectWithValue, dispatch}) => {
        try{
            const url = new URL(`${BackendUrl}/token/refresh/`);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    refresh,
                })
            });

            if(!response.ok){
                return rejectWithValue('Error with refresh token')
            }

            const data: {access: string, refresh: string} = await response.json();

            dispatch(setTokens({accessToken: data.access, refreshToken: data.refresh}));

            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);

            // dispatch(AuthGetSelf());

            return;
        }catch (err){
            return rejectWithValue(err);
        }
    }
)

export const AuthLogin = createAsyncThunk(
    'auth/login',
    async ({login, password}: {login: string, password: string}, {rejectWithValue, dispatch}) => {
        try{
            const url = new URL(`${BackendUrl}/token/`);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    username: login,
                    password,
                })
            });

            if(!response.ok){
                return rejectWithValue(`Ошибка авторизации. Статус: ${response.status}`)
            }

            const data: {access: string, refresh: string} = await response.json();

            // dispatch(setTokens({accessToken: data.access, refreshToken: data.refresh}));
            
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);

            dispatch(AuthGetSelf());

            return
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

export type TAuthExternalActions = ReturnType<typeof CheckAuth> |
    ReturnType<typeof AuthCheckAccessToken> | 
    ReturnType<typeof AuthGetSelf> | 
    ReturnType<typeof AuthRefreshToken> | 
    ReturnType<typeof AuthLogin>
