export default class UsageModel {
    constructor(data) {
        this.calledMins = data.calledMins;
        this.noCalls = data.noCalls;
        this.callUsed = data.callUsed;
        this.sms = data.sms;
        this.smsUsed = data.smsUsed;
        this.subscription = data.subscription;
        this.subscriptionUsed = data.subscriptionUsed;
    }

    getFirebaseDataStructure() {
        const calls = {
            mins: this.calledMins,
            noCall: this.noCalls,
            used: this.callUsed
        };

        const sms = {
            sms: this.sms,
            used: this.smsUsed
        };

        const subscription = {
            subscription: this.subscription,
            used: this.subscriptionUsed
        };

        return { calls, sms, subscription };
    }

    static getInitData() {
        let data = {
            calledMins: 250,
            noCalls: 0,
            callUsed: 0,
            sms: 250,
            smsUsed: 0,
            subscription: 5000,
            subscriptionUsed: 0
        };
        return data;
    }
}
