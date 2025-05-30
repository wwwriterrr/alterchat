import { openModal } from '../../services/modal/actions'
import { useAppDispatch } from '../../services/store'
import { AddChatIcon } from '../icons'
import styles from './head.module.css'

export const ChatsHead = () => {
    const dispatch = useAppDispatch()

    const addChatClickHandler = () => {
        dispatch(openModal({content: 'test', title: 'Поиск', modalType: 'flex'}))
    }

    return (
        <div className={styles.wrap}>
            <button className={styles.addRoom} title='Начать общение' onClick={addChatClickHandler}>
                <AddChatIcon size={22} fill='#1f64e8' />
            </button>
        </div>
    )  
}
