import { type FC } from 'react'
import styles from './searchItem.module.css'
import { type TRoom, type TUser } from '../../core/types';
import { type TAcItem } from '../../services/autocomplete/slice';
import { HostUrl } from '../../core/constants';
import DOMPurify from 'dompurify';

type TProps<R> = {
    item: R,
    onClick?: (item: R) => void,
    searchValue?: string,
}

export const AutocompleteItem: FC<TProps<TUser | TRoom | TAcItem>> = ({item, onClick, searchValue}) => {
    const clickHandler = () => {
        onClick?.(item);
    }

    let type: string = 'ac';
    if('username' in item) type = 'user';
    else if('members' in item) type = 'room';

    let nameStr: string = '';
    if(type === 'user'){
        nameStr = (item as TUser).name;
        if(searchValue){
            const re = new RegExp(String.raw`${searchValue}`, 'ig');
            nameStr = nameStr.replace(re, `<b>$&</b>`);
        }
        nameStr = DOMPurify.sanitize(nameStr);
    }

    return (
        <div className={styles.item}>
            {type === 'user' ? (
                <div className={styles.userItem}>
                    <img className={styles.av} src={`${HostUrl}${(item as TUser).avatar}`} alt={(item as TUser).name[0]} onClick={clickHandler} />
                    <div className={styles.name} onClick={clickHandler} dangerouslySetInnerHTML={{__html: nameStr}}></div>
                </div>
            ) : (type === 'room') ? (
                <>Room</>
            ) : (
                <>AC</>
            )}
        </div>
    )
}
