// @flow

import React, {Component} from 'react'
import { AppRegistry, Text, View } from 'react-native'
// import AppContainer from './containers/AppContainer'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose} from 'redux'
import { createLogger } from 'redux-logger'
// import reducer from './reducers'

//middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(
            loggerMiddleware,
        ),
    );

    const myTemporaryReducer = () => {};
    return createStore(myTemporaryReducer, initialState, enhancer);
}

const store = configureStore({});


export default class App extends Component {
    render() {
        return(
            <Provider store={store}>
                <View>
                    <Text>
                        Look ma, I'm an app!
                    </Text>
                </View>

                {/*<AppContainer />*/}
            </Provider>
        );
    }
}

