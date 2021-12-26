import SingIn from "../signIn/signIn";
import SingUp from "../signUp/signUp";

import './authPage.css'

const AuthPage = () => {
    return (
        <div className="auth-page">
            <SingIn/>
            <SingUp/>
        </div>
    )
}

export default AuthPage;