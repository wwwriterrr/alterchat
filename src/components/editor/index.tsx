import { Editor } from '@tinymce/tinymce-react'
import { type EventHandler } from '@tinymce/tinymce-react/lib/cjs/main/ts/Events'
import { type Events } from 'tinymce'
import { type InitOptions } from '@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor'
import styles from './styles.module.css'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { getEditorContent, setEditorContent } from '../../services/editor/slice'
import { type Editor as TinyMCEEditor } from 'tinymce'
import { useRef, useState } from 'react'
import { HostUrl } from '../../core/constants'
import './editor.css'

type TEventHandler<K extends keyof Events.EditorEventMap> = EventHandler<Events.EditorEventMap[K]>;

export const AppEditor = () => {
    const [isInit, setIsInit] = useState<boolean>(false);
    const [load, setLoad] = useState<boolean>(false);
    const [focus, setFocus] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const editorRef = useRef<TinyMCEEditor>();

    const editorContent = useAppSelector(getEditorContent);

    const initHandler: TEventHandler<'init'> = (_, editor) => {
        setIsInit(true);
        editorRef.current = editor;
    }

    const changeHandler = (newContent: string) => {
        // setContent(newContent);
        dispatch(setEditorContent(newContent));
    }

    const options: InitOptions = {
        menubar: false,
        toolbar: false,
        plugins: [
            'quickbars', 'emoticons', 'autolink', 'autoresize',
        ],
        quickbars_insert_toolbar: false,
        quickbars_selection_toolbar: 'bold italic underline | forecolor backcolor | blockquote quicklink | alignleft aligncenter alignright alignfull',
        valid_elements: 'p[style],strong/b,em,span[style],a[href|target=_blank]',
        valid_styles: {
            '*': 'font-size,font-family,font-style,font-weight,color,text-decoration,text-align,margin,padding',
        },
        height: 60,
        max_height: 220,
        min_height: 60,
        // content_css: '/src/assets/editor.css',
        content_style: 'body {margin: 10px; font-family: "PT Serif", sans-serif;font-size: 14px;} p{margin: 0 0 14px 0;}',
        placeholder: 'Текст сообщения',
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.editorWrap}>
                {!isInit ? (
                    <div className={styles.skeleton}></div>
                ) : null}
                <Editor 
                    licenseKey={'gpl'}
                    tinymceScriptSrc={`${HostUrl}/assets/tinymce/tinymce.min.js`}
                    onInit={initHandler}
                    value={editorContent}
                    onEditorChange={changeHandler}
                    init={options}
                    disabled={load}
                    onFocusIn={() => setFocus(true)}
                    onFocusOut={() => setFocus(false)}
                />
            </div>
        </div>
    )
}
