import { getRooms, getRoomsLoading, getRoomsMore } from '../../services/rooms/slice'
import { useAppSelector } from '../../services/store'
import { LoaderIcon } from '../icons';
import styles from './list.module.css'
import { Room } from './room';

export const Rooms = () => {
    const roomsLoading = useAppSelector(getRoomsLoading);
    const rooms = useAppSelector(getRooms);
    const roomsMore = useAppSelector(getRoomsMore);

    return (
        <div className={styles.wrap}>
            {roomsLoading ? (
                <div className={styles.loader}>
                    <LoaderIcon size={30} fill='#444' />
                </div>
            ) : (
                <>
                    {rooms.length ? (
                        <>
                            {rooms.map(room => (
                                <Room room={room} key={`room-${room.id}`} />
                            ))}
                            {roomsMore ? (
                                <div>more</div>
                            ) : null}
                        </>
                    ) : (
                        <div className={styles.empty}>У вас нет бесед</div>
                    )}
                </>
            )}
        </div>
    )
}
