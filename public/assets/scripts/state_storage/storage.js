import Update from "./update.js";


/**
 * @callback onSetValueCallback
 * @param {Update} update
 */


export default class Storage {
    constructor() {
        this.valueByKey = {}
        this.callbackByKey = {}
    }

    /**
     * @param {Object} key
     * @param {onSetValueCallback} callback
     */
    register(key, callback) {
        if (!this.callbackByKey[key]) {
            this.callbackByKey[key] = [callback];
        } else {
            this.callbackByKey[key].push(callback);
        }
    }

    /**
     * @param {Object} obj
     */
    updateState(obj) {
        for (const prop in obj) {
            this.setValue(prop, obj[prop]);
        }
    }

    getState() {
        return Object.assign({}, this.valueByKey);
    }

    getValue(key) {
        return this.valueByKey[key];
    }

    /**
     * @param {String} key
     * @param {Object} value
     * */
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