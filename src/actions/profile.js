import * as Types from './types';
import Utils from '../common/utils/utils';

export function profileLoaded(profile) {
    return {
        type: Types.PROFILE_LOADED,
        payload: profile
    };
}

export function profileChanged(profile) {
    return {
        type: Types.PROFILE_CHANGED,
        payload: profile
    };
}

export function profileImageChanged(url) {
    return {
        type: Types.PROFILE_IMAGE_CHANGED,
        payload: url
    };
}

export function personIdLoaded(person_id) {
    return {
        type: Types.PERSON_ID_LOADED,
        payload: person_id
    };
}
