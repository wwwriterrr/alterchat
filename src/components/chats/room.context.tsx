import { MouseEventHandler, type FC } from 'react'
import styles from './room.module.css'
import { type TRoom } from '../../core/types'
import { CloseIcon, PinIcon, ReadIcon, TrashIcon } from '../icons'
import { useAppDispatch } from '../../services/store'
import { setContextRoom } from '../../services/rooms/slice'
import { openModal } from '../../services/modal/actions'
import { RoomRemoveModal } from '../modals/roomRemove'

export const RoomContextMenu: FC<{room: TRoom}> = ({room}) => {
    const dispatch = useAppDispatch();

    const closeClickHandler: MouseEventHandler = (e) => {
        e.stopPropagation();

        dispatch(setContextRoom(null));
    }

    const removeClickHandler: MouseEventHandler = (e) => {
        e.stopPropagation();

        dispatch(openModal({title: 'Подтверждение', content: <RoomRemoveModal room={room} />, modalType: 'flex'}));
    }

    return (
        <div className={styles.contextMenu}>
            <button className={styles.roomPin} title="Закрепить чат">
                <PinIcon size={20} fill="#444" />
            </button>
            <button className={styles.roomRead} title="Прочитать">
                <ReadIcon size={16} fill="#444" />
            </button>
            <button className={styles.roomRemove} onClick={removeClickHandler} title="Удалить чат">
                <TrashIcon size={20} fill="#fff" />
            </button>
            <button className={styles.contextClose} onClick={closeClickHandler}>
                <CloseIcon size={18} fill="#b3b3b3" />
            </button>
        </div>
    )
}
