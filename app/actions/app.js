// @flow

import * as types from './types';

export function setSelectedGroup(groupName: string) {
    return {
        type: types.SET_SELECTED_GROUP,
        group: groupName
    };
}