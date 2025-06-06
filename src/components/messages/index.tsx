import { useEffect, useMemo, useRef } from 'react';
import { getActiveRoom, getMessages, getMessagesLoad, getMessagesMore, getMessagesWsStatus, setMessages } from '../../services/rooms/slice';
import { useAppDispatch, useAppSelector } from '../../services/store'
import { LoaderIcon } from '../icons';
import { Message } from './message';
import styles from './styles.module.css'
import { MessagesFetch } from '../../services/rooms/actions';
import { WebsocketStatus } from '../../core/types';

export const AppMessages = () => {
    const containerRef = useRef<HTMLDivElement>(null);
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
                if(listRef.current && containerRef.current){
                    containerRef.current.scrollTo({top: listRef.current.clientHeight});
                }
            })

        return () => {
            dispatch(setMessages([]));
        }
    }, [room])

    useMemo(() => {
        if(!containerRef.current || !listRef.current) return;

        const scrollTop = containerRef.current.scrollTop+containerRef.current.clientHeight-20;
        const listHeight = listRef.current.clientHeight;
        if(scrollTop === listHeight){
            setTimeout(() => containerRef.current?.scrollTo({top: listRef.current?.clientHeight}), 100);
        }
    }, [messages])

    return (
        <div id="messages-container" className={styles.wrap} ref={containerRef}>
            {load ? (
                <div className={styles.loader}>
                    <LoaderIcon size={24} fill='#444' />
                </div>
            ) : (
                <>
                    {messages.length ? (
                        <div id="messages-list" className={styles.list} ref={listRef}>
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
