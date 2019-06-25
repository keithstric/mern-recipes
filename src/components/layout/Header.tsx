import React from 'react';
import logo from '../../images/logo.svg';
import { withAppContext } from '../AppContext';

import { Link } from 'react-router-dom';

function Header(props: any) {
	const {header} = props.appContext;
	return (
		<header className='App-header horizontal'>
			<div className="logoContainer headerItem">
				<img src={logo} className='App-logo' alt='logo' />
			</div>
			<div className="titleContainer headerItem">
				<h2>{header}</h2>
			</div>
			<div className="App-headerLinkContainer vertical headerItem">
				<ul className="appLinks">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/recipes">Recipes</Link>
					</li>
				</ul>
			</div>
		</header>
	);
}

export default withAppContext(Header);
