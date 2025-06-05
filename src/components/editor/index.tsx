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
import { LoaderIcon, SendIcon } from '../icons'
import { AppUtils } from '../../core/utils'
import { MessagesSend } from '../../services/rooms/actions'
import { getActiveRoom } from '../../services/rooms/slice'
import { getUser } from '../../services/auth/slice'
import { useNavigate } from 'react-router-dom'

type TEventHandler<K extends keyof Events.EditorEventMap> = EventHandler<Events.EditorEventMap[K]>;

export const AppEditor = () => {
    const [isInit, setIsInit] = useState<boolean>(false);
    const [load, setLoad] = useState<boolean>(false);
    const [focus, setFocus] = useState<boolean>(false);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const editorRef = useRef<TinyMCEEditor>();

    const user = useAppSelector(getUser)!;
    const editorContent = useAppSelector(getEditorContent);
    const activeRoom = useAppSelector(getActiveRoom);

    const initHandler: TEventHandler<'init'> = (_, editor) => {
        setIsInit(true);
        editorRef.current = editor;
    }

    const changeHandler = (newContent: string) => {
        // setContent(newContent);
        dispatch(setEditorContent(newContent));
    }

    const submitHandler = () => {
        if(load) return;
        if(!AppUtils.stripTags(editorContent).trim()) return;
        if(!activeRoom) return;

        const content = editorContent.replace(/\<p\>\<\/p\>/g, '').trim();

        const data: {content: string, roomId: number, userId?: number} = {content, roomId: activeRoom.id};
        if(activeRoom.id === 0){
            const friend = activeRoom.members.find(item => item.id !== user.id);
            if(!friend) return;
            data.userId = friend.id;
        }

        setLoad(true);
        dispatch(MessagesSend(data))
            .then(action => {
                if(action.type === MessagesSend.fulfilled.type){
                    dispatch(setEditorContent(''));

                    if(activeRoom.id === 0){
                        navigate(`/messenger/${action.payload}/`);
                    }
                }
            })
            .finally(() => setLoad(false))
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
        max_height: 220,
        min_height: 40,
        autoresize_bottom_margin: 0,
        autoresize_overflow_padding: 0,
        content_style: 'body {margin: 10px; font-family: "PT Serif", sans-serif;font-size: 14px;} p{margin: 0 0 14px 0;} p:last-child{margin-bottom: 0;}',
        placeholder: 'Текст сообщения',
    }

    return (
        <div className={styles.wrap}>
            <div className={`${styles.editorWrap} ${focus ? styles.editorWrapFocus : ''}`}>
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
            <button className={styles.submit} disabled={load || !isInit} onClick={submitHandler}>
                {load ? <LoaderIcon size={20} fill="#fff" /> : <SendIcon size={20} fill="#fff" />}
            </button>
        </div>
    )
}
