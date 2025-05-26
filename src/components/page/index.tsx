import React from 'react'
import styles from './styles.module.css'
import { Side } from '../side'
import { Chats } from '../chats'
import { ChatContent } from '../content'

export const Page = () => {
    return (
        <div className={styles.page}>
            <Side />
            <Chats />
            <ChatContent />
        </div>
    )
}
