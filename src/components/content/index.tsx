import { getActiveRoom } from '../../services/rooms/slice'
import { useAppSelector } from '../../services/store'
import styles from './styles.module.css'

export const ChatContent = () => {
    const room = useAppSelector(getActiveRoom);

    return (
        <div className={styles.wrap}>
            {room ? (
                <>{room.id}</>
            ) : (
                <div className={styles.empty}>Выберите чат</div>
            )}
        </div>
    )
}
