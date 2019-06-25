
export enum MeasurementTypes {
	CUP = 'cup',
	DASH = 'dash',
	LI = 'liter',
	ML = 'ml',
	OZ = 'oz',
	TBLSP = 'tbsp',
	TSP = 'tsp',
}

export class Ingredient {
	private _amount: number = 0;
	private _apiObj: any = {};
	private _id: number = 0;
	private _measurementType: MeasurementTypes = MeasurementTypes.OZ;
	private _name: string = '';

	constructor(apiObj?: any) {
		this._apiObj = apiObj;
	}

	get amount() {
		if (!this._amount && this._apiObj) {
			this._amount = this._apiObj.amount;
		}
		return this._amount;
	}

	set amount(amount: number) {
		this._amount = amount;
	}

	get id() {
		if (!this._id && this._apiObj) {
			this._id = this._apiObj.id;
		}
		return this._id;
	}

	set id(id: number) {
		this._id = id;
	}

	get measurementType() {
		if (!this._measurementType && this._apiObj) {
			this._measurementType === this._apiObj.measurement_type;
		}
		return this._measurementType;
	}

	set measurementType(type: MeasurementTypes) {
		this._measurementType = type;
	}

	get name() {
		if (!this._name && this._apiObj) {
			this._name = this._apiObj.name;
		}
		return this._name || "New Ingredient";
	}

	set name(name: string) {
		this._name = name;
	}

	/**
	 * Return only the public values with the exception of _id. This is used
	 * for JSON.stringify automatically
	 */
	toJSON() {
		const proto = Object.getPrototypeOf(this);
		const jsonObj: any = {};// Object.assign({}, this) as any;
		Object.entries(Object.getOwnPropertyDescriptors(proto))
			.filter(([key, descriptor]) => typeof descriptor.get === 'function')
			.map(([key, descriptor]) => {
				if (descriptor && key[0] !== '_') {
					try {
						const val = (this as any)[key];
						jsonObj[key] = val;
					}catch (e) {
						console.error(`Error calling getter ${key}`, e);
					}
				}
			});
		return jsonObj;
	}
}
