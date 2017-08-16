import * as Types from './types';
import Utils from '../common/utils/utils';

export function userLoaded(user) {
    return {
        type: Types.USER_LOADED,
        payload: user
    };
}

export function idLoaded(id) {
    return {
        type: Types.ID_LOADED,
        payload: id
    };
}

export function loggedOut() {
    return {
        type: Types.LOGGED_OUT
    };
}

export function updateAppStarted() {
    return {
        type: Types.STARTUP
    };
}
