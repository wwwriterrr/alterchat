import { closeModal } from '../../services/modal/actions';
import { getModalContent, getModalTitle, getModalType } from '../../services/modal/slice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { CloseIcon } from '../icons';
import { ModalOverlay } from './overlay';
import styles from './styles.module.css';

export const ModalComponent = () => {
    const dispatch = useAppDispatch();

    const content = useAppSelector(getModalContent);
    const title = useAppSelector(getModalTitle);
    const modalType = useAppSelector(getModalType);

    const closeClickHandler = () => {
        dispatch(closeModal());
    }

    return (
        <>
            {content ? (
                <div className={styles.wrap}>
                    <ModalOverlay />
                    <div className={styles.window} style={{height: modalType === 'justify' ? '100%' : 'auto'}}>
                        <div className={styles.head}>
                            <div className={styles.title}>
                                {title ? title : (
                                    <span className={styles.defaultTitle}>Alterlit</span>
                                )}
                            </div>
                            <button className={styles.closeBtn} onClick={closeClickHandler}>
                                <CloseIcon size={22} fill={'#c64848'} />
                            </button>
                        </div>
                        <div className={styles.content}>
                            {content}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}
