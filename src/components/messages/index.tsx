import { useEffect, useRef } from 'react';
import { getActiveRoom, getMessages, getMessagesLoad, getMessagesMore, getMessagesWsStatus, setMessages } from '../../services/rooms/slice';
import { useAppDispatch, useAppSelector } from '../../services/store'
import { LoaderIcon } from '../icons';
import { Message } from './message';
import styles from './styles.module.css'
import { MessagesFetch } from '../../services/rooms/actions';
import { WebsocketStatus } from '../../core/types';

export const AppMessages = () => {
    const listRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const room = useAppSelector(getActiveRoom)!;
    const load = useAppSelector(getMessagesLoad);
    const messages = useAppSelector(getMessages);
    const more = useAppSelector(getMessagesMore);
    const wsStatus = useAppSelector(getMessagesWsStatus);

    useEffect(() => {
        dispatch(MessagesFetch({roomId: room.id}))
            .then(() => {
                if(listRef.current){
                    listRef.current.scrollTo({top: listRef.current.scrollHeight})
                }
            })

        return () => {
            dispatch(setMessages([]));
        }
    }, [room])

    return (
        <div className={styles.wrap}>
            {load ? (
                <div className={styles.loader}>
                    <LoaderIcon size={24} fill='#444' />
                </div>
            ) : (
                <>
                    {messages.length ? (
                        <div className={styles.list} ref={listRef}>
                            {messages.map(msg => (
                                <Message message={msg} key={`message-${msg.id}`} />
                            ))}
                            {wsStatus !== WebsocketStatus.ONLINE ? (
                                <div className={styles.wsLoader} title='Проблемы с подключением. Исправляем.'>
                                    <LoaderIcon size={24} fill='#444' />
                                </div>
                            ) : null}
                        </div>
                    ) : (
                        <div className={styles.empty}>Сообщений нет</div>
                    )}
                </>
            )}
        </div>
    )
}
