// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, Alert } from 'react-native';
import Branding from '../branding';
import {Selection} from "../lib/appState";

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
    renderSelectionText = (selection: Selection, index: number)  => {
        let selectionGroup = selection.GroupId !== undefined ? this.props.Data.rawById[selection.GroupId] : undefined;
        let selectionItem = selection.ItemId !== undefined ? this.props.Data.rawById[selection.ItemId] : undefined;

        // Transform modifiersId array into an array of modifier objects from the data
        let selectionModifiers = selection.Modifiers !== undefined
            ? selection.Modifiers.reduce((agg, id) => agg.concat(this.props.Data.rawById[id]), [])
            : undefined;

        if (selectionGroup === undefined || selectionItem === undefined) return null;

        let totalPrice = selectionItem.basePrice;

        if (selectionModifiers !== undefined) {
            // Add basePrice of each modifier to the total price started earlier
            totalPrice = selectionModifiers.reduce((sum, mod) => sum + mod.basePrice, selectionItem.basePrice);
        }

        return (
            <View accessibilityLabel={`ctr_confirmed-selection-${index}`}>
                <Text style={{fontWeight: 'bold'}}>{selectionGroup.checkDesc}</Text>
                <Text>{selectionItem.checkDesc} - ${selectionItem.basePrice}</Text>
                {selectionModifiers !== undefined
                    ? selectionModifiers.map((mod, idx) => {
                        return (<Text key={idx}>  {mod.checkDesc}{mod.basePrice > 0 ? " - $" + mod.basePrice : ""}</Text>);
                    })
                    : null
                }
                <Text style={{fontStyle: 'italic'}}>Total Price - ${totalPrice}</Text>
            </View>
        );
    };

    deleteSelection = (index: number): any => {
        console.log(`Delete requested for selection ${index}`);

        let selectionInfo = this.props.ConfirmedSelections[index];
        let selectedGroupInfo = this.props.Data.rawById[selectionInfo.GroupId];
        let selectedItemInfo = this.props.Data.rawById[selectionInfo.ItemId];
        
        Alert.alert(
            'Warning',
            `Delete selection for ${selectedGroupInfo.checkDesc} - ${selectedItemInfo.checkDesc}?`,
            [
                {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                {text: 'OK', onPress: () => this.props.deleteSelectionAtIndex(index)},
            ],
            { cancelable: false }
        );
    };

    render() {
        console.log("Render SelectionContainer");
        return(
            <View style={styles.containerWrap} accessibilityLabel="ctr_selection">
                <Text style={styles.titleHeader}>Selections</Text>
                <View style={styles.activeSelectionWrap} accessibilityLabel="ctr_active-selections">{
                    this.props.ActiveSelection !== undefined && this.props.ActiveSelection.ItemId !== 0
                        ? this.renderSelectionText(this.props.ActiveSelection, 0)
                        : null
                }</View>
                <ScrollView style={styles.confirmedSelectionsWrap} accessibilityLabel="ctr_confirmed-selections">{
                    this.props.ConfirmedSelections !== undefined && this.props.ConfirmedSelections.length > 0
                        ? this.props.ConfirmedSelections.map((sel, idx) => {
                            return(
                                <TouchableHighlight
                                    key={idx}
                                    accessibilityLabel={`btn_confirmed-selection-${idx}`}
                                    style={styles.confirmedSelection}
                                    underlayColor='rgba(168, 46, 46, 0.3)'
                                    onLongPress={() => this.deleteSelection(idx)}
                                >
                                    {this.renderSelectionText(sel, idx)}
                                </TouchableHighlight>
                            );
                        })
                        : null
                }</ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerWrap: {
        flex: 1
    },
    titleHeader: Branding.headers[0],
    activeSelectionWrap: {
        minHeight: 60,
        paddingVertical: 10,
        marginVertical: 8,
        borderTopWidth: 1,
        borderTopColor: Branding.borders.light,
        borderBottomWidth: 1,
        borderBottomColor: Branding.borders.light,
    },
    confirmedSelectionsWrap: {
        paddingTop: 5
    },
    confirmedSelection: {
        borderWidth: 0.5,
        borderColor: Branding.borders.dark,
        padding: 10,
        marginVertical: 5,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectionContainer);
