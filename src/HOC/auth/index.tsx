import React, { useEffect, type FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { getAuthChecked, getUser } from '../../services/auth/slice'
import { CheckAuth } from '../../services/auth/actions'
import styles from './styles.module.css'
import { LoaderIcon } from '../../components/icons'

export const AuthHOC: FC<{children: JSX.Element}> = ({children}) => {
    const dispatch = useAppDispatch();

    const user = useAppSelector(getUser);
    const authChecked = useAppSelector(getAuthChecked);

    useEffect(() => {
        dispatch(CheckAuth());
    }, [])

    return (
        <>{authChecked ? (
            <>
                {user ? (<>{children}</>) : (
                    <>
                        Authorization form
                    </>
                )}
            </>
        ) : (
            <div className={styles.loader}>
                <LoaderIcon size={30} fill='#444' />
            </div>
        )}</>
    )
}
