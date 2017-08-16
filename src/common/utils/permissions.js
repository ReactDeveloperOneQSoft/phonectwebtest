import { PermissionsAndroid } from 'react-native';

export default class PermissionUtils {
    static checkAndRequestCallPermission(callback) {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CALL_PHONE)
            .then(result => {
                // console.log('Check Call permision', result);

                if (result == false) {
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CALL_PHONE)
                        .then(granted => {
                            if (callback && typeof callback == 'function') {
                                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                    callback(true);
                                } else {
                                    callback(false);
                                }
                            }
                        })
                        .catch(err => {
                            console.log('Request Call Permission', err);
                        });
                } else {
                    callback(true);
                }
            })
            .catch(err => {
                console.log('Permission err', err);
            });
    }
}
