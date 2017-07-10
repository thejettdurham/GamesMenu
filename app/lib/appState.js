// @flow

import data from './data'

class Selection {
    GroupId: number;
    ItemId: number;
    Modifiers: Array<number>;
}

class MappedData {
    rawById: any;
    childrenById: any;
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

function mapInputDataToState(data: any): MappedData {
    console.log(data);
    // TODO Implement input data to state mapping
    // map data:
    // raw lookup by id
    // groups: [101, 102]
    // children by id
    /*
        children = {
            101: [201,202],
            102: [203,204],
            201: [301],
            202: [302],
            203: [],
            204: [303],
            301: [401],
            302: [402],
            303: [405,406],
            401: [],
            402: [],
            403: [],
            405: [],
            406: [],
        }
     */
    return new MappedData();
}