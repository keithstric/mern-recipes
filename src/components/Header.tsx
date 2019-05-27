import React from 'react';
import logo from '../images/logo.svg';
import { withAppContext } from './AppContext';

function Header(props: any) {
	const {header} = props.appContext;
	return (
		<header className='App-header'>
			<img src={logo} className='App-logo' alt='logo' />
			<h2>{header}</h2>
		</header>
	);
}

export default withAppContext(Header);
