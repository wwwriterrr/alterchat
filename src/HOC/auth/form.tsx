import { useRef, useState } from 'react'
import { Input } from '../../components/input'
import styles from './form.module.css'

export const AuthForm = () => {
    const [form, setForm] = useState<{login: string, password: string}>({login: '', password: ''})

    const loginRef = useRef<HTMLInputElement>(null);
    const passwdRef = useRef<HTMLInputElement>(null);

    const loginChangeHandler = () => {
        if(!loginRef.current) return;

        setForm({...form, login: loginRef.current.value});
    }

    const passwdChangeHandler = () => {
        if(!passwdRef.current) return;

        setForm({...form, password: passwdRef.current.value});
    }

    return (
        <div className={styles.wrap}>
            <form className={styles.form}>
                <div className={styles.row}>
                    <Input 
                        inputRef={loginRef}
                        name='login' 
                        type='text' 
                        value={form.login} 
                        label='Логин / email'
                        onChange={loginChangeHandler} 
                        autoFocus
                    />
                </div>
                <div className={styles.row}>
                    <Input 
                        inputRef={passwdRef}
                        name='password' 
                        type='password' 
                        value={form.password} 
                        label='Пароль'
                        onChange={passwdChangeHandler} 
                    />
                </div>
            </form>
        </div>
    )
}
