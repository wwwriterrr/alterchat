import { closeModal } from '../../services/modal/actions';
import { useAppDispatch } from '../../services/store';
import styles from './styles.module.css';

export const ModalOverlay = () => {
    const dispatch = useAppDispatch();

    const clickHandler = () => {
        dispatch(closeModal());
    }

    return (
        <div className={styles.overlay} onClick={clickHandler}></div>
    )
}
