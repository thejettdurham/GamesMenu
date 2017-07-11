import { combineReducers } from 'redux';
import * as appReducer from './app'
import * as types from '../actions/types';

// Aggregate all reducers from imports
// export default combineReducers(Object.assign(
//   appReducer,
// ));


export default appStateReducer = (state, action) => {
    switch (action.type) {
        case types.CONFIRM_SELECTION: {
            // Append Active Selection to Confirmed Selections
            // Remove Active Selection
            // Remove SelectedGroupId
            // Remove ActiveScreenID
            // Disable nav buttons
            return state;
        }
        case types.DELETE_SELECTION: {
            // Remove confirmed selection at index given by action
            return state;
        }
        case types.SET_SELECTED_GROUP: {
            // If ActiveSelection defined
                // prompt user if they want to reset the active selection
                // if no return state

            // Set selected group id by given
            // Initialize ActiveSelection with groupId
            // Set ActiveScreenId = groupId (screen rendered from children of Id)
            let updated = Object.assign({}, state, {
                GroupContainer: {
                    SelectedGroupId: action.groupId
                }
            });

            return updated;
        }
        case types.SET_ITEM: {
            // Add chosen ItemId to ActiveSelection
            // Set LastScreenId = ActiveScreenId
            // If item has children, set ActiveScreen to ItemId
            return state;
        }
        case types.SET_MODIFIER_GROUP: {
            // If item has children, set ActiveScreen to ModGroupId
            return state;
        }
        case types.SET_MODIFIER: {
            // Append modifierId to modifiers array of active selection
            // Set ActiveScreenId = LastScreenId
            // Set LastScreenId = ActiveScreenId
            return state;
        }
        case types.UNDO_LAST_MOD: {
            // TODO need to use redux-undo's undo action creator here
            return state.past;
        }
        default: return state;
    }
};