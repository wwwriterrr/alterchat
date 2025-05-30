import { type FC } from "react"
import { type TIconProps } from "../../core/types"

export const AddChatIcon: FC<TIconProps> = ({size=24, fill='#000', strokeWidth=2}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.54545 12H17.4545M12 6.54546V17.4545M2 22H12C13.9778 22 15.9112 21.4135 17.5557 20.3147C19.2002 19.2159 20.4819 17.6541 21.2388 15.8268C21.9957 13.9996 22.1937 11.9889 21.8078 10.0491C21.422 8.10929 20.4696 6.32746 19.0711 4.92894C17.6725 3.53041 15.8907 2.578 13.9509 2.19215C12.0111 1.8063 10.0004 2.00433 8.17316 2.76121C6.3459 3.51809 4.78412 4.79981 3.6853 6.4443C2.58649 8.08879 2 10.0222 2 12V22Z" stroke={fill} strokeWidth={strokeWidth} />
    </svg>
)
