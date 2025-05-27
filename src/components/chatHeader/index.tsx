import { getActiveRoom } from '../../services/rooms/slice'
import { useAppSelector } from '../../services/store'
import styles from './styles.module.css'

export const ChatHeader = () => {
    const room = useAppSelector(getActiveRoom)!;

    return (
        <div className={styles.wrap}>
            {/* {room.title ? null : (<ChatHeader />)} */}
        </div>
    )
}
