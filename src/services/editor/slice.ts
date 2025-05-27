import { createSlice, PayloadAction } from "@reduxjs/toolkit"


type TEditorInitialState = {
    content: string,
    tmpContent: string,
}

const initialState: TEditorInitialState = {
    content: '',
    tmpContent: '',
}

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setEditorContent: (state, action: PayloadAction<string>) => {
            state.content = action.payload;
        },
        setEditorTmpContent: (state, action: PayloadAction<string>) => {
            state.tmpContent = action.payload;
        },
    },
    selectors: {
        getEditorContent: state => state.content,
        getEditorTmpContent: state => state.tmpContent,
    },
})

export default editorSlice.reducer;

export const {
    setEditorContent,
    setEditorTmpContent,
} = editorSlice.actions;

export const {
    getEditorContent,
    getEditorTmpContent,
} = editorSlice.selectors;

export type TEditorInternalActions = ReturnType<typeof editorSlice.actions[keyof typeof editorSlice.actions]>
