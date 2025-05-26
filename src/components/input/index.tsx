import { type FC, type RefObject, type HTMLAttributes, useState, useEffect, useLayoutEffect } from 'react'
import styles from './styles.module.css'

type TProps = {
    beforeText?: string,
    afterText?: string,
    label?: string,
    containerClassName?: string,
    name?: string,
    type?: string,
    value: string,
    onChange: () => void,
    inputRef?: RefObject<HTMLInputElement>,
    autoFocus?: boolean,
    autoComplete?: string,
} & HTMLAttributes<HTMLInputElement>

export const Input: FC<TProps> = ({
    name, 
    type='text', 
    value, 
    onChange, 
    beforeText, 
    afterText, 
    containerClassName='', 
    inputRef, 
    className='', 
    label, 
    autoFocus, 
    autoComplete='off'
}) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    
    const focusHandler = () => {
        setIsFocus(true);
    }

    const blurHandler = () => {
        setIsFocus(false);
    }

    useLayoutEffect(() => {
        if(autoFocus){
            if(inputRef?.current){
                inputRef.current.focus();
            }
        }
    }, [])

    return (
        <div className={`${styles.wrap} ${containerClassName}`}>
            {beforeText ? (
                <div className={styles.beforeText}>{beforeText}</div>
            ) : null}
            <div className={`${styles.inputWrap} ${label ? styles.inputWrapLabel : ''} ${value === '' ? '' : styles.notEmpty} ${isFocus ? styles.focus : ''}`}>
                {label ? (
                    <div className={styles.label}>{label}</div>
                ) : null}
                <input 
                    className={`${styles.input} ${className}`} 
                    ref={inputRef} 
                    name={name} 
                    type={type} 
                    value={value} 
                    onChange={onChange} 
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                    autoComplete={autoComplete}
                />
            </div>
            {afterText ? (
                <div className={styles.afterText}>{afterText}</div>
            ) : null}
        </div>
    )
}
