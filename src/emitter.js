// Note: The following methods should be exported for Karma tests only

let events = {

};


export function off(eventName, fn) {

    if(eventName === undefined){
        throw new Error("eventName is required!");
    }
    if(typeof eventName !== 'string'){
        throw new Error("Invalid input");
    }
    if(!fn && typeof fn !== 'function'){
        throw new Error("should provide a function");
    }
    if(!fn){
        events = {
            ...events,
            [eventName]: undefined
        };
    }else {
        events = {
            ...events,
            [eventName]: events[eventName].func.filter(f => f.toString() !== fn.toString())
        };
    }


    return events[eventName].func.length;
}

export function on(eventName, fn) {

    if(eventName === undefined){
        throw new Error("eventName is required!");
    }
    if(typeof eventName !== 'string' || (fn !== undefined && typeof fn !== 'function')){
        throw new Error("Invalid input");
    }

    events = {
        ...events,
        [eventName] : {
            func :  events[eventName] !== undefined ? [...events[eventName].func, fn] : [fn],
            once : false
        }
    };
    return events[eventName].func.length;
}

export function once() {

    return Object.keys(events).length;
}

export function trigger(eventName, ...args) {
    if(eventName === undefined){
        throw new Error("eventName is required!");
    }
    if(typeof eventName !== 'string'){
        throw new Error("Invalid input");
    }
    if(events[eventName] !== undefined){

        for(let func of events[eventName].func){
            func(...args);
        }

        return true;
    }else {
        return false;
    }
}
