import { useEffect } from 'react'
import styles from './styles.module.css'
import { useAppDispatch } from '../../services/store';
import { RoomsFetch } from '../../services/rooms/actions';
import { Rooms } from './list';
import { ChatsHead } from './head';

export const Chats = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(RoomsFetch())
    }, []);

    return (
        <div className={styles.wrap}>
            <ChatsHead />
            <Rooms />
        </div>
    )
}
