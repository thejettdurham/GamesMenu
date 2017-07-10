// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const buttonColors = {
    disabled: {
        background: "#ffffff",
        foreground:"#aaa",
        underlay: "#fff",
    },
    enabled: {
        background: "#aec8d8",
        foreground:"#226099",
        underlay: "#fff",
    },
};

// TODO need dynamic behavior for nav buttons
export default class ItemContainer extends Component {
    undoPress() {
        console.log("Pressed undo");
    }

    acceptPress() {
        console.log("Pressed accept");
    }

    render() {
        return(
            <View style={styles.navContainer}>
                <View>
                    <TouchableHighlight
                        style={styles.navButton}
                        onPress={this.undoPress}
                        underlayColor={buttonColors.disabled.underlay}
                    >
                        <Icon style={styles.navIcon} name="undo" />
                    </TouchableHighlight>
                </View>

                <View>
                    <TouchableHighlight
                        style={styles.navButton}
                        onPress={this.acceptPress}
                        underlayColor={buttonColors.disabled.underlay}
                    >
                        <Icon style={styles.navIcon} name="check" />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    navContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    navButton: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: buttonColors.disabled.background,
        borderRadius: 70,
        height: 40,
        width: 40,
    },
    navIcon: {
        fontSize: 16,
        color: buttonColors.disabled.foreground,
        alignSelf: "center"
    }

});
