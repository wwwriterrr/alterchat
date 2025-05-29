import { getActiveRoom } from '../../services/rooms/slice'
import { useAppSelector } from '../../services/store'
import { ChatHeader } from './chat';
import styles from './styles.module.css'

export const RoomHeader = () => {
    const room = useAppSelector(getActiveRoom)!;

    return (
        <div className={styles.wrap}>
            {room.title ? null : (<ChatHeader />)}
        </div>
    )
}
