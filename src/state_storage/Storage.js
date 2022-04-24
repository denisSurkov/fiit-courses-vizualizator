import Update from "./Update.js";

//TODO: async for setValue???
export default class Storage {
    constructor() {
        this.valueByKey = {}
        this.callbackByKey = {}
    }

    /*
        function callback(update: Update) {
        }
    */
    register(key, callback) {
        if (!this.callbackByKey[key]) {
            this.callbackByKey[key] = [callback];
        } else {
            this.callbackByKey[key].push(callback);
        }
    }

    getValue(key) {
        return this.valueByKey[key]
    }

    setValue(key, value) {
        let update = new Update(this.valueByKey[key], value);

        this.valueByKey[key] = value;

        let callbacks = this.callbackByKey[key]
        if (!callbacks) {
            return;
        }

        for (const callback of callbacks) {
            callback(update);
        }
    }
}