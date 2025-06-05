import React from 'react'
import styles from './styles.module.css'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { getUser } from '../../services/auth/slice'
import { HostUrl } from '../../core/constants'
import { openModal } from '../../services/modal/actions'

export const Side = () => {
    const dispatch = useAppDispatch();

    const user = useAppSelector(getUser)!;

    const clickHandler = () => {
        dispatch(openModal({title: user.name, content: 'User settings'}));
    }

    return (
        <div className={styles.wrap}>
            <button className={styles.menuBtn} onClick={clickHandler}>
                <img src={`${HostUrl}${user.avatar}`} alt={user.name[0]} />
            </button>
        </div>
    )
}
