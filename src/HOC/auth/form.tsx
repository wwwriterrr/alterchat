import { type FormEventHandler, useRef, useState } from 'react'
import { Input } from '../../components/input'
import styles from './form.module.css'
import { LoaderIcon } from '../../components/icons'
import { useAppDispatch } from '../../services/store'
import { AuthLogin } from '../../services/auth/actions'

export const AuthForm = () => {
    const [form, setForm] = useState<{login: string, password: string}>({login: '', password: ''})
    const [load, setLoad] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const dispatch = useAppDispatch();

    const loginRef = useRef<HTMLInputElement>(null);
    const passwdRef = useRef<HTMLInputElement>(null);

    const loginChangeHandler = () => {
        if(!loginRef.current) return;

        setError('');

        setForm({...form, login: loginRef.current.value});
    }

    const passwdChangeHandler = () => {
        if(!passwdRef.current) return;

        setError('');

        setForm({...form, password: passwdRef.current.value});
    }

    const submitHandler: FormEventHandler = (e) => {
        e.preventDefault();

        setError('');

        const login = loginRef.current?.value;
        const password = passwdRef.current?.value;

        if(!login || !password){
            setError('Заполните обязательные поля');
            return;
        }

        setLoad(true);
        dispatch(AuthLogin({login, password}))
            .then(action => {
                if(action.type === AuthLogin.rejected.type){
                    setError(action.payload as string);
                    console.log('reject', action);
                }
            })
            .finally(() => setLoad(false))

        return false;
    }

    return (
        <div className={styles.wrap}>
            <form className={`${styles.form} ${load ? styles.formLoad : ''}`} onSubmit={submitHandler}>
                {load ? (
                    <div className={styles.loader}>
                        <LoaderIcon size={32} fill='#346dc6' />
                    </div>
                ) : null}
                <div className={styles.row}>
                    
                </div>
                <div className={styles.row} style={{textAlign: 'center', opacity: .7}}>
                    Для начала общения необходимо авторизоваться
                </div>
                {error ? (
                    <div className={styles.row} style={{color: 'red', textAlign: 'center', fontWeight: 'bold'}}>
                        {error}
                    </div>
                ) : null}
                <div className={styles.row}>
                    <Input 
                        inputRef={loginRef}
                        name='login' 
                        type='text' 
                        value={form.login} 
                        label='Логин / email'
                        onChange={loginChangeHandler} 
                        autoComplete={'off'}
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
                <div className={styles.row}>
                    <button type={'submit'} className={styles.submit} disabled={load}>
                        Войти
                    </button>
                </div>
            </form>
        </div>
    )
}
