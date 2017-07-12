import { Selection } from '../lib/appState';
import { Alert } from 'react-native';
import * as types from '../actions/types';

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
            let filteredSelections = state.SelectionContainer.ConfirmedSelections.filter((_, i) => i !== action.index);

            return Object.assign({}, state, {
                SelectionContainer: {
                    ConfirmedSelections: filteredSelections,
                    ActiveSelection: state.ActiveSelection,
                }
            });
        }
        case types.SET_SELECTED_GROUP: {
            // View logic ensures that old groupId !== action.groupId
            if (state.GroupContainer.SelectedGroupId === action.groupId) return state;

            let activeSelection = state.SelectionContainer.ActiveSelection;
            if (activeSelection !== undefined && activeSelection.ItemId !== 0) {
                let proceedWithChange = false;
                Alert.alert(
                    'Warning',
                    'Selecting a new group will erase your unsaved selection. Ok to proceed?',
                    [
                        {text: 'Cancel', onPress: () => proceedWithChange = false, style: 'cancel'},
                        {text: 'OK', onPress: () => proceedWithChange = true},
                    ],
                    { cancelable: false }
                );

                if (!proceedWithChange) return state;
            }

            let newSelection = new Selection(action.GroupId);

            return Object.assign({}, state, {
                SelectionContainer: {
                    ConfirmedSelections: state.ConfirmedSelections,
                    ActiveSelection: newSelection,
                },
                GroupContainer: {
                    SelectedGroupId: action.groupId
                },
                ItemContainer: {
                    ActiveScreenId: action.groupId
                },
            });
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
