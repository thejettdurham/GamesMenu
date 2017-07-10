// @flow

import React, {Component} from 'react'
import AppContainer from './containers/AppContainer'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose} from 'redux'
import { createLogger } from 'redux-logger'
import reducers from './reducers'
import Orientation from 'react-native-orientation'

//middleware that logs actions (only in Dev)
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(
            loggerMiddleware,
        ),
    );

    return createStore(reducers, initialState, enhancer);
}

export default class App extends Component {
    store: any;

    componentWillMount() {
        // TODO Map game data to initial state

        let initialState = {};
        this.store = configureStore(initialState);
    }

    componentDidMount() {
        // this locks the view to Landscape Mode
        Orientation.lockToLandscapeLeft();
    }

    render() {
        return(
            <Provider store={this.store}>
                <AppContainer />
            </Provider>
        );
    }
}

