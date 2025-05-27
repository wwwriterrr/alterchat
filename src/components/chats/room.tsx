import { type FC } from 'react'
import styles from './room.module.css'
import { type TRoom } from '../../core/types'
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getUser } from '../../services/auth/slice';
import { HostUrl } from '../../core/constants';
import { AppUtils } from '../../core/utils';
import { setActiveRoom } from '../../services/rooms/slice';
import { useNavigate } from 'react-router-dom';

export const Room: FC<{room: TRoom}> = ({room}) => {
    const {id, members, avatar, title, last_msg, dt_modified, dt_created} = room;

    const dispatch = useAppDispatch();

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
        navigate(`/messenger/${id}/`);
    }

    return (
        <div className={styles.room} id={`room-${id}`} onClick={clickHandler}>
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
                {last_msg ? (
                    <>{last_msg}</>
                ) : (
                    <span style={{fontSize: 12}}>Сообщений нет</span>
                )}
            </div>
            <div className={styles.dt}>
                {dtStr}
            </div>
            {/* <div className={styles.ntf}>99+</div> */}
        </div>
    )
}
