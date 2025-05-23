import { useCallback, useRef, useState } from 'react'
import { Input } from '../../components/input'
import styles from './form.module.css'

export const AuthForm = () => {
    const [form, setForm] = useState<{login: string, password: string}>({login: '', password: ''})

    const loginRef = useRef<HTMLInputElement>(null);

    const loginChangeHandler = useCallback(() => {
        if(!loginRef.current) return;

        setForm({...form, login: loginRef.current.value});
    }, [form, setForm])

    return (
        <div className={styles.wrap}>
            <form className={styles.form}>
                <div className={styles.row}>
                    <Input 
                        name='login' 
                        type='text' 
                        value={form.login} 
                        onChange={loginChangeHandler} 
                    />
                </div>
            </form>
        </div>
    )
}
