import { useEffect, type FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { messagesWsConnect, messagesWsDisconnect } from '../../services/messages/actions';
import { getUser } from '../../services/auth/slice';
import { ApiWsUrl } from '../../core/constants';

export const EventsHOC: FC<{children: JSX.Element}> = ({children}) => {
    const dispatch = useAppDispatch();

    const user = useAppSelector(getUser)!;

    useEffect(() => {
        const token = user.access;
        if(token) dispatch(messagesWsConnect(`${ApiWsUrl}/ws/events/${user.id}/?token=${token}`));

        return () => {
            dispatch(messagesWsDisconnect());
        }        
    }, [])

    return (
        <>{children}</>
    )
}
