// @flow

import * as SelectionActions from './selection'
import * as GroupItemActions from './groupItem'
import * as NavActions from './nav'

// Aggregate all actions from imports
export const ActionCreators = Object.assign({},
    SelectionActions,
    GroupItemActions,
    NavActions,
);
