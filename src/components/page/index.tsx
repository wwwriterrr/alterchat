import React from 'react'
import styles from './styles.module.css'
import { Side } from '../side'
import { Chats } from '../chats'
import { ChatContent } from '../content'
import { useAppSelector } from '../../services/store'
import { getRooms } from '../../services/rooms/slice'

export const Page = () => {
    const rooms = useAppSelector(getRooms);

    return (
        <div className={styles.page}>
            <Side />
            <Chats />
            {rooms.length ? (<ChatContent />) : (
                <div>empty</div>
            )}
        </div>
    )
}
