import React from 'react'
import styles from './styles.module.css'
import { Side } from '../side'
import { Chats } from '../chats'

export const Page = () => {
    return (
        <div className={styles.page}>
            <Side />
            <Chats />
        </div>
    )
}
