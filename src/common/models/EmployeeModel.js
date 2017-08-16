export default class EmployeeModel {
    constructor(data) {
        this.cellphone = data.mobile.replace('+', '');
        this.firstname = data.firstname;
        this.lastname = data.lastname;
    }

    getFirebaseDataStructure() {
        const presence = {
            phone: {
                status: 0,
                ts: new Date().getTime()
            },
            user: {
                status: 0,
                ts: new Date().getTime()
            }
        };
        const displayname = this.firstname + ' ' + this.lastname;

        return {
            firstname: this.firstname,
            lastname: this.lastname,
            displayname,
            presence,
            cellphone: this.cellphone
        };
    }
}
