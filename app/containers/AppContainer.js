// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { View,Text,StyleSheet } from 'react-native'
import Branding from '../branding';
import GroupContainer from './GroupContainer'
import ItemContainer from './ItemContainer'
import SelectionContainer from './SelectionContainer'
import NavContainer from './NavContainer'

export default class AppContainer extends Component {
    render() {
      return (
          <View style={styles.root}>
              <View style={styles.leftPane}>
                  <SelectionContainer style={styles.leftPane}/>
              </View>
              <View style={styles.rightPane}>
                  <View style={styles.rightTopPane}>
                      <GroupContainer />
                  </View>
                  <View style={styles.rightMiddlePane}>
                      <ItemContainer />
                  </View>
                  <View style={styles.rightBottomPane}>
                      <NavContainer />
                  </View>
              </View>
          </View>
      );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'row',
    },
    leftPane: {
        flex: 1,
        borderRightColor: Branding.borders.dark,
        borderRightWidth: 1,
        padding: 10,
    },
    rightPane: {
        flex: 2,
        flexDirection: 'column',
    },
    rightTopPane: {
        flex: 1,
        borderBottomColor: Branding.borders.dark,
        borderBottomWidth: 1,
        padding: 10,
    },
    rightMiddlePane: {
        flex: 2.5,
        padding: 10,
    },
    rightBottomPane: {
        flex: 0.5,
        padding: 10,
    }
});