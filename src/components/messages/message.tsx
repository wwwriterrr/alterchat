import { type FC } from 'react'
import { type TMessage } from '../../core/types'
import styles from './message.module.css'

export const Message: FC<{message: TMessage}> = ({message}) => {
    const {id, content} = message;

    return (
        <div id={`message-${id}`} className={styles.wrap}>
            {content}
        </div>
    )
}
