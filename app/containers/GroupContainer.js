// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
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
    }
}

class GroupContainer extends Component {
    state: any;

    dynamicStyler = (componentType: string, groupId?: number): any => {
        switch(componentType) {
            case "groupButtonWrap": {
                if (groupId === undefined) {
                    throw 'GroupContainer dynamic styler called without required groupId';
                }

                let bgColor = (this.props.SelectedGroupId === groupId)
                    ? buttonColors.selected.background : buttonColors.unselected.background;

                return { backgroundColor: bgColor };
            }
            case "groupButtonWrap.underlay": {
                if (groupId === undefined) {
                    throw 'GroupContainer dynamic styler called without required groupId';
                }

                if (this.props.SelectedGroupId === groupId) return buttonColors.selected.underlay;

                return buttonColors.unselected.underlay;
            }
            case "groupButtonText": {
                if (groupId === undefined) {
                    throw 'GroupContainer dynamic styler called without required groupId';
                }

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
        this.props.setSelectedGroup(groupId);
    };

    constructor(props) {
        super(props);

        this.groupButtonPress = this.groupButtonPress.bind(this);
        this.dynamicStyler = this.dynamicStyler.bind(this);
    }

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
        justifyContent: 'space-around',
    },
    groupButtonWrap: {
        backgroundColor: buttonColors.unselected.background,
        padding: 10,
    },
    groupButtonText: {
        color: buttonColors.unselected.foreground,
        alignSelf: "center",
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupContainer);