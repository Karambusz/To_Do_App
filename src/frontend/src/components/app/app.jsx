import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import AuthPage from "../auth/authPage";
import MainPage from '../main/mainPage';
import {useSelector} from 'react-redux';
import Header from "../header/header";

import './app.css';

const App = () => {
	const {isLogged} = useSelector(state => state);

    return (
		<Router>
			<div className="app">
				<Header/>
				<Switch>
					<Route exact path="/" render={()=> !isLogged ?  (<AuthPage/>) : (<MainPage/>)}/>
					<Route exact path='/main' render={()=> !isLogged ?  (<Redirect to='/'/>) : (<MainPage/>)}/>
				</Switch>
				
			</div>
		</Router>
    );
}

export default App;
  