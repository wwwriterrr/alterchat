import { useState, type FC } from 'react'
import styles from './styles.module.css'
import { type TRoom } from '../../../core/types'
import { ConfirmModal } from '../confirm'
import { useAppDispatch, useAppSelector } from '../../../services/store'
import { closeModal } from '../../../services/modal/actions'
import { getActiveRoom, setContextRoom } from '../../../services/rooms/slice'
import { RoomRemove } from '../../../services/rooms/actions'
import { useNavigate } from 'react-router-dom'

export const RoomRemoveModal: FC<{room: TRoom}> = ({room}) => {
    const [load, setLoad] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const activeRoom = useAppSelector(getActiveRoom);

    const cancelClickHandler = () => {
        dispatch(closeModal());
    }

    const removeHandler = () => {
        setLoad(true);
        dispatch(RoomRemove({roomId: room.id}))
            .then(data => {
                if(data.type === RoomRemove.fulfilled.type){
                    dispatch(setContextRoom(null));
                    dispatch(closeModal());

                    if(activeRoom?.id === room.id){
                        navigate('/messenger/');
                    }
                }
            })
            .finally(() => setLoad(false))
    }

    return (
        <div className={styles.wrap}>
            <ConfirmModal 
                confirmText="Удалить" 
                actionType="remove" 
                textAlign="center" 
                onConfirm={removeHandler}
                onCancel={cancelClickHandler}
                isPending={load}
            />
        </div>
    )
}
