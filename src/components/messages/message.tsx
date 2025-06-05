import { type FC } from 'react'
import { type TMessage } from '../../core/types'
import DOMPurify from 'dompurify';
import styles from './message.module.css'
import { useAppSelector } from '../../services/store';
import { getUser } from '../../services/auth/slice';
import { HostUrl } from '../../core/constants';

export const Message: FC<{message: TMessage}> = ({message}) => {
    const {id, content, user} = message;

    const selfUser = useAppSelector(getUser)!;

    const contentPurify = DOMPurify.sanitize(content);

    const isSelf = selfUser.id === user.id;

    return (
        <div id={`message-${id}`} className={styles.wrap} data-self={isSelf ? 'on' : undefined}>
            {!isSelf ? (
                <div className={styles.av}>
                    <img src={`${HostUrl}${user.avatar}`} alt={user.name[0]} />
                </div>
            ) : null}
            <div className={styles.message}>
                <div className={styles.content} dangerouslySetInnerHTML={{__html: contentPurify}}></div>
            </div>
        </div>
    )
}
