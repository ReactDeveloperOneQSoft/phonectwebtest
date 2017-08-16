import _ from 'lodash';

export default class Utils {
    static capitalize(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    static extractPhonenumber(cellphone) {
        if (cellphone) {
            cellphone = cellphone.replace('+', '');
            if (cellphone.startsWith('47')) {
                cellphone = cellphone.substring(2);
            }
            return cellphone;
        }
        return '';
    }

    static unionArrays(x, y) {
        let obj = {};
        for (let i = x.length - 1; i >= 0; --i) obj[x[i]] = x[i];
        for (let i = y.length - 1; i >= 0; --i) obj[y[i]] = y[i];
        let res = [];
        for (let k in obj) {
            if (
                obj.hasOwnProperty(k) // <-- optional
            )
                res.push(obj[k]);
        }
        return res;
    }

    static mergeObjects(obj1, obj2) {
        let mergeObj = Object.assign({}, obj1);
        for (let key in obj2) {
            mergeObj[key] = obj2[key];
        }
        return mergeObj;
    }

    static toAscii(string) {
        let asciiKeys = [];
        for (var i = 0; i < string.length; i++) asciiKeys.push(string[i].charCodeAt(0));
        return asciiKeys;
    }

    static multisort(arr, columns, order_by) {
        if (typeof columns == 'undefined') {
            columns = [];
            for (let x = 0; x < arr[0].length; x++) {
                columns.push(x);
            }
        }

        if (typeof order_by == 'undefined') {
            order_by = [];
            for (let x = 0; x < arr[0].length; x++) {
                order_by.push('ASC');
            }
        }

        function multisort_recursive(a, b, columns, order_by, index) {
            try {
                var direction = order_by[index] == 'DESC' ? 1 : 0;

                var is_numeric = !isNaN(+a[columns[index]] - +b[columns[index]]);

                var x = is_numeric ? +a[columns[index]] : a[columns[index]].toLowerCase();
                var y = is_numeric ? +b[columns[index]] : b[columns[index]].toLowerCase();

                if (x < y) {
                    return direction == 0 ? -1 : 1;
                }

                if (x == y) {
                    return columns.length - 1 > index ? multisort_recursive(a, b, columns, order_by, index + 1) : 0;
                }

                return direction == 0 ? 1 : -1;
            } catch (err) {
                console.log('Sort err', err);
                return -1;
            }
        }

        return arr.sort(function(a, b) {
            return multisort_recursive(a, b, columns, order_by, 0);
        });
    }

    static generateUUID() {
        let d = new Date().getTime();
        let uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = ((d + Math.random() * 16) % 16) | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
    }

    static toAsciiChar(char) {
        return char.charCodeAt(0);
    }

    static validatePassword(password) {
        if (password && password.length >= 6) {
            for (let i = 0; i < password.length; i++) {
                let asciiKey = Utils.toAsciiChar(password[i]);
                if (asciiKey < 33 || asciiKey > 126) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    static isEquals(obj1, obj2) {
        let isEqual = _.isEqual(obj1, obj2);
        return isEqual;
    }

    static cloneObject(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}
