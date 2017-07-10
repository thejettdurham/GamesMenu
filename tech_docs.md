# Technical Documentation

This is a record of my communications and thoughts through implementing the challenge

## Initial Challenge Statement

Create a single screen divided into left and right sections. On the left, display a list of selected items (will be empty at first). On the right, display the menu. When a menu item is selected, show it in the list on the left along with its modifiers. The menu structure is broken up into 3 sections: Groups, Items, Modifiers. When a group is selected, show its items below. When an item is selected, replace item selection with modifier selection, but leave groups visible.

## Requirement Clarification

`Can a selected item have more than one modifier? My naive assumption is to say yes.`

**Yea, it can have more than one modifier.**

`Do you have a preference on the device size for which the UI should be optimized? The only physical device I have available for testing is my Nexus 6P`

**No preference but our current target is the Samsung 8".**

## Process

- Force Landscape Orientation
- Redux for state management (copy app structure from peckish app)
    - I was interested in a pattern for logically separating the actions and reducers. I pulled this in from the peckish project, but I designed my app state in such a way that its methodology for composing reducers wasn't easily compatible. So, for now, I'm working from a single reducer function where common functionality is split into utility functions. 
- React Navigation for Items - ModGrp - ModItems  sub screen
    - Initial try before fully implementing state: Got it to render as a sub-component, but it seems at cursory glance that it's only possible to have a stylizable navigator by implementing a fully customized one. For this reason, I think react-navigation is overkill for my use-case, and I think the relatively simple functionality required for this app can be handled with redux directly.
- App State:
    - SelectionContainer
        - ConfirmedSelections? (array of selections, shape of which defined below)
        - ActiveSelection?
            - groupId: number
            - itemId: number
            - modifiers: array<number>
    - GroupContainer
        - SelectedGroup?
    - ItemContainer
        - ActiveScreenId?
    - NavContainer
        - ButtonIsEnabled
            - undo: bool
            - accept: bool