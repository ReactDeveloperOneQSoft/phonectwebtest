import * as Types from '../actions/types';

const initialState = {
    profile: {},
    profileImageUrl: '',
    actionType: ''
};

export default function(state = initialState, action) {
    state.actionType = action.type;

    if (action.type === Types.PROFILE_LOADED) {
        return {
            ...state,
            profile: action.payload
        };
    }

    if (action.type === Types.PROFILE_CHANGED) {
        return {
            ...state,
            profile: Object.assign({}, state.profile, action.payload)
        };
    }
    if (action.type === Types.PROFILE_IMAGE_CHANGED) {
        return {
            ...state,
            profileImageUrl: action.payload
        };
    }

    return state;
}
