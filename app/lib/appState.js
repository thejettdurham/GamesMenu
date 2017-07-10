// @flow

class Selection {
    GroupId: number;
    ItemId: number;
    Modifiers: Array<number>;
}

// TODO not sure yet how I'm going to use this. Currently, I can't assign this to the inital state. The reducers have to be shaped first I think.
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

    constructor() {
        this.SelectionContainer = {};
        this.GroupContainer = {};
        this.ItemContainer = {};
        this.NavContainer = {};
        this.NavContainer.ButtonIsEnabled = {};
        this.NavContainer.ButtonIsEnabled.Undo = false;
        this.NavContainer.ButtonIsEnabled.Accept = false;
    }
}