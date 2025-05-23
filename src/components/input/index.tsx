import { type FC, type RefObject, type HTMLAttributes } from 'react'
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
    ref?: RefObject<HTMLInputElement>,
} & HTMLAttributes<HTMLInputElement>

export const Input: FC<TProps> = ({name, type='text', value, onChange, beforeText, afterText, containerClassName='', ref, className='', label, }) => {
    return (
        <div className={`${styles.wrap} ${containerClassName}`}>
            {beforeText ? (
                <div className={styles.beforeText}>{beforeText}</div>
            ) : null}
            <div className={`${styles.inputWrap}`}>
                {label ? (
                    <div className={styles.label}>{label}</div>
                ) : null}
                <input 
                    className={`${styles.input} ${className}`} 
                    ref={ref} 
                    name={name} 
                    type={type} 
                    value={value} 
                    onChange={onChange} 
                />
            </div>
            {afterText ? (
                <div className={styles.afterText}>{afterText}</div>
            ) : null}
        </div>
    )
}
