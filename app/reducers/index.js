import { Selection, } from '../lib/appState';
import { Alert } from 'react-native';
import * as types from '../actions/types';

export default appStateReducer = (state, action) => {
    console.log("Reducer entry");

    switch (action.type) {
        case types.CONFIRM_SELECTION: {
            let newConfirmedSelections = [];
            let lastConfirmedSelections = state.SelectionContainer.ConfirmedSelections;

            if (lastConfirmedSelections !== undefined && lastConfirmedSelections.length > 0) {
                newConfirmedSelections= [
                    state.SelectionContainer.ActiveSelection,
                    ...state.SelectionContainer.ConfirmedSelections,
                ]
            } else {
                newConfirmedSelections = [state.SelectionContainer.ActiveSelection];
            }

            return Object.assign({}, state, {
                SelectionContainer: {
                    ConfirmedSelections: newConfirmedSelections,
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
                    ActiveSelection: state.SelectionContainer.ActiveSelection,
                }
            });
        }

        case types.SET_SELECTED_GROUP: {
            // View logic ensures that old groupId !== action.groupId
            let newSelection = new Selection(action.groupId);

            return Object.assign({}, state, {
                SelectionContainer: {
                    ConfirmedSelections: state.SelectionContainer.ConfirmedSelections,
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
                    ActiveScreenId: state.ItemContainer.LastScreenId,
                }
            });
        }

        default: return state;
    }
};
