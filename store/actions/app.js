export const SELECT_NAV = 'SELECT_NAV';

export const selectNavigator = (navi) => {
    return { 
        type: SELECT_NAV, 
        naviStack: navi 
    };
};