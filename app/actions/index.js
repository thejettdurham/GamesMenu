// @flow

import * as SelectionActions from './selection'
import * as GroupItemActions from './groupItem'
import * as NavActions from './nav'
import { ActionCreators as UndoActions } from 'redux-undo'

// Aggregate all actions from imports
export const ActionCreators = Object.assign({},
    SelectionActions,
    GroupItemActions,
    NavActions,
    UndoActions,
);
