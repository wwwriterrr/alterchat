import { type FC } from 'react'
import styles from './room.module.css'
import { type TRoom } from '../../core/types'

export const Room: FC<{room: TRoom}> = ({room}) => {
    const {id} = room;

    return (
        <div className={styles.room} id={`room-${id}`}>

        </div>
    )
}
