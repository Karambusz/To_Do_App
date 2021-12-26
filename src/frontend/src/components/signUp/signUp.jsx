import './signUp.css';
import { useState } from 'react';
import { validateTextField, validateLoginAndPasswordField, postData} from '../../service/service';

const SingUp = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const [nameClass, setNameClass] = useState('form-control');
    const [surnameClass, setSurnameClass] = useState('form-control');
    const [loginClass, setLoginClass] = useState('form-control');
    const [passwordClass, setPasswordClass] = useState('form-control');

    const validateFields = () => {
        return !(validateTextField(name) || validateTextField(surname) || validateLoginAndPasswordField(login) || validateLoginAndPasswordField(password));
    }

    const clearErrorAfterFocus = (setter) => {
        setMessage(null);
        setter('form-control');
    }

    const clearForm = () => {
        setName('');
        setSurname('');
        setLogin('');
        setPassword('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name,
            surname,
            login,
            password
        }

        if (validateFields()) {
            postData(`${process.env.REACT_APP_API_ROOT_URL}/signup`, JSON.stringify(data))
                .then(res => {
                    if (res.status === 200) {
                        setMessage(<span><p className='success'>Udało się, teraz możesz zalogować się!</p></span>);
                        clearForm();
                    } else if (res.status === 400) {
                        setMessage(<span><p className='warning'>Użytkownik z takim loginem już istnieje!</p></span>); 
                    } 
                    else {
                        setMessage(<span><p className='warning'>Coś poszło nie tak :(</p></span>); 
                    }
                })
                .catch(e => {
                    setMessage(<span><p className='warning'>Coś poszło nie tak :(</p></span>); 
                    console.log(e)
                });
        } else {
            validateTextField(name) ? setNameClass("form-control error") : setNameClass("form-control");
            validateTextField(surname) ? setSurnameClass("form-control error") : setSurnameClass("form-control");
            validateLoginAndPasswordField(login) ? setLoginClass("form-control error") : setLoginClass("form-control");
            validateLoginAndPasswordField(password) ? setPasswordClass("form-control error") : setPasswordClass("form-control");
        }
    }

    return (
        <div className="sign-up-wrapper">
            <form method='POST' onSubmit={handleSubmit}>
                <h2>Brak konta?</h2>
                <span>Zarejestruj się za pomocą logina i hasła</span>
                <div>
                    <label htmlFor="sign-up-name" className="name-label">Imię</label>
                    <input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        onFocus={() => clearErrorAfterFocus(setNameClass)}
                        type="text" className={nameClass} 
                        id="sign-up-name" 
                        placeholder="Twoje imię" 
                        required/>
                </div>
                <div>
                    <label htmlFor="sign-up-surname" className="surname-label">Nazwisko</label>
                    <input 
                        value={surname} 
                        onChange={(e) => setSurname(e.target.value)} 
                        onFocus={() => clearErrorAfterFocus(setSurnameClass)}
                        type="text" className={surnameClass} 
                        id="sign-up-surname" 
                        placeholder="Twoje nazwisko" 
                        required/>
                </div>
                <div>
                    <label htmlFor="sign-up-login" className="login-label">Login</label>
                    <input 
                        value={login} 
                        onChange={(e) => setLogin(e.target.value)} 
                        onFocus={() => clearErrorAfterFocus(setLoginClass)}
                        type="text"
                        className={loginClass} 
                        id="sign-up-login" 
                        placeholder="Twój login" 
                        required/>
                </div>
                <div>
                    <label htmlFor="sign-up-password" className="password-label">Hasło</label>
                    <input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        onFocus={() => clearErrorAfterFocus(setPasswordClass)}
                        type="password" 
                        className={passwordClass} 
                        id="sign-up-password" 
                        placeholder="Twoje hasło" 
                        autoComplete="on" 
                        required/>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary">
                    Zarejestruj się
                </button>
                {message}
                {/* <span><p>Udało się</p></span> */}
            </form>
        </div>
    )
}

export default SingUp;