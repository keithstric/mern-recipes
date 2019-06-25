import React, { Component } from 'react';

export interface IAppContext {
	user: any | undefined;
	header: string | undefined;
	socketId: string | undefined;
	setHeader: any,
	setSocketId: any
}

const AppContext = React.createContext({});

export class AppProvider extends Component {
	public state = {
		user: undefined,
		header: 'M.E.R.N Receipes',
		socketId: undefined
	};

	constructor(props: any) {
		super(props);
		this.setHeader = this.setHeader.bind(this);
		this.setSocketId = this.setSocketId.bind(this);
	}

	setHeader(header: string) {
		this.setState({header: header});
	}

	setSocketId(socketId: string) {
		this.setState({socketId: socketId});
	}

	render() {
		return (
			<AppContext.Provider
				value={{
					...this.state,
					setHeader: this.setHeader,
					setSocketId: this.setSocketId
				}}>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withAppContext<
	P extends { appContext?: IAppContext},
	R = Omit<P, "appContext">
>(
	Component: React.ComponentClass<P> | React.StatelessComponent<P>
): React.SFC<R> {
	return function BoundComponent(props: R) {
		return (
			<AppContext.Consumer>
				{state => <Component {...props as any} appContext={state} />}
			</AppContext.Consumer>
		);
	};
}

export const AppConsumer = AppContext.Consumer;

