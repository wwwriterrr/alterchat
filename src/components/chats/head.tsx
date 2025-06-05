import { useNavigate } from 'react-router-dom'
import { TRoom, TUser } from '../../core/types'
import { TAcItem } from '../../services/autocomplete/slice'
import { closeModal, openModal } from '../../services/modal/actions'
import { setModalContent } from '../../services/modal/slice'
import { RoomCheck } from '../../services/rooms/actions'
import { getRooms, setActiveRoom } from '../../services/rooms/slice'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { AddChatIcon } from '../icons'
import { LoadingScreenModal } from '../loadModal'
import { AppSearchModal } from '../searchModal'
import styles from './head.module.css'
import { getUser } from '../../services/auth/slice'

export const ChatsHead = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector(getUser);
    const rooms = useAppSelector(getRooms);

    const itemSelectHandler = (item: TUser | TRoom | TAcItem) => {
        const showError = () => {
            dispatch(setModalContent(<div className={styles.error}>Возникла непредвиденная ошибка<br/>Обратитесь к системному администратору.</div>));
        }

        dispatch(setModalContent(<LoadingScreenModal />));

        const room = rooms.find(r => r.members.find(u => u.id === user?.id) && r.members.find(u => u.id === item.id));

        if(room){
            dispatch(closeModal());
            navigate(`/messenger/${room.id}/`);
        }else{
            dispatch(RoomCheck({userId: item.id}))
                .then(data => {
                    if(data.type === RoomCheck.fulfilled.type){
                        console.log(data);

                        const {room, status} = data.payload as {status: number, room: TRoom};

                        dispatch(closeModal());

                        if(status === 404){
                            dispatch(setActiveRoom(room));
                            navigate('/messenger/new/');
                        }else{
                            navigate(`/messenger/${room.id}/`);
                        }
                    }else{
                        showError();
                    }
                })
                .catch(() => {
                    showError();
                })
        }

        // dispatch(closeModal())
    }

    const addChatClickHandler = () => {
        dispatch(openModal({content: <AppSearchModal autoFocus onItemSelect={itemSelectHandler} />, title: 'Поиск', modalType: 'flex'}))
    }

    return (
        <div className={styles.wrap}>
            <button className={styles.addRoom} title='Начать общение' onClick={addChatClickHandler}>
                <AddChatIcon size={22} fill='#1f64e8' />
            </button>
        </div>
    )  
}
