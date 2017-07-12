// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { View, Text, TouchableHighlight, StyleSheet, ScrollView } from 'react-native';
import Branding from '../branding';

const buttonColors = {
    item: Branding.buttons.beta,
    modGroup: Branding.buttons.gamma,
    mod: Branding.buttons.delta,
};

const buttonColorsForSalesMode = {
    NORMAL: buttonColors.item,
    MODIFIER_GROUP: buttonColors.modGroup,
    MODIFIER: buttonColors.mod,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch)
}

function mapStateToProps(state) {
    return {
        Data: state.present.Data,
        LastScreenId: state.present.ItemContainer.LastScreenId,
        ActiveScreenId: state.present.ItemContainer.ActiveScreenId,
    };
}

class ItemContainer extends Component {
    getHeaderText = (): string  => {
        if (this.props.ActiveScreenId !== undefined) {
            let activeScreenInfo = this.props.Data.rawById[this.props.ActiveScreenId];
            let activeScreenChildren = this.props.Data.childrenById[this.props.ActiveScreenId];

            // Case of item with no modifiers
            if (activeScreenChildren === undefined) {
                return `No modifiers for ${activeScreenInfo.checkDesc}`;
            }

            switch (activeScreenInfo.salesMode) {
                case "BUTTON_ONLY":
                    return `Select item for ${activeScreenInfo.checkDesc}`;
                case "NORMAL":
                    return `Select modifier group for ${activeScreenInfo.checkDesc}`;
                case "MODIFIER_GROUP":
                    return `Select modifier for ${activeScreenInfo.checkDesc}`;
                default:
                    return "";
            }
        }

        return "";
    };

    dynamicStyler = (key: string, buttonId: number): any => {
        let btnInfo = this.props.Data.rawById[buttonId];
        let btnColor = buttonColorsForSalesMode[btnInfo.salesMode];

        switch(key) {
            case "itemButtonWrap": {
                return { backgroundColor: btnColor.background };
            }
            case "itemButtonWrap.underlay": {
                return btnColor.underlay;
            }
            case "itemButtonText": {
                return { color: btnColor.foreground };
            }
            default: {
                return {};
            }
        }
    };

    buttonPress = (buttonId: number): any => {
        console.log(`Pushed button ${buttonId}`);
        let activeScreenInfo = this.props.Data.rawById[this.props.ActiveScreenId];

        switch (activeScreenInfo.salesMode) {
            case "BUTTON_ONLY":
                return this.props.setItem(buttonId);
            case "NORMAL":
                return this.props.setModifierGroup(buttonId);
            case "MODIFIER_GROUP":
                return this.props.setModifier(buttonId);
            default:
                return;
        }
    };

    render() {
        console.log("Render ItemContainer");
        let buttonIds = this.props.Data.childrenById[this.props.ActiveScreenId];

        return(
            <View style={styles.containerWrap}>
                <Text style={styles.titleHeader}>{this.getHeaderText()}</Text>
                <View style={styles.buttonField}>{
                    buttonIds !== undefined
                    ? buttonIds.map((btnId) => {
                            let buttonInfo = this.props.Data.rawById[btnId];
                            let buttonText = buttonInfo.checkDesc + (buttonInfo.basePrice > 0 ? ` \$${buttonInfo.basePrice}` : '');

                            return (
                                <TouchableHighlight
                                    key={btnId}
                                    style={[styles.itemButtonWrap, this.dynamicStyler('itemButtonWrap', btnId)]}
                                    underlayColor={this.dynamicStyler('itemButtonWrap.underlay', btnId)}
                                    onPress={() => this.buttonPress(btnId)}
                                >
                                    <Text style={[styles.itemButtonText, this.dynamicStyler('itemButtonText', btnId)]}>
                                        {buttonText}
                                    </Text>
                                </TouchableHighlight>
                            );
                        })
                    : null
                }</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerWrap: {
        flex: 1
    },
    titleHeader: Branding.headers[0],
    buttonField: {
        paddingVertical: 10,
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingRight: 30,
    },
    itemButtonWrap: {
        backgroundColor: buttonColors.item.background,
        padding: 10,
        marginRight: 30,
    },
    itemButtonText: {
        color: buttonColors.item.foreground,
        alignSelf: "center",
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);