'use strict';

import * as Firebase from 'firebase';

import Utils from './common/utils/utils.js';

import { UserModel, EmployeeModel, UsageModel, IncomingModel } from './common/models';

var firebaseConfig = {
    apiKey: 'AIzaSyAC8x6IbS7GsOL64-Y4e8tK1zdomZnukk4',
    authDomain: 'mobile-92966.firebaseapp.com',
    databaseURL: 'https://mobile-92966.firebaseio.com',
    storageBucket: 'mobile-92966.appspot.com',
    messagingSenderId: '12594811460'
};

const firebaseApp = Firebase.initializeApp(firebaseConfig);

let singleton = null;

export class ApiRequest {
    constructor() {
        this.auth = firebaseApp.auth();
        this.db = firebaseApp.database();
        this.storage = firebaseApp.storage();
        if (singleton == null) {
            singleton = this;
        }
    }

    static getInstance() {
        return singleton;
    }

    onAuthStateChanged(callback) {
        this.auth.onAuthStateChanged(user => callback(user));
    }

    signup(data) {
        return new Promise((next, error) => {
            this.auth
                .createUserWithEmailAndPassword(data.email, data.password)
                .then(user => next(user))
                .catch(signInError => error(signInError));
        });
    }

    sendVerificationEmail() {
        if (this.auth.currentUser) {
            return new Promise((next, error) => {
                this.auth.currentUser.sendEmailVerification().then(() => next()).catch(err => error(err));
            });
        }
    }

    deleteUser() {
        let user = this.auth.currentUser;
        if (user) {
            user
                .delete()
                .then(() => {
                    // User deleted.
                })
                .catch(error => {
                    // An error happened.
                    console.log('Delete User', error);
                });
        }
    }

    //For dummy Data
    createUserData(data, callback) {
        let userRef = this.loadUserRef();
        //Init User Data
        let user = new UserModel(data);
        let userData = user.getFirebaseDataStructure();

        //Init Usage Data
        let usage = new UsageModel(UsageModel.getInitData());
        let usageData = usage.getFirebaseDataStructure();

        // console.log('User Data', userData);
        userRef.set(userData, err => {
            if (err) {
                console.log('Create Data Err', err);
                this.deleteUser();
            } else {
                let profileRef = this.loadProfileRef(userData.ref.i_customer, userData.ref.person_id);
                let usageRef = this.loadUsageRef(userData.ref.i_customer, userData.ref.person_id);
                let incomingRef = this.loadIncomingCallRef(userData.ref.i_customer, userData.ref.person_id);

                let employee = new EmployeeModel(data);
                let empData = employee.getFirebaseDataStructure();

                let incoming = new IncomingModel({ code: 2, number: data.mobile, vpnId: 6221323 });
                let incomingData = incoming.getFirebaseDataStructure();
                // console.log('Emp data', empData);
                profileRef.set(empData, err => {
                    if (err) {
                        console.log('Create Emp Data err', err);
                        this.deleteUser();
                    } else {
                        if (callback) {
                            callback(empData);
                        }
                    }
                });

                usageRef.set(usageData, err => {
                    if (err) {
                        console.log('Create Usage Data err', err);
                    }
                });

                incomingRef.set(incomingData, err => {
                    if (err) {
                        console.log('Create Incoming Data err', err);
                    }
                });
            }
        });
    }

    logout() {
        if (this.auth.currentUser && this.auth.currentUser.providerData.length > 0) {
            if (this.auth.currentUser.providerData[0].providerId === 'google.com') {
                GoogleSignin.signOut()
                    .then(() => {
                        // console.log('out');
                    })
                    .catch(err => {});
            } else if (this.auth.currentUser.providerData[0].providerId === 'facebook.com') {
                LoginManager.logOut();
            }
        }
        this.auth.signOut();
    }

    getProfilePhoto(i_customer, person_id) {
        const imageRef = firebaseApp.storage().ref('/companies/' + i_customer + '/employees').child(person_id + '.jpg');
        return imageRef.getDownloadURL();
    }
    loadCustomerRef(i_customer) {
        return this.db.ref('/companies/' + i_customer);
    }

    // 21/07
    loadUsagePackgeRef() {
        return this.db.ref('/companies/qsoft/usage');
    }

    loadAuthNumberRef(phone) {
        return this.db.ref('/auth_numbers/' + phone);
    }

    loadAddonPackagesRef() {
        return this.db.ref('addon_packages');
    }
    loadActionsAddonPackagesRef() {
        return this.db.ref('actions/addon_package');
    }
    loadActionsTransferCallRef() {
        return this.db.ref('actions/transfer');
    }
    loadEmployeeSubRef(i_customer, person_id, sub) {
        return this.loadCustomerRef(i_customer).child(sub).child(person_id);
    }
    loadEmployeesRef(i_customer) {
        return this.loadCustomerRef(i_customer).child('employees');
    }
    loadUserRef() {
        return this.db.ref('/users/' + this.auth.currentUser.uid);
    }
    loadUserRefWithoutAuth(uid) {
        return this.db.ref('/users/' + uid);
    }
    loadIdRef() {
        return this.loadUserRef().child('ref');
    }
    loadRegisterRef() {
        return this.loadUserRef().child('register');
    }
    loadVerifyRef() {
        return this.loadUserRef().child('verify');
    }
    loadPresenceRef(i_customer, person_id) {
        return this.loadEmployeesRef(i_customer).child(person_id).child('presence');
    }
    loadCallsRef(i_customer, person_id) {
        return this.loadEmployeeSubRef(i_customer, person_id, 'log');
    }
    loadProfileRef(i_customer, person_id) {
        return this.loadEmployeeSubRef(i_customer, person_id, 'employees');
    }
    loadUsageRef(i_customer, person_id) {
        return this.loadEmployeeSubRef(i_customer, person_id, 'usage');
    }
    loadSubscriptionRef(i_customer, person_id) {
        return this.loadEmployeeSubRef(i_customer, person_id, 'subscription');
    }
    loadSimsRef(i_customer, person_id) {
        return this.loadEmployeeSubRef(i_customer, person_id, 'sims');
    }
    loadQueuesRef(i_customer, person_id) {
        return this.loadEmployeeSubRef(i_customer, person_id, 'queues');
    }
    loadOrderedPackagesRef(i_customer, person_id) {
        return this.loadEmployeeSubRef(i_customer, person_id, 'addon_packages');
    }
    loadIncomingCallRef(i_customer, person_id) {
        return this.loadEmployeeSubRef(i_customer, person_id, 'incoming');
    }
    loadConnectedRef() {
        return this.db.ref('.info/connected');
    }
    loadProfileImageRef(props) {
        try {
            return this.storage.ref('companies/' + props.id.i_customer + '/employees/' + props.id.person_id + '.jpg');
        } catch (error) {
            console.log(JSON.stringify(error));
            return null;
        }
    }

    sendResetPasswordEmail(email, callback) {
        this.auth
            .fetchProvidersForEmail(email)
            .then(result => {
                if (result && Array.isArray(result)) {
                    let isPasswordAuth = false;
                    for (let provider of result) {
                        if (provider == 'password') {
                            isPasswordAuth = true;
                            break;
                        }
                    }
                    if (isPasswordAuth) {
                        this.auth
                            .sendPasswordResetEmail(email)
                            .then(() => {
                                // Email sent.
                                if (callback && typeof callback === 'function') {
                                    callback(null);
                                }
                            })
                            .catch(error => {
                                // An error happened.
                                console.log('Reset pass', error);
                                if (callback && typeof callback === 'function') {
                                    callback(error);
                                }
                            });
                    } else {
                        // alert('This email is not registered or has been registered in social accounts');
                        callback('This email address has not existed, please check again');
                    }
                }
            })
            .catch(err => {
                console.log('Provider Email', err);
            });
    }

