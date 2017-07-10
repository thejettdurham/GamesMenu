// @flow

import * as types from './types';
import Selection from '../lib/appState';

export function confirmSelection(selection: Selection) {
    return {
        type: types.CONFIRM_SELECTION,
        selection: selection,
    };
}

export function deleteSelectionAtIndex(index: number) {
    return {
        type: types.DELETE_SELECTION,
        index: index,
    }
}