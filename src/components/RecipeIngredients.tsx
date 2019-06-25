import React, { Component } from 'react';
import { Ingredient } from '../api/ingredient';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Ripples from 'react-ripples';

interface IRecipeIngredientsProps {
	ingredients: Ingredient[];
}

class RecipeIngredients extends Component<IRecipeIngredientsProps> {

	constructor(props: IRecipeIngredientsProps) {
		super(props);
		this.onChangeHandler = this.onChangeHandler.bind(this);
	}

	onChangeHandler(evt: any) {
		console.log('RecipeIngredients.onChangeHandler', evt);
		const fieldName = evt.currentTarget.name;
		const fieldValue = evt.currentTarget.value;
	}

	render() {
		const {ingredients} = this.props;
		return (
			<React.Fragment>
				{ingredients.map((item) => (
					<div className="ingredient horizontal" key={item.id}>
						<div className="formRow">
							<label>Amount</label>
							<input
								type="number"
								name="amount"
								onChange={this.onChangeHandler}
								value={item.amount} />
						</div>
						<div className="formRow">
							<label>Measurement Type</label>
							<select
								name="measurementType"
								onChange={this.onChangeHandler}
								value={item.measurementType}>
								<option>cup</option>
								<option>dash</option>
								<option>liter</option>
								<option>ml</option>
								<option>oz</option>
								<option>tbsp</option>
								<option>tsp</option>
							</select>
						</div>
						<div className="formRow">
							<label>Name</label>
							<input
								type="text"
								name="name"
								onChange={this.onChangeHandler}
								value={item.name} />
						</div>
						<div className="smallActionButtonContainer">
							<Ripples>
								<button
									type="button"
									className="deleteIngredientButton">
										<FontAwesomeIcon
											className="deleteItemIcon fa-fw"
											icon={faTrashAlt}
										/>
								</button>
							</Ripples>
						</div>
					</div>
				))}
			</React.Fragment>
		);
	}
}

export default RecipeIngredients;
