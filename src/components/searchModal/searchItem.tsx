import { type FC } from 'react'
import styles from './searchItem.module.css'
import { type TRoom, type TUser } from '../../core/types';
import { type TAcItem } from '../../services/autocomplete/slice';
import { HostUrl } from '../../core/constants';

type TProps<R> = {
    item: R,
    onClick?: (item: R) => void,
}

export const AutocompleteItem: FC<TProps<TUser | TRoom | TAcItem>> = ({item, onClick}) => {
    const clickHandler = () => {
        onClick?.(item);
    }

    let type: string = 'ac';
    if('username' in item) type = 'user';
    else if('members' in item) type = 'room';

    return (
        <div className={styles.item}>
            {type === 'user' ? (
                <div className={styles.userItem}>
                    <img className={styles.av} src={`${HostUrl}${(item as TUser).avatar}`} alt={(item as TUser).name[0]} onClick={clickHandler} />
                    <div className={styles.name} onClick={clickHandler}>{(item as TUser).name}</div>
                </div>
            ) : (type === 'room') ? (
                <>Room</>
            ) : (
                <>AC</>
            )}
        </div>
    )
}
