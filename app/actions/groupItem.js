// @flow

import * as types from './types';

export function setSelectedGroup(groupId: number) {
    return {
        type: types.SET_SELECTED_GROUP,
        groupId: groupId
    };
}

export function setItem(itemId: number) {
    return {
        type: types.SET_ITEM,
        itemId: itemId,
    }
}

export function setModifierGroup(modGroupId: number) {
    return {
        type: types.SET_MODIFIER_GROUP,
        modGroupId: modGroupId,
    }
}

export function setModifier(modId: number) {
    return {
        type: types.SET_MODIFIER,
        modId: modId,
    }
}