    loadEmployees(props) {
        if (this.employeesRef) {
            this.employeesRef.off();
        }
        let employees = [];
        this.employeesRef = this.loadEmployeesRef(props.id.i_customer).orderByChild('displayname');
        this.employeesRef.once('value', dataSnapshot => {
            const rawSource = dataSnapshot.val();
            // console.log('Emp: ', rawSource);
            for (let key in rawSource) {
                if (rawSource.hasOwnProperty(key)) {
                    let employee = rawSource[key];

                    employee.uid = key;
                    employee.image = employee.base64 ? 'data:image/png;base64,' + employee.base64 : null;

                    employees.push(employee);
                }
            }
            props.employeeSet(employees);
        });
        this.employeesRef.on('child_changed', dataSnapshot => {
            const employeeKey = dataSnapshot.key;
            let employee = dataSnapshot.val();
            // console.log('Child changed', employee);
            employee.uid = employeeKey;
            props.employeeChanged(employee);
        });
        this.employeesRef.on('child_removed', dataSnapshot => {
            const employeeKey = dataSnapshot.key;
            props.employeeRemoved(employeeKey);
        });
    }

    searchEmployees(props, searchText) {
        // if (!!this.employeesRef) return;
        searchText = Utils.capitalize(searchText);
        let employees = [];
        //First query by firstname
        let employeesFirstNameRef = this.loadEmployeesRef(props.id.i_customer)
            .orderByChild('firstname')
            .startAt(searchText);
        employeesFirstNameRef.once('value', dataSnapshot => {
            // console.log('First name Source', dataSnapshot.val());
            const firstnameSource = dataSnapshot.val();

            //Then query by last name
            let employeesLastNameRef = this.loadEmployeesRef(props.id.i_customer)
                .orderByChild('lastname')
                .startAt(searchText);

            employeesLastNameRef.once('value', dataSnapshot => {
                // console.log('Last name Source', dataSnapshot.val());
                const lastnameSource = dataSnapshot.val();
                //Merge two source to get result of searching both firstname and lastname
                const mergeSource = Utils.mergeObjects(firstnameSource, lastnameSource);

                // console.log('Merge Source', dataSnapshot.val());

                for (let key in mergeSource) {
                    if (mergeSource.hasOwnProperty(key)) {
                        let employee = mergeSource[key];

                        if (employee && employee.displayname.indexOf(searchText) >= 0) {
                            employee.uid = key;
                            employee.image = employee.base64 ? 'data:image/png;base64,' + employee.base64 : null;

                            employees.push(employee);
                        }
                    }
                }
                props.employeeSet(employees);
            });
        });
    }

    loadCalls(props) {
        const { i_customer, person_id } = props.id;
        if (this.callsRef) {
            this.callsRef.off();
        }
        this.callsRef = this.loadCallsRef(i_customer, person_id);
        this.callsRef.limitToFirst(15).on('child_added', dataSnapshot => {
            let call = dataSnapshot.val();
            call.id = dataSnapshot.key;
            props.callAdded(call);
        });
    }
    loadSims(props) {
        const { i_customer, person_id } = props.id;
        if (this.simsRef) {
            this.simsRef.off();
        }
        this.simsRef = this.loadSimsRef(i_customer, person_id);
        this.simsRef.on('value', dataSnapshot => {
            let sims = [];
            // let { orderedPackages } = props;
            dataSnapshot.forEach(function(ss) {
                try {
                    let p = ss.val();
                    const key = ss.key;

                    p['sid'] = key;
                    sims.push(p);
                } catch (err) {
                    console.log('Sims', err);
                }
            });
            props.simSet(sims);
        });
        // this.simsRef.on('child_added', dataSnapshot => {
        //     const simKey = dataSnapshot.key;
        //     let sim = dataSnapshot.val();
        //     sim.sid = simKey;
        //     props.simAdded(sim);
        // });
        // this.simsRef.on('child_changed', dataSnapshot => {
        //     const simKey = dataSnapshot.key;
        //     let sim = dataSnapshot.val();
        //     sim.sid = simKey;
        //     props.simChanged(sim);
        // });
        // this.simsRef.on('child_removed', dataSnapshot => {
        //     const simKey = dataSnapshot.key;
        //     props.simRemoved(simKey);
        // });
    }
    loadSubscription(props) {
        const { i_customer, person_id } = props.id;
        if (this.subscriptionRef) {
            this.subscriptionRef.off();
        }
        this.subscriptionRef = this.loadSubscriptionRef(i_customer, person_id);
        this.subscriptionRef.on('value', dataSnapshot => {
            let subscription = dataSnapshot.val();
            props.subscriptionUpdated(subscription);
        });
    }
    loadUsage(props) {
        const { i_customer, person_id } = props.id;
        if (this.usageRef) {
            this.usageRef.off();
        }
        this.usageRef = this.loadUsageRef(i_customer, person_id);
        this.usageRef.on('value', dataSnapshot => {
            let usage = dataSnapshot.val();
            // console.log('Usage', usage);
            props.usageUpdated(usage);
        });
    }
    loadQueues(props) {
        const { i_customer, person_id } = props.id;
        if (this.queuesRef) {
            this.queuesRef.off();
        }
        this.queuesRef = this.loadQueuesRef(i_customer, person_id);
        this.queuesRef.on('value', dataSnapshot => {
            let queues = [];
            // let { orderedPackages } = props;
            dataSnapshot.forEach(function(ss) {
                try {
                    let p = ss.val();
                    const key = ss.key;

                    p['qid'] = key;
                    queues.push(p);
                } catch (err) {
                    console.log('Queues', err);
                }
            });
            props.queueSet(queues);
        });
    }

