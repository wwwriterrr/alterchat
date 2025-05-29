import { getActiveRoom } from "../../services/rooms/slice"
import { useAppSelector } from "../../services/store"
import { RoomHeader } from "../chatHeader"
import { AppEditor } from "../editor"
import { AppMessages } from "../messages"
import styles from './styles.module.css'

export const AppRoomContent = () => {
    const room = useAppSelector(getActiveRoom);

    return (
        <div className={styles.roomContent}>
            {room ? (
                <>
                    <RoomHeader />
                    <AppMessages />
                    <AppEditor />
                </>
            ) : null}
        </div>
    )
}
