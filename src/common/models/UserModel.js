export default class UserModel {
    constructor(data) {
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.mail = data.mail;
        this.mobile = data.mobile.replace('+', '');
        this.i_customer = data.i_customer;
        this.person_id = data.person_id;
    }

    getFirebaseDataStructure() {
        const profile = {
            displayName: this.firstname + ' ' + this.lastname,
            firstname: this.firstname,
            lastname: this.lastname,
            mail: this.mail,
            mobile: this.mobile,
            userPrincipalName: this.mail
        };

        const ref = {
            i_customer: this.i_customer,
            person_id: this.person_id
        };

        const register = {
            mobile: this.mobile,
            ts: new Date().getTime()
        };

        const verify = {
            code: 100000,
            entered: {
                code: 100000,
                ts: new Date().getTime()
            },
            ref: {
                i_customer: this.i_customer,
                person_id: this.person_id
            }
        };

        return { profile, ref, register, verify };
    }
}
