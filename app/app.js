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

const store = configureStore({});


export default class App extends Component {
    componentDidMount() {
        // this locks the view to Portrait Mode
        Orientation.lockToLandscapeLeft();
    }

    render() {
        return(
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}

