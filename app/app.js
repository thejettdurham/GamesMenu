// @flow

import React, {Component} from 'react'
import AppContainer from './containers/AppContainer'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose} from 'redux'
import { createLogger } from 'redux-logger'
import reducers from './reducers'
import Orientation from 'react-native-orientation'
import AppState from './lib/appState'
import undoable from 'redux-undo'

//middleware that logs actions (only in Dev)
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(
            loggerMiddleware,
        ),
    );

    // Use redux-undo for easy undo behavior
    return createStore(undoable(reducers, {limit: 10}), initialState, enhancer);
}

export default class App extends Component {
    store: any;

    componentWillMount() {
        let initialState = new AppState();
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

