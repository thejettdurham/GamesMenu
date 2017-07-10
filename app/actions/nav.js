// @flow

import * as types from './types';

export function navBack() {
    return {
        type: types.ITEM_NAV_BACK
    }
}

export function navFwd() {
    return {
        type: types.ITEM_NAV_FWD
    }
}

export function undo() {
    return {
        type: types.UNDO_LAST_MOD
    }
}