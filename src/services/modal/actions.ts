import { createAsyncThunk } from "@reduxjs/toolkit";
import { setModalContent, setModalLoading, setModalTitle, setModalType, setOnCloseHandler } from "./slice";

export const openModal = createAsyncThunk(
    'modal/openModal',
    async ({content, title, onClose, modalType}: {content: JSX.Element | string, title?: JSX.Element | string, onClose?: () => void, modalType?: 'justify' | 'flex'}, {dispatch}) => {
        if(modalType) dispatch(setModalType(modalType));
        if(title) dispatch(setModalTitle(title));
        dispatch(setModalContent(content));
        if(onClose) dispatch(setOnCloseHandler(onClose));
    }
)

export const closeModal = createAsyncThunk(
    'modal/closeModal',
    async (_, {dispatch}) => {
        dispatch(setModalContent(null));
        dispatch(setModalTitle(null));
        dispatch(setModalLoading(false));
        dispatch(setModalType('justify'));
    }
)

export type TModalExternalActions = ReturnType<typeof openModal> | ReturnType<typeof closeModal>;
