import { TRoom, TUser } from '../../core/types'
import { setAutocompleteItems, TAcItem } from '../../services/autocomplete/slice'
import { closeModal, openModal } from '../../services/modal/actions'
import { useAppDispatch } from '../../services/store'
import { AddChatIcon } from '../icons'
import { AppSearchModal } from '../searchModal'
import styles from './head.module.css'

export const ChatsHead = () => {
    const dispatch = useAppDispatch()

    const itemSelectHandler = (item: TUser | TRoom | TAcItem) => {
        item as TUser;
        console.log('select', item);
        dispatch(closeModal())
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
