import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {setUser} from './../../redux/action';
import {postData} from '../../service/service';

import './signIn.css';

const SingIn = () => {
    const {isLogged} = useSelector(state => state);
    const dispatch = useDispatch();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [loginClass, setLoginClass] = useState('form-control');
    const [passwordClass, setPasswordClass] = useState('form-control');


    const clearErrorAfterFocus = (setter) => {
        setMessage(null);
        setter('form-control');
    }

    const setFieldError = () => {
        setLoginClass("form-control error");
        setPasswordClass("form-control error")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            login,
            password
        }

        postData(`${process.env.REACT_APP_API_ROOT_URL}/signin`, JSON.stringify(data))
            .then(res => {
                if (res.status === 200) {
                    const userData = res.user;
                    delete userData['password'];
                    dispatch(setUser(userData));
                    localStorage.setItem("user", JSON.stringify(userData));
                } else if (res.status === 400) {
                    setMessage(<span><p className='warning'>{res.message}</p></span>); 
                    setFieldError();
                }
                else {
                    setMessage(<span><p className='warning'>Coś poszło nie tak :(</p></span>); 
                    setFieldError();
                }
            })
            .catch(e => {
                setMessage(<span><p className='warning'>Coś poszło nie tak :(</p></span>); 
                console.log(e)
            });
    }



    return (
        <div className="sign-in-wrapper">
            <form method='POST' onSubmit={handleSubmit}>
                <h2>Posiadasz konto?</h2>
                <span>Zaloguj się za pomocą logina i hasła</span>
                <div>
                    <label htmlFor="sign-in-login" className="login-label">Login</label>
                    <input
                    value={login} 
                    onChange={(e) => setLogin(e.target.value)}
                    onFocus={() => clearErrorAfterFocus(setLoginClass)}  
                    type="text" 
                    className={loginClass} 
                    id="sign-in-login" 
                    placeholder="Twój login" 
                    required/>
                </div>
                <div>
                    <label htmlFor="sign-in-password" className="password-label">Hasło</label>
                    <input 
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => clearErrorAfterFocus(setPasswordClass)}  
                    className={passwordClass} 
                    id="sign-in-password" 
                    placeholder="Twoje hasło" 
                    autoComplete="on"
                    required/>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary">
                    Załoguj się
                </button>
                {message}
            </form>
            {isLogged ? <Redirect to="/main"/> : null}
        </div>
    )
}

export default SingIn;