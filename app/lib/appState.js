// @flow

import data from './data'
import _ from 'lodash'

export class Selection {
    GroupId: number;
    ItemId: number;
    Modifiers: Array<number>;

    constructor(groupId: number = 0) {
        this.GroupId = groupId;
        this.ItemId = 0;
        this.Modifiers = [];
    }
}

class MappedData {
    rawById: any;
    groupIds: any;
    childrenById: any;

    constructor() {
        this.rawById = {};
        this.groupIds = [];
        this.childrenById = {};
    }
}

export default class AppState {
    SelectionContainer: {
        ConfirmedSelections?: Array<Selection>,
        ActiveSelection?: Selection,
    };

    GroupContainer: {
        SelectedGroupId?: number
    };

    ItemContainer: {
        LastScreenId?: number,
        ActiveScreenId?: number
    };

    NavContainer: {
        ButtonIsEnabled: {
            Undo: bool,
            Accept: bool,
        },
    };

    Data: MappedData;

    constructor() {
        this.SelectionContainer = {};
        this.GroupContainer = {};
        this.ItemContainer = {};
        this.NavContainer = {};
        this.NavContainer.ButtonIsEnabled = {};
        this.NavContainer.ButtonIsEnabled.Undo = false;
        this.NavContainer.ButtonIsEnabled.Accept = false;
        this.Data = mapInputDataToState(data);
    }
}

// Maps the raw input data into a more usable structure for building and managing the app UI.
function mapInputDataToState(data: any): MappedData {
    let mapped = new MappedData();

    let rawMapper = (obj: any) => {
        // Aggregate the groupIds for the GroupContainer
        if (obj.salesMode === "BUTTON_ONLY") mapped.groupIds.push(obj.id);

        if (obj.hasOwnProperty('childMenuItems')) {
            let children = obj.childMenuItems;

            // removing the child items keeps the rawItem map lightweight
            obj = _.omit(obj, 'childMenuItems');
            mapped.childrenById[obj.id] = [];

            children.forEach((child) => {
                // Aggregate the child node ids into a hashmap by parent id for easy scaffolding of the items for a given parent
                mapped.childrenById[obj.id].push(child.id);

                // Of course, run this function again recursively for each child.
                rawMapper(child);
            })
        }

        // Aggregate the raw button objects into a hashmap by id for easy lookup in the app
        mapped.rawById[obj.id] = obj;
    };

    data.menuItems.forEach(x => rawMapper(x));
    return mapped;t
}
