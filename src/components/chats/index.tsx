import React, { useEffect } from 'react'
import styles from './styles.module.css'
import { useAppDispatch } from '../../services/store';
import { RoomsFetch } from '../../services/rooms/actions';
import { Rooms } from './list';

export const Chats = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(RoomsFetch())
    }, []);

    return (
        <div className={styles.wrap}>
            <Rooms />
        </div>
    )
}
