import { SELECT_NAV } from "../actions/app";

const initialState = {
    stack: 'home'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECT_NAV: 
            return {
                ...state,
                stack: action.naviStack
            };

        default:
            return state;
    }
};