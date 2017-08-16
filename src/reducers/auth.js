import * as Types from '../actions/types';

const initialState = {
    id: {},
    user: {},
    startup: false,
    actionType: ''
};

export default function(state = initialState, action) {
    state.actionType = action.type;

    if (action.type === Types.USER_LOADED) {
        return {
            ...state,
            user: action.payload
        };
    }

    if (action.type === Types.ID_LOADED) {
        return {
            ...state,
            id: action.payload
        };
    }

    if (action.type === Types.LOGGED_OUT) {
        return {
            ...initialState,
            requestDispatcher: state.requestDispatcher
        };
    }

    if (action.type === Types.STARTUP) {
        return {
            ...state
        };
    }

    return state;
}
