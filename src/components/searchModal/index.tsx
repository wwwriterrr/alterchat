import { useEffect, useLayoutEffect, useRef, useState, type FC } from 'react'
import styles from './styles.module.css'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { AutocompleteFetch } from '../../services/autocomplete/actions'
import { getAutocompleteItems, getAutocompleteLoading, TAcItem } from '../../services/autocomplete/slice'
import { LoaderIcon } from '../icons'
import { AutocompleteItem } from './searchItem'
import { TRoom, TUser } from '../../core/types'

type TProps = {
    onItemSelect?: (item: TUser | TRoom | TAcItem) => void,
    placeholder?: string,
    autoFocus?: boolean,
}

export const AppSearchModal: FC<TProps> = ({
    onItemSelect,
    placeholder='Начните вводить имя',
    autoFocus,
}) => {
    const dispatch = useAppDispatch();

    const autocompleteItems = useAppSelector(getAutocompleteItems);
    const autocompleteLoading = useAppSelector(getAutocompleteLoading);

    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string>('');

    let to: number | undefined;

    const changeHandler = () => {
        setValue(inputRef.current?.value || '');
    }

    const focusHandler = () => {
        if(!value && !autocompleteItems.length){
            const controller = new AbortController();
            inputHandler(controller.signal);
        }
    }

    const inputHandler = (signal: AbortSignal) => {
        // console.log('send ac request', signal);
        dispatch(AutocompleteFetch({param: 'users', q: inputRef.current?.value || '', signal}))
    }

    useLayoutEffect(() => {
        if(autoFocus){
            inputRef.current?.focus();
        }
    }, [])

    useEffect(() => {
        const controller = new AbortController();
        to = setTimeout(() => inputHandler(controller.signal), 400);

        return () => {
            clearTimeout(to);
            controller.abort();
        }
    }, [value])

    return (
        <div className={styles.wrap}>
            <div className={styles.inputWrap}>
                <input 
                    ref={inputRef} 
                    className={styles.input}
                    type="text" 
                    name="ac_input"
                    value={value}
                    onChange={changeHandler}
                    onFocus={focusHandler}
                    placeholder={placeholder}
                />
            </div>
            <div className={styles.items}>
                {autocompleteLoading ? (
                    <div className={styles.loader}>
                        <LoaderIcon size={18} fill="#444" />
                    </div>
                ) : null}
                {autocompleteItems.length ? (
                    <>
                        {autocompleteItems.map((item, i) => (
                            <AutocompleteItem item={item} key={`ac_item-${i}`} onClick={onItemSelect} />
                        ))}
                    </>
                ) : (
                    <div className={styles.empty}>
                        Результатов не найдено
                    </div>
                )}
            </div>
        </div>
    )
}
