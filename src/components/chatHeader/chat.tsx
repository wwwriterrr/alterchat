import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/auth/slice';
import { getActiveRoom, setActiveRoom, setMessages } from '../../services/rooms/slice'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { CloseIcon } from '../icons';
import styles from './chat.module.css'
import { HostUrl } from '../../core/constants';
import { Link } from 'react-router-dom';

export const ChatHeader = () => {
    const room = useAppSelector(getActiveRoom)!;
    const user = useAppSelector(getUser)!;

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const friend = room.members.find(item => item.id !== user.id)!;

    const closeClickHandler = () => {
        navigate('/messenger/');

        dispatch(setMessages([]));
        dispatch(setActiveRoom(null));
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.left}>
                <Link className={styles.user} to={`/profile/${friend.username}/`}>
                    <img className={styles.userAvatar} src={`${HostUrl}${friend.avatar}`} alt={friend.name[0]} />
                    <div className={styles.userName}>{friend.name}</div>
                </Link>
            </div>
            <div className={styles.right}>
                <button className={styles.closeBtn} onClick={closeClickHandler}>
                    <CloseIcon size={16} fill='#444' />
                </button>
            </div>
        </div>
    )
}