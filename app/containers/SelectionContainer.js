// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { View,Text } from 'react-native';

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

function mapStateToProps(state) {
    return {};
}

class SelectionContainer extends Component {
    render() {
        return(
            <View>
                <Text>Selections</Text>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionContainer);