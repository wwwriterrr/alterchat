import { Outlet, useLocation, useParams } from 'react-router-dom'
import { selectRoom } from '../../services/rooms/slice'
import { useAppDispatch } from '../../services/store'
import styles from './styles.module.css'
import { useEffect } from 'react'

export const ChatContent = () => {
    const dispatch = useAppDispatch();

    const location = useLocation();

    const {roomId} = useParams();
    
    useEffect(() => {
        if(roomId && roomId !== 'new'){
            dispatch(selectRoom(parseInt(roomId)));
        }
    }, [location])

    return (
        <div className={styles.wrap}>
            {roomId ? (
                <Outlet />
            ) : (
                <div className={styles.empty}>Выберите чат</div>
            )}
        </div>
    )
}
