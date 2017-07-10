// @flow

import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const selectGroup = createReducer({}, {
    [types.SET_SELECTED_GROUP](state, action) {
        let newGroup = action.groupId;
        return state;
    },

});