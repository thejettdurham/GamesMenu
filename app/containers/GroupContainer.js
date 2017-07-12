// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Alert, StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Branding from '../branding';

const buttonColors = {
    selected: Branding.buttons.epsilon,
    unselected: Branding.buttons.alpha,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

function mapStateToProps(state) {
    return {
        Data: state.present.Data,
        SelectedGroupId: state.present.GroupContainer.SelectedGroupId,
        ActiveSelection: state.present.SelectionContainer.ActiveSelection,
    }
}

class GroupContainer extends Component {
    state: any;

    dynamicStyler = (componentType: string, groupId: number): any => {
        switch(componentType) {
            case "groupButtonWrap": {
                let bgColor = (this.props.SelectedGroupId === groupId)
                    ? buttonColors.selected.background : buttonColors.unselected.background;

                return { backgroundColor: bgColor };
            }
            case "groupButtonWrap.underlay": {
                if (this.props.SelectedGroupId === groupId) return buttonColors.selected.underlay;

                return buttonColors.unselected.underlay;
            }
            case "groupButtonText": {
                let fgColor = (this.props.SelectedGroupId === groupId)
                    ? buttonColors.selected.foreground : buttonColors.unselected.foreground;

                return { color: fgColor };
            }
            default: {
                return {};
            }
        }
    };

    groupButtonPress = (groupId: number): any => {
        if (this.props.SelectedGroupId === groupId) {
            console.log(`Pressed already selected group ${groupId}`);
            return;
        }

        console.log(`Press new group ${groupId}`);

        if (this.props.ActiveSelection !== undefined && this.props.ActiveSelection.ItemId !== 0) {
            Alert.alert(
                'Warning',
                'Selecting a new group will erase your unsaved selection. Ok to proceed?',
                [
                    {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                    {text: 'OK', onPress: () => this.props.setSelectedGroup(groupId)},
                ],
                { cancelable: false }
            );

            return;
        }

        this.props.setSelectedGroup(groupId);
    };

    render() {
        console.log("Render GroupContainer");
        return(
            <View style={styles.containerWrap}>
                <Text style={styles.titleHeader}>
                    Select A Group
                </Text>
                <View style={styles.groupButtonRow}>
                {this.props.Data.groupIds.map((groupId) => {
                    return (
                        <TouchableHighlight
                            key={groupId}
                            style={[styles.groupButtonWrap, this.dynamicStyler('groupButtonWrap', groupId)]}
                            underlayColor={this.dynamicStyler('groupButtonWrap.underlay', groupId)}
                            onPress={() => this.groupButtonPress(groupId)}
                        >
                            <Text style={[styles.groupButtonText, this.dynamicStyler('groupButtonText', groupId)]}>
                                {this.props.Data.rawById[groupId].checkDesc}
                            </Text>
                        </TouchableHighlight>
                    );
                })}
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    containerWrap: {
        flex: 1
    },
    titleHeader: Branding.headers[0],
    groupButtonRow: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    groupButtonWrap: {
        backgroundColor: buttonColors.unselected.background,
        padding: 10,
        marginRight: 30,
    },
    groupButtonText: {
        color: buttonColors.unselected.foreground,
        alignSelf: "center",
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupContainer);
