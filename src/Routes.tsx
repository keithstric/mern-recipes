import React from 'react';
import { Route } from 'react-router';

import App from './App';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import Recipes from './pages/Recipes';

const Routes = (props: any) => {
	return (
		<App>
			<Route exact path='/' component={Home} />
			<Route exact path='/recipes' component={Recipes} />
			<Route path='/recipes/:recipeId' component={Recipe} />
		</App>
	);
}

export default Routes;
