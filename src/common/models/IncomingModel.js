export default class IncomingModel {
    constructor(data) {
        this.code = data.code;
        this.number = data.number.replace('+', '');
        this.vpnId = data.vpnId;
    }

    getFirebaseDataStructure() {
        const caller = {
            code: this.code,
            number: this.number,
            vpnId: this.vpnId
        };
        return { caller, timestamp: new Date().getTime() };
    }
}
