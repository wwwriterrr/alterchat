import { getActiveRoom } from "../../services/rooms/slice"
import { useAppSelector } from "../../services/store"
import { ChatHeader } from "../chatHeader"
import { AppEditor } from "../editor"
import { AppMessages } from "../messages"
import styles from './styles.module.css'

export const AppRoomContent = () => {
    const room = useAppSelector(getActiveRoom);

    return (
        <div className={styles.roomContent}>
            {room ? (
                <>
                    <ChatHeader />
                    <AppMessages />
                    <AppEditor />
                </>
            ) : null}
        </div>
    )
}
