// @flow

import * as types from './types';

export function confirmSelection() {
    return {
        type: types.CONFIRM_SELECTION,
    };
}

export function deleteSelectionAtIndex(index: number) {
    return {
        type: types.DELETE_SELECTION,
        index: index,
    }
}