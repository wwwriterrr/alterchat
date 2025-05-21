import React, { useEffect, type FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { getAuthChecked, getUser } from '../../services/auth/slice'
import { AuthRefreshToken, CheckAuth } from '../../services/auth/actions'
import styles from './styles.module.css'
import { LoaderIcon } from '../../components/icons'
import { AuthForm } from './form'

export const AuthHOC: FC<{children: JSX.Element}> = ({children}) => {
    const dispatch = useAppDispatch();

    const user = useAppSelector(getUser);
    const authChecked = useAppSelector(getAuthChecked);

    let interval: number | undefined;

    useEffect(() => {
        dispatch(CheckAuth())
            .then(action => {
                if(action.type === CheckAuth.fulfilled.type){
                    interval = setInterval(() => {
                        console.log('refresh token');
                        const refresh = localStorage.getItem('refresh');
                        if(!refresh) return;

                        dispatch(AuthRefreshToken({refresh: refresh}))
                    }, 60*1000*10)
                }
            })

        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <>{authChecked ? (
            <>
                {user ? (<>{children}</>) : (
                    <AuthForm />
                )}
            </>
        ) : (
            <div className={styles.loader}>
                <LoaderIcon size={30} fill='#444' />
            </div>
        )}</>
    )
}
