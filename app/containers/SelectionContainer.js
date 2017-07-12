// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import Branding from '../branding';

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

function mapStateToProps(state) {
    return {
        Data: state.present.Data,
        ConfirmedSelections: state.present.SelectionContainer.ConfirmedSelections,
        ActiveSelection: state.present.SelectionContainer.ActiveSelection,
    };
}

class SelectionContainer extends Component {
    render() {
        console.log("Render SelectionContainer");
        return(
            <ScrollView style={styles.containerWrap}>
                <Text style={styles.titleHeader}>Selections</Text>
                <View style={styles.confirmedSelectionsWrap}>{
                    this.props.ConfirmedSelections !== undefined && this.props.ConfirmedSelections.length > 0
                        ? this.props.ConfirmedSelections.map((sel, idx) => {
                            return(
                                <TouchableHighlight
                                    key={idx}
                                    style={styles.confirmedSelection}
                                    underlayColor='#eee'
                                    onPress={() => console.log(`Pushed selection ${idx}`)}
                                >
                                    <Text>{JSON.stringify(sel)}</Text>
                                </TouchableHighlight>
                            );
                        })
                        : null
                }</View>
                <View style={styles.activeSelectionWrap}>{
                    this.props.ActiveSelection !== undefined && this.props.ActiveSelection.ItemId !== 0
                        // TODO proper rendering
                        ? <Text>{JSON.stringify(this.props.ActiveSelection)}</Text>
                        : null
                }</View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    containerWrap: {
        flex: 1
    },
    titleHeader: Branding.headers[0],
    confirmedSelectionsWrap: {

    },
    confirmedSelection: {

    },
    activeSelectionWrap: {

    },
    activeSelection: {

    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectionContainer);
