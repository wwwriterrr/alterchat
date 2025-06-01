import { createAsyncThunk } from '@reduxjs/toolkit'
import { BackendUrl } from '../../core/constants';
import { AppFetch } from '../api';
import { setAutocompleteError, setAutocompleteItems, setAutocompleteMore, TAcItems } from './slice';

export const AutocompleteFetch = createAsyncThunk(
    'autocomplete/fetch',
    async ({param, q, signal}: {param: string, q: string, signal?: AbortSignal}, {rejectWithValue, dispatch}) => {
        try{
            const url = new URL(`${BackendUrl}/autocomplete/${param}/`);
            url.searchParams.set('q', q);

            const params: {signal?: AbortSignal} = {};
            if(signal){
                params.signal = signal;
            }

            const response = await AppFetch(url, params);

            if(!response.ok){
                const msg = `Error with autocomplete request. Status: ${response.status}`;
                dispatch(setAutocompleteError(msg));
                return rejectWithValue(msg);
            }

            if(!response.ok){
                return rejectWithValue('Error with fetch messages');
            }

            const data: {objects: TAcItems, more: boolean} = await response.json();

            dispatch(setAutocompleteItems(data.objects));
            dispatch(setAutocompleteMore(data.more));

            return;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

export type TAcExternalActions = ReturnType<typeof AutocompleteFetch>
