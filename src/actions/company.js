import * as Types from './types';
import Utils from '../common/utils/utils';

export function employeeAdded(employee) {
    return {
        type: Types.EMPLOYEE_ADDED,
        payload: employee
    };
}

export function employeeRemoved(employee) {
    return {
        type: Types.EMPLOYEE_REMOVED,
        payload: employee
    };
}

export function employeeChanged(employee) {
    return {
        type: Types.EMPLOYEE_CHANGED,
        payload: employee
    };
}

export function employeeSet(employees) {
    let returnList = [];
    if (employees && Array.isArray(employees)) {
        for (let emp of employees) {
            if (emp && emp.presence && emp.presence.user && emp.presence.phone) {
                emp['userStatus'] = emp.presence.user.status;
                returnList.push(emp);
            }
        }

        Utils.multisort(returnList, ['userStatus', 'firstname'], ['ASC', 'ASC']);
    }
    return {
        type: Types.EMPLOYEE_SET,
        payload: returnList
    };
}

export function simSet(sims) {
    let payload = [];
    if (sims) {
        if (Array.isArray(sims)) {
            for (let p of sims) {
                if (p) {
                    payload.push(Object.assign({}, p));
                }
            }
        } else {
            //Get object values because firebase returns a object inside a object when have only 1 item in array
            for (let key in sims) {
                if (sims.hasOwnProperty(key)) {
                    let values = sims[key];
                    // console.log('Value', values);
                    payload.push(values);
                }
            }
        }
    }
    return {
        type: Types.SIM_SET,
        payload
    };
}

export function simAdded(sim) {
    return {
        type: Types.SIM_ADDED,
        payload: sim
    };
}

export function simRemoved(sim) {
    return {
        type: Types.SIM_REMOVED,
        payload: sim
    };
}

export function simChanged(sim) {
    return {
        type: Types.SIM_CHANGED,
        payload: sim
    };
}
export function callAdded(call) {
    return {
        type: Types.CALL_ADDED,
        payload: call
    };
}

export function subscriptionUpdated(subscription) {
    return {
        type: Types.SUBSCRIPTION_UPDATED,
        payload: subscription
    };
}

export function usageUpdated(usage) {
    return {
        type: Types.USAGE_UPDATED,
        payload: usage
    };
}

export function presenceUpdated(presence) {
    return {
        type: Types.PRESENCE_UPDATED,
        payload: presence
    };
}

export function queueSet(queues) {
    let payload = [];
    if (queues) {
        if (Array.isArray(queues)) {
            for (let p of queues) {
                if (p) {
                    payload.push(Object.assign({}, p));
                }
            }
        } else {
            //Get object values because firebase returns a object inside a object when have only 1 item in array
            for (let key in queues) {
                if (queues.hasOwnProperty(key)) {
                    let values = queues[key];
                    // console.log('Value', values);
                    payload.push(values);
                }
            }
        }
    }
    return {
        type: Types.QUEUE_SET,
        payload: payload
    };
}

export function queueAdded(queue) {
    return {
        type: Types.QUEUE_ADDED,
        payload: queue
    };
}

export function queueRemoved(queue) {
    return {
        type: Types.QUEUE_REMOVED,
        payload: queue
    };
}

export function queueChanged(queue) {
    return {
        type: Types.QUEUE_CHANGED,
        payload: queue
    };
}

export function packageAdded(p) {
    return {
        type: Types.PACKAGE_ADDED,
        payload: p
    };
}

export function packageChanged(p) {
    return {
        type: Types.PACKAGE_CHANGED,
        payload: p
    };
}

export function packageRemoved(p) {
    return {
        type: Types.PACKAGE_REMOVED,
        payload: p
    };
}

export function packageSet(p) {
    return {
        type: Types.PACKAGE_SET,
        payload: p
    };
}

export function orderedPackageSet(packages) {
    let payload = [];
    if (packages) {
        if (Array.isArray(packages)) {
            for (let p of packages) {
                if (p) {
                    payload.push(Object.assign({}, p));
                }
            }
        } else {
            //Get object values because firebase returns a object inside a object when have only 1 item in array
            for (let key in packages) {
                if (packages.hasOwnProperty(key)) {
                    let values = packages[key];
                    // console.log('Value', values);
                    payload.push(values);
                }
            }
        }
    }
    return {
        type: Types.ORDERED_PACKAGE_SET,
        payload
    };
}

export function orderedPackageAdded(p) {
    return {
        type: Types.ORDERED_PACKAGE_ADDED,
        payload: p
    };
}

export function orderedPackageChanged(p) {
    return {
        type: Types.ORDERED_PACKAGE_CHANGED,
        payload: p
    };
}

export function orderedPackageRemoved(p) {
    return {
        type: Types.ORDERED_PACKAGE_REMOVED,
        payload: p
    };
}

export function orderedPackageLoaded(loaded) {
    return {
        type: Types.ORDERED_PACKAGE_LOADED,
        payload: loaded
    };
}

export function incomingCallUpdated(incoming) {
    return {
        type: Types.INCOMING_CALL_UPDATED,
        payload: incoming
    };
}

export function verifyUpdated(verify) {
    return {
        type: Types.VERIFY_UPDATED,
        payload: verify
    };
}
