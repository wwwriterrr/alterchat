import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { closeModal } from './actions';

type TModalInitialState = {
    content: JSX.Element | string | null,
    title: JSX.Element | string | null,
    loading: boolean,
    onClose: (() => void) | null,
    modalType: 'justify' | 'flex',
}

const initialState: TModalInitialState = {
    content: null,
    title: null,
    loading: false,
    onClose: null,
    modalType: 'justify',
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModalContent: (state, action: PayloadAction<JSX.Element | string | null>) => {
            state.content = action.payload;
        },
        setModalTitle: (state, action: PayloadAction<JSX.Element | string | null>) => {
            state.title = action.payload;
        },
        setModalLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setOnCloseHandler: (state, action: PayloadAction<(() => void) | null>) => {
            state.onClose = action.payload;
        },
        setModalType: (state, action: PayloadAction<'justify' | 'flex'>) => {
            state.modalType = action.payload;
        },
    },
    selectors: {
        getModalContent: state => state.content,
        getModalTitle: state => state.title,
        getModalLoading: state => state.loading,
        getModalType: state => state.modalType,
    },
    extraReducers: builder => {
        builder
            .addCase(closeModal.fulfilled, (state) => {
                state.onClose?.();

                state.onClose = null;
            })
    }
})

export const {
    setModalContent,
    setModalTitle,
    setModalLoading,
    setOnCloseHandler,
    setModalType,
} = modalSlice.actions;

export const {
    getModalContent,
    getModalTitle,
    getModalLoading,
    getModalType,
} = modalSlice.selectors;

export type TModalInternalActions = ReturnType<typeof modalSlice.actions[keyof typeof modalSlice.actions]>;
