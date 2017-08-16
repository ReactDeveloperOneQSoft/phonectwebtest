import * as Types from '../actions/types';

const initialState = {
    sims: [],
    employees: [],
    calls: [],
    subscription: {},
    usage: {},
    presence: {},
    queues: [],
    incomingCall: {},
    availablePackages: [],
    orderedPackages: [],
    orderedPackagedLoaded: false,
    verify: {},
    actionType: ''
};

export default function(state = initialState, action) {
    state.actionType = action.type;

    if (action.type === Types.COMPANY_LOADED) {
        return {
            ...state,
            i_customer: action.payload
        };
    }

    if (action.type === Types.EMPLOYEE_ADDED) {
        return {
            ...state,
            employees: action.payload
        };
    }
    if (action.type === Types.EMPLOYEE_REMOVED) {
        let employees = state.employees;
        employees = employees.filter(val => action.payload !== val.uid);
        return {
            ...state,
            employees: employees
        };
    }
    if (action.type === Types.EMPLOYEE_CLEAR) {
        let employees = state.employees;
        employees = employees.filter(val => action.payload !== val.uid);
        return {
            ...state,
            employees: employees
        };
    }

    if (action.type === Types.EMPLOYEE_CHANGED) {
        let oldEmployees = state.employees;
        let employee = action.payload;
        let index = oldEmployees.findIndex(emp => {
            return emp.uid === employee.uid;
        });
        oldEmployees[index] = Object.assign({}, oldEmployees[index], employee);
        return {
            ...state,
            employees: oldEmployees.slice()
        };
    }
    if (action.type === Types.EMPLOYEE_SET) {
        return {
            ...state,
            employees: action.payload
        };
    }
    if (action.type === Types.SIM_SET) {
        return {
            ...state,
            sims: action.payload
        };
    }
    if (action.type === Types.SIM_ADDED) {
        let sims = state.sims;
        return {
            ...state,
            sims: sims.concat(action.payload)
        };
    }
    if (action.type === Types.SIM_REMOVED) {
        let sims = state.sims;
        sims = sims.filter(val => action.payload !== val.uid);
        return {
            ...state,
            sims: sims
        };
    }
    if (action.type === Types.SIM_CHANGED) {
        let oldSims = state.sims;
        let sim = action.payload;
        let index = oldSims.findIndex(s => {
            return s.uid === sim.uid;
        });
        oldSims[index] = Object.assign({}, oldSims[index], sim);
        return {
            ...state,
            sims: oldSims.slice()
        };
    }
    if (action.type === Types.CALL_ADDED) {
        let calls = state.calls;
        return {
            ...state,
            calls: calls.concat(action.payload)
        };
    }
    if (action.type === Types.SUBSCRIPTION_UPDATED) {
        return {
            ...state,
            subscription: action.payload
        };
    }
    if (action.type === Types.USAGE_UPDATED) {
        return {
            ...state,
            usage: action.payload
        };
    }
    if (action.type === Types.PRESENCE_UPDATED) {
        let presence = action.payload;
        if (!presence.user && state.presence.user && new Date().getTime() - state.presence.ts < 2000) {
            return {
                ...state
            };
        }
        return {
            ...state,
            presence: action.payload
        };
    }

    if (action.type === Types.QUEUE_SET) {
        return {
            ...state,
            queues: action.payload
        };
    }

    if (action.type === Types.QUEUE_ADDED) {
        let queues = state.queues;
        return {
            ...state,
            queues: queues.concat(action.payload)
        };
    }
    if (action.type === Types.QUEUE_REMOVED) {
        let queues = state.queues;
        queues = queues.filter(val => action.payload !== val.uid);
        return {
            ...state,
            queues: queues
        };
    }
    if (action.type === Types.QUEUE_CHANGED) {
        let oldQueues = state.queues;
        let queue = action.payload;
        let index = oldQueues.findIndex(que => {
            return que.qid === queue.qid;
        });
        oldQueues[index] = queue;
        return {
            ...state,
            queues: oldQueues.concat()
        };
    }

    if (action.type === Types.PACKAGE_ADDED) {
        let p = state.availablePackages;
        return {
            ...state,
            availablePackages: p.concat(action.payload)
        };
    }

    if (action.type === Types.PACKAGE_REMOVED) {
        let p = state.availablePackages;
        p = p.filter(val => action.payload !== val.uid);
        return {
            ...state,
            availablePackages: p
        };
    }

    if (action.type === Types.PACKAGE_CHANGED) {
        let oldPackages = state.availablePackages;
        let p = action.payload;
        let index = oldPackages.findIndex(p => {
            return p.qid === p.qid;
        });
        oldPackages[index] = p;
        return {
            ...state,
            availablePackages: oldPackages.concat()
        };
    }

    if (action.type === Types.PACKAGE_SET) {
        return {
            ...state,
            availablePackages: action.payload && Array.isArray(action.payload) ? action.payload.slice() : []
        };
    }

    if (action.type === Types.ORDERED_PACKAGE_SET) {
        return {
            ...state,
            orderedPackages: action.payload
        };
    }

    if (action.type === Types.ORDERED_PACKAGE_ADDED) {
        let p = state.orderedPackages;
        return {
            ...state,
            orderedPackages: p.concat(action.payload)
        };
    }

    if (action.type === Types.ORDERED_PACKAGE_REMOVED) {
        let oldPackages = state.orderedPackages.slice();
        let index = oldPackages.findIndex(p => {
            return p.package_id == action.payload.package_id;
        });
        oldPackages.splice(index, 1);
        // console.log('Ordered Package Removed', oldPackages);
        return {
            ...state,
            orderedPackages: oldPackages
        };
    }

    if (action.type === Types.ORDERED_PACKAGE_CHANGED) {
        let oldPackages = state.orderedPackages;
        let p = action.payload;
        let index = oldPackages.findIndex(p => {
            return p.package_id === action.payload.package_id;
        });
        oldPackages[index] = p;
        return {
            ...state,
            orderedPackages: oldPackages.concat()
        };
    }

    if (action.type === Types.ORDERED_PACKAGE_LOADED) {
        return {
            ...state,
            orderedPackagedLoaded: action.payload
        };
    }

    if (action.type === Types.INCOMING_CALL_UPDATED) {
        return {
            ...state,
            incomingCall: action.payload
        };
    }

    if (action.type === Types.VERIFY_UPDATED) {
        return {
            ...state,
            verify: action.payload
        };
    }

    return state;
}
