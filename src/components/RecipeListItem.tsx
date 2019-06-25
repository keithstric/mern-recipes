import React from 'react';
import { Recipe } from '../api/recipe';
import Ripples from 'react-ripples';

interface IRecipeListItemProps {
	recipe: Recipe;
	onClick: any;
}

function RecipeListItem(props: IRecipeListItemProps) {
	const {recipe, onClick} = props;
	return (
		<div className="recipeListItem horizontal">
			<Ripples>
				<div
					className="recipeItemTextContainer horizontal"
					data-id={recipe.id}
					onClick={onClick}>
					<span className="recipeTitle">{recipe.title}</span>
					<span>{recipe.description}</span>
				</div>
			</Ripples>
		</div>
	);
}

export default RecipeListItem;
