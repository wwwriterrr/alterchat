import React from 'react'
import styles from './styles.module.css'
import { Side } from '../side'
import { Chats } from '../chats'
import { ChatContent } from '../content'
import { useAppSelector } from '../../services/store'
import { getRooms } from '../../services/rooms/slice'
import { EventsHOC } from '../../HOC/events'

export const Page = () => {
    const rooms = useAppSelector(getRooms);

    return (
        <div className={styles.page}>
            <Side />
            <EventsHOC>
                <Chats />
            </EventsHOC>
            {rooms.length ? (<ChatContent />) : (
                <div>empty</div>
            )}
        </div>
    )
}
