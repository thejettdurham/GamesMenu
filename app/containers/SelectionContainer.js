// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { View,Text } from 'react-native';

export default class SelectionContainer extends Component {
    render() {
        return(
            <View>
                <Text>Selection Container!</Text>
            </View>
        );
    }
}