    loadProfile(props) {
        const { i_customer, person_id } = props.id;
        props.idLoaded(props.id);
        // console.log('Id Loaded', props.id);
        this.getProfilePhoto(i_customer, person_id)
            .then(url => {
                props.profileImageChanged(url);
            })
            .catch(error => {
                console.log(error);
            });
        if (this.profileRef) {
            this.profileRef.off();
        }
        this.profileRef = this.loadProfileRef(i_customer, person_id);
        this.profileRef.on('value', snapshot => {
            let profile = snapshot.val();
            if (profile) {
                props.profileLoaded(profile);
                this.profileRef.on('value', snapshot => {
                    props.profileLoaded(snapshot.val());
                });
                this.presenceRef = this.loadPresenceRef(i_customer, person_id);
                this.presenceRef.on('value', dataSnapshot => {
                    let presence = dataSnapshot.val();
                    // console.log('Presence', presence);
                    props.presenceUpdated(presence);
                });
                this.incomingCallRef = this.loadIncomingCallRef(i_customer, person_id);
                this.incomingCallRef.on('value', dataSnapshot => {
                    let incomingCall = dataSnapshot.val();
                    props.incomingCallUpdated(incomingCall);
                });

                this.profileRef.off();
            }
        });
    }

    loadPackages(props) {
        if (this.packageRef) {
            this.packageRef.off();
        }
        this.packageRef = this.loadAddonPackagesRef();
        this.packageRef.once('value', dataSnapshot => {
            let packages = [];
            // let { orderedPackages } = props;
            dataSnapshot.forEach(function(ss) {
                try {
                    let p = ss.val();
                    const key = ss.key;

                    p['package_id'] = key;
                    packages.push(p);
                } catch (err) {
                    console.log('Packages', err);
                }
            });
            props.packageSet(packages);
        });
    }

    loadOrderedPackage(props) {
        const { id } = props;
        if (this.orderedPackageRef) {
            this.orderedPackageRef.off();
        }
        this.orderedPackageRef = this.loadOrderedPackagesRef(id.i_customer, id.person_id);
        this.orderedPackageRef.on('value', dataSnapshot => {
            let orderedPackages = dataSnapshot.val();
            // console.log('Order Package Change', dataSnapshot.val());
            props.orderedPackageSet(orderedPackages);
        });
    }

    loadVerify(props) {
        if (this.verifyRef) {
            this.verifyRef.off();
        }
        this.verifyRef = this.loadVerifyRef();
        this.verifyRef.on('value', dataSnapshot => {
            let verify = dataSnapshot.val();
            props.verifyUpdated(verify);
        });
    }

    orderPackage(callback, params) {
        if (this.actionsPackageRef) {
            this.actionsPackageRef.off();
        }
        this.actionsPackageRef = this.loadActionsAddonPackagesRef();
        this.actionsPackageRef.push().set(params, err => {
            callback(err, params);
        });
    }

    transferCall(callback, params) {
        if (this.transferCallRef) {
            this.transferCallRef.off();
        }
        this.transferCallRef = this.loadActionsTransferCallRef();
        this.transferCallRef.push().set(params, err => {
            callback(err, params);
        });
    }
}

export default new ApiRequest();
