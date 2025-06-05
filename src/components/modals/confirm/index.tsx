import { type FC } from 'react'
import styles from './styles.module.css'
import { LoaderIcon } from '../../icons'

type TProps = {
    text?: string,
    confirmText?: string,
    cancelcText?: string,
    onConfirm?: () => void,
    onCancel?: () => void,
    actionType?: 'accept' | 'remove',
    textAlign?: 'left' | 'center' | 'right',
    isPending?: boolean,
}

export const ConfirmModal: FC<TProps> = ({
    text='Вы точно хотите подтвердить действие?', 
    confirmText='Подтвердить',
    cancelcText='Отменить',
    onConfirm, 
    onCancel,
    actionType='accept',
    textAlign='left',
    isPending,
}) => {
    const confirmClickHandler = () => {
        onConfirm?.();
    }

    const cancelClickHandler = () => {
        onCancel?.();
    }

    return (
        <div className={styles.wrap}>
            {isPending ? (
                <div className={styles.loader}>
                    <LoaderIcon size={32} fill="#444" />
                </div>
            ) : null}
            <div className={styles.text} style={{textAlign}}>{text}</div>
            <button className={`${styles.acceptBtn} ${styles[actionType]}`} onClick={confirmClickHandler}>{confirmText}</button>
            <button className={styles.cancel} onClick={cancelClickHandler}>{cancelcText}</button>
        </div>
    )
}
