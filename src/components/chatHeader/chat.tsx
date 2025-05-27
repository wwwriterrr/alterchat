import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/auth/slice';
import { getActiveRoom } from '../../services/rooms/slice'
import { useAppSelector } from '../../services/store'
import { CloseIcon } from '../icons';
import styles from './chat.module.css'

export const ChatHeader = () => {
    const room = useAppSelector(getActiveRoom)!;
    const user = useAppSelector(getUser)!;

    const navigate = useNavigate();

    const friend = room.members.find(item => item.id !== user.id);

    const closeClickHandler = () => {
        navigate('/messenger/');
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.left}>

            </div>
            <div className={styles.right}>
                <button className={styles.closeBtn} onClick={closeClickHandler}>
                    <CloseIcon size={24} fill='#444' />
                </button>
            </div>
        </div>
    )
}