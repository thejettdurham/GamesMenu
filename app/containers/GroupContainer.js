// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { View,Text } from 'react-native';

export default class GroupContainer extends Component {
    render() {
        return(
            <View>
                <Text>Select A Group</Text>
            </View>
        );
    }
}