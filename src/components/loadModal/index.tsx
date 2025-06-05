import { type FC } from 'react'
import styles from './styles.module.css'
import { LoaderIcon } from '../icons'

export const LoadingScreenModal: FC<{height?: number}> = ({height}) => {
    return (
        <div className={styles.wrap} style={{height}}>
            <LoaderIcon size={34} fill="#444" />
        </div>
    )
} 
