import { type FC } from 'react'
import styles from './room.module.css'
import { type TRoom } from '../../core/types'
import { useAppSelector } from '../../services/store';
import { getUser } from '../../services/auth/slice';
import { HostUrl } from '../../core/constants';

export const Room: FC<{room: TRoom}> = ({room}) => {
    const {id, members, avatar, title} = room;

    const user = useAppSelector(getUser)!;

    let av: string | undefined | null = null;
    let avLetter: string;

    if(members.length === 2){
        const member = members.find(item => item.id !== user.id);
        av = member?.avatar;
        avLetter = member?.name[0] || 'A';
    }else{
        av = avatar;
        avLetter = title?.[0] || 'A';
    }

    return (
        <div className={styles.room} id={`room-${id}`}>
            <div className={styles.avatarWrap}>
                {av ? (
                    <img className={styles.avatar} src={`${HostUrl}${av}`} alt={avLetter} />
                ) : (
                    <span className={styles.letter}>{avLetter}</span>
                )}
            </div>
        </div>
    )
}
