import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './style/App.css';
import { AppProvider } from './components/AppContext';
import Header from './components/Header';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Recipe from './pages/Recipe';

class App extends Component<{},{},any> {

	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<Router>
				<AppProvider>
					<Header />
					<div className='pageContainer'>
						<Route exact path='/' component={Home} />
						<Route exact path='/recipes' component={Recipes} />
						<Route path='/recipes/:recipeId' component={Recipe} />
					</div>
				</AppProvider>
			</Router>
		);
	}
}

export default App;
