import { type FC } from 'react'
import styles from './room.module.css'
import { type TRoom } from '../../core/types'
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getUser } from '../../services/auth/slice';
import { HostUrl } from '../../core/constants';
import { AppUtils } from '../../core/utils';
// import { setActiveRoom } from '../../services/rooms/slice';
import { useNavigate, useParams } from 'react-router-dom';
import { getEditorContent, setEditorContent } from '../../services/editor/slice';
import { getActiveRoom, setRoomDraft } from '../../services/rooms/slice';
import { setMessages } from '../../services/messages/slice';

export const Room: FC<{room: TRoom & {draft?: string}}> = ({room}) => {
    const {id, members, avatar, title, last_msg, dt_modified, dt_created, draft} = room;

    const {roomId} = useParams();

    const dispatch = useAppDispatch();

    const editorContent = useAppSelector(getEditorContent);
    const activeRoom = useAppSelector(getActiveRoom);

    const navigate = useNavigate();

    const user = useAppSelector(getUser)!;

    let av: string | undefined | null = null;
    let name: string;
    let avLetter: string;

    if(members.length === 2){
        const member = members.find(item => item.id !== user.id);
        av = member?.avatar;
        avLetter = member?.name[0] || 'A';
        name = member?.name || `Chat #${id}`;
    }else{
        av = avatar;
        avLetter = title?.[0] || 'A';
        name = title || `Chat #${id}`;
    }

    const dtStr = AppUtils.roomDtFromTs(dt_modified || dt_created);

    const clickHandler = () => {
        // dispatch(setActiveRoom(room));
        if(activeRoom?.id === id){
            return;
        }

        dispatch(setMessages([]));

        if(roomId){
            if(editorContent){
                dispatch(setRoomDraft({roomId: parseInt(roomId), draft: editorContent}));
                dispatch(setEditorContent(''));
            }
        }

        navigate(`/messenger/${id}/`);
        
        if(draft){
            dispatch(setEditorContent(draft));
            dispatch(setRoomDraft({roomId: id, draft: undefined}));
        }else{
            dispatch(setEditorContent(''));
        }
    }

    const draftStr = AppUtils.stripTags(draft || '');
    const msgStr = AppUtils.stripTags(last_msg || '');

    return (
        <div className={`${styles.room} ${activeRoom?.id === id ? styles.activeRoom : ''}`} id={`room-${id}`} onClick={clickHandler}>
            <div className={styles.avatarWrap}>
                {av ? (
                    <img className={styles.avatar} src={`${HostUrl}${av}`} alt={avLetter} />
                ) : (
                    <span className={styles.letter}>{avLetter}</span>
                )}
            </div>
            <div className={styles.roomName}>
                <span>{name}</span>
            </div>
            <div className={styles.msg}>
                {draft ? (
                    <span className={styles.draft}><i>Черновик:</i> {draftStr}</span>
                ) : (
                    <>
                        {last_msg ? (
                            <>{msgStr}</>
                        ) : (
                            <span style={{fontSize: 12}}>Сообщений нет</span>
                        )}
                    </>
                )}
            </div>
            <div className={styles.dt}>
                {dtStr}
            </div>
            {/* <div className={styles.ntf}>99+</div> */}
        </div>
    )
}
