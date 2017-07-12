import { Selection, } from '../lib/appState';
import { Alert } from 'react-native';
import * as types from '../actions/types';

export default appStateReducer = (state, action) => {
    switch (action.type) {
        case types.CONFIRM_SELECTION: {
            return Object.assign({}, state, {
                SelectionContainer: {
                    ConfirmedSelections: [
                        ...state.SelectionContainer.ConfirmedSelections,
                        state.SelectionContainer.ActiveSelection,
                    ],
                },
                GroupContainer: {
                    
                },
                ItemContainer: {

                },
                NavContainer: {
                    ButtonIsEnabled: {
                        Undo: false,
                        Accept: false,
                    }
                }
            });
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
            let modifiedSelection = Object.assign({}, state.SelectionContainer.ActiveSelection, {
               ItemId: action.itemId,
            });

            return Object.assign({}, state, {
                SelectionContainer: {
                    ConfirmedSelections: state.SelectionContainer.ConfirmedSelections,
                    ActiveSelection: modifiedSelection,
                },
                ItemContainer: {
                    // Items with no modifiers are handled in the view layer
                    ActiveScreenId: action.itemId,
                },
                NavContainer: {
                    ButtonIsEnabled: {
                        Undo: true,
                        Accept: true,
                    }
                }
            });
        }

        case types.SET_MODIFIER_GROUP: {
            return Object.assign({}, state, {
                ItemContainer: {
                    LastScreenId: state.ItemContainer.ActiveScreenId,
                    ActiveScreenId: action.modGroupId,
                }
            });
        }

        case types.SET_MODIFIER: {
            let modifiedSelection = Object.assign({}, state.SelectionContainer.ActiveSelection, {
                Modifiers: [
                    ...state.SelectionContainer.ActiveSelection.Modifiers,
                    action.modId
                ],
            });

            return Object.assign({}, state, {
                SelectionContainer: {
                    ConfirmedSelections: state.SelectionContainer.ConfirmedSelections,
                    ActiveSelection: modifiedSelection,
                },
                ItemContainer: {
                    LastScreenId: state.ItemContainer.ActiveScreenId,
                    // Items with no modifiers are handled in the view layer
                    ActiveScreenId: action.modId,
                }
            });

            // Append modifierId to modifiers array of active selection
            // Set ActiveScreenId = LastScreenId
            // Set LastScreenId = ActiveScreenId
        }

        default: return state;
    }
};
