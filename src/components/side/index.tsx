import React from 'react'
import styles from './styles.module.css'
import { useAppSelector } from '../../services/store'
import { getUser } from '../../services/auth/slice'
import { HostUrl } from '../../core/constants'

export const Side = () => {
    const user = useAppSelector(getUser)!;

    return (
        <div className={styles.wrap}>
            <button className={styles.menuBtn}>
                <img src={`${HostUrl}${user.avatar}`} alt={user.name[0]} />
            </button>
        </div>
    )
}
