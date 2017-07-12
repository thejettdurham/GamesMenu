// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Branding from '../branding';

const buttonColors = {
    disabled: Branding.buttons.disabled,
    enabled: Branding.buttons.alpha,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
    return {
        ButtonIsEnabled: state.present.NavContainer.ButtonIsEnabled,
    };
}

class ItemContainer extends Component {
    navButtonDynamicStyle = (buttonType: string): any => {
        return {
            backgroundColor: this.props.ButtonIsEnabled[buttonType] ? buttonColors.enabled.background : buttonColors.disabled.background,
        }
    };

    navIconDynamicStyle = (buttonType: string): any => {
        return {
            color: this.props.ButtonIsEnabled[buttonType] ? buttonColors.enabled.foreground : buttonColors.disabled.foreground,
        }
    };

    navUnderlayDynamicStyle = (buttonType: string): any => {
        return this.props.ButtonIsEnabled[buttonType] ? buttonColors.enabled.underlay : buttonColors.disabled.underlay;
    };

    undoPress() {
        if (!this.props.ButtonIsEnabled['Undo']) {
            console.log("Pressed undo while button disabled");
            return;
        }

        this.props.undo();
    }

    acceptPress() {
        if (!this.props.ButtonIsEnabled['Accept']) {
            console.log("Pressed accept while button disabled");
            return;
        }

        this.props.confirmSelection();
    }

    constructor(props) {
        super(props);

        this.navButtonDynamicStyle = this.navButtonDynamicStyle.bind(this);
        this.navIconDynamicStyle = this.navIconDynamicStyle.bind(this);
        this.navUnderlayDynamicStyle = this.navUnderlayDynamicStyle.bind(this);
    }

    render() {
        return(
            <View style={styles.navContainer}>
                <View>
                    <TouchableHighlight
                        style={[styles.navButtonBase, this.navButtonDynamicStyle('Undo')]}
                        onPress={this.undoPress.bind(this)}
                        underlayColor={this.navUnderlayDynamicStyle('Undo')}
                    >
                        <Icon style={[styles.navIconBase, this.navIconDynamicStyle('Undo')]} name="undo" />
                    </TouchableHighlight>
                </View>

                <View>
                    <TouchableHighlight
                        style={[styles.navButtonBase, this.navButtonDynamicStyle('Accept')]}
                        onPress={this.acceptPress.bind(this)}
                        underlayColor={this.navUnderlayDynamicStyle('Accept')}
                    >
                        <Icon style={[styles.navIconBase, this.navIconDynamicStyle('Accept')]} name="check" />
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
    navButtonBase: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: buttonColors.disabled.background,
        borderRadius: 70,
        height: 40,
        width: 40,
    },
    navIconBase: {
        fontSize: 16,
        color: buttonColors.disabled.foreground,
        alignSelf: "center"
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);
