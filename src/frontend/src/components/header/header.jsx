import './header.css'
import {useSelector, useDispatch} from 'react-redux';
import { logout } from '../../redux/action';

const Header = () => {
    const {isLogged} = useSelector(state => state);
    const dispatch = useDispatch();

    return (
        <div className="header">
            <div className="logo-wrapper">
                <img className='logo' src={process.env.PUBLIC_URL + 'logo.png'} alt="logo"/>
                <span><p>To Do App</p></span> 
            </div>

            {isLogged ?  <div className="logout-wrapper">
                            <span onClick={() => {
                            localStorage.removeItem("user");
                            dispatch(logout());

                            }} className='logout'>Logout</span>
                        </div> : null}

        </div>
    )
}

export default Header;