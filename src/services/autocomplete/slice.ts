import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type TRoom, type TUser } from '../../core/types'
import { AutocompleteFetch } from './actions'

export type TAcItem = {
    id: number,
    name: string,
}

export type TAcItems = TRoom[] | TUser[] | TAcItem[]

interface TAcInitialState <R>{
    items: R,
    more: boolean,
    loading: boolean,
    error: string,
}

const initialState: TAcInitialState<TAcItems> = {
    items: [],
    more: false,
    loading: false,
    error: '',
}

export const autocompleteSlice = createSlice({
    name: 'autocomplete',
    initialState,
    reducers: {
        setAutocompleteItems: (state, action: PayloadAction<TAcItems>) => {
            state.items = action.payload;
        },
        setAutocompleteMore: (state, action: PayloadAction<boolean>) => {
            state.more = action.payload;
        },
        setAutocompleteError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
    selectors: {
        getAutocompleteItems: state => state.items,
        getAutocompleteMore: state => state.more,
        getAutocompleteError: state => state.error,
        getAutocompleteLoading: state => state.loading,
    },
    extraReducers: builder => {
        builder
            // Autocomplete fetch
            .addCase(AutocompleteFetch.pending, (state) => {
                state.loading = true;
            })
            .addCase(AutocompleteFetch.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(AutocompleteFetch.rejected, (state) => {
                state.loading = false;
            })
    }
})

export default autocompleteSlice.reducer;

export const {
    setAutocompleteItems,
    setAutocompleteMore,
    setAutocompleteError,
} = autocompleteSlice.actions;

export const {
    getAutocompleteItems,
    getAutocompleteMore,
    getAutocompleteError,
    getAutocompleteLoading,
} = autocompleteSlice.selectors;

export type TAcInternalActions = ReturnType<typeof autocompleteSlice.actions[keyof typeof autocompleteSlice.actions]>
