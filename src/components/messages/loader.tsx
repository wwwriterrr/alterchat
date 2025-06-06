import { FC, RefObject, useEffect, useRef } from "react";
import { getActiveRoom, getMessages, getMessagesLoad } from "../../services/rooms/slice"
import { useAppDispatch, useAppSelector } from "../../services/store"
import { MessagesFetch } from "../../services/rooms/actions";

export const MessagesLoader: FC<{containerRef: RefObject<HTMLDivElement>}> = ({containerRef}) => {
    const loaderRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const messages = useAppSelector(getMessages);
    const pending = useAppSelector(getMessagesLoad);
    const activeRoom = useAppSelector(getActiveRoom)!;

    useEffect(() => {
        if(!loaderRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    if(pending) return;

                    const lastMsgId = messages[0].id;
                    dispatch(MessagesFetch({roomId: activeRoom.id, lastId: lastMsgId}))
                        .then(data => {
                            if(data.type === MessagesFetch.fulfilled.type){
                                const msgElem = document.getElementById(`message-${lastMsgId}`);
                                if(msgElem && containerRef.current){
                                    // Scroll to last message before loading
                                    containerRef.current.scrollTo({top: msgElem.offsetTop});
                                }
                            }
                        })
                }
            })
        }, {
            rootMargin: '200px',
        })

        observer.observe(loaderRef.current);

        return () => {
            if(!loaderRef.current) return;

            // observer.unobserve(ref.current);
            observer.disconnect();
        }
    }, [])

    return (
        <div
            ref={loaderRef}
            style={{
                width: '100%',
                height: 20,
            }}
        ></div>
    )
}
