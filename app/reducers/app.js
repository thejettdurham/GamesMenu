// @flow

import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const SelectionContainer = createReducer({}, {
    [types.CONFIRM_SELECTION](state, action) {
        // append selection from action to confirmed selections
        // Initialize active selection
    },
    [types.DELETE_SELECTION](state, action) {
        // Remove element from confirmed selection at given index from action
    }
});

export const GroupContainer = createReducer({}, {
    [types.SET_SELECTED_GROUP](state, action) {
        // Get selected group id from action
        // If (active group id == selected group id) return state

        // If active selection not empty
            // Ask if user wants to empty selection
            // If no: return state

        // Add group id to active selection
        // Set child screen as ItemContainer.ActiveScreenId

    },
    [types.CONFIRM_SELECTION](state, action) {

    }

});