import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faUser, faKey, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import style from './Login.module.scss';
import { useState } from 'react';
import { portfolioAPI } from '../../services/portfolio-service';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Login() {
    const [loginSuccess, setLoginSuccess] = useState(true);
    const { userLogin } = useAuthContext();
    const navigate = useNavigate();

    function loginHandler(e: React.SyntheticEvent) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        let { username, password } = Object.fromEntries(formData);

        username = username as string;
        password = password as string;

        if (username.trim() !== '' && password.trim() !== '') {
            portfolioAPI
                .authenticate({ username, password })
                .then(loginData => {
                    userLogin(loginData);
                    setLoginSuccess(true);
                    navigate('/admin/dashboard');
                })
                .catch(err => {
                    setLoginSuccess(false);
                    console.error(err);
                });
        } else {
            setLoginSuccess(false);
        }
    }

    return (
        <div className={style.background}>
            <article className={style.container}>
                <header className={style['form-header']}><h2>Вход</h2></header>
                {!loginSuccess
                    ?
                    <>
                        <FontAwesomeIcon
                            icon={faExclamationTriangle}
                            className={style['login-warning-icon']}
                        />
                        <h4 className={style['form-validation-msg']}>Невалидно потребителско име или парола</h4>
                    </>
                    : null
                }
                <form className={style.form} autoComplete="off" onSubmit={loginHandler}>
                    <div className={style['input-container']}>
                        <FontAwesomeIcon className={style.icon} icon={faUser} />
                        <input
                            onChange={() => setLoginSuccess(true)}
                            style={loginSuccess ? {} : { borderBottomColor: 'red' }}
                            type="text"
                            placeholder={'Потребителско име'}
                            name='username'
                        />
                    </div>
                    <div className={style['input-container']}>
                        <FontAwesomeIcon className={style.icon} icon={faKey} />
                        <input
                            onChange={() => setLoginSuccess(true)}
                            style={loginSuccess ? {} : { borderBottomColor: 'red' }}
                            type="password"
                            placeholder={'Парола'}
                            name='password'
                        />
                    </div>
                    <div className={style['button-container']}>
                        <FontAwesomeIcon className={style['continue-icon']} icon={faRightToBracket} />
                        <input
                            style={{ marginTop: 5 }}
                            className={style['submit-btn']}
                            type="submit"
                            value="Продължи"
                        />
                    </div>
                </form>
            </article>
        </div >
    )
}