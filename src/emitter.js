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
    if(!fn){
        events = {
            ...events,
            [eventName]:{
                actions: []
            }
        };
        return 0;
    }else {
        if(events[eventName].actions.length > 1){
            return events[eventName].actions.length;
        }
        events = {
            ...events,
            [eventName] :{
                actions: events[eventName].actions.filter(action => action.func.toString() !== fn.toString())
            }
        };
    }

    return events[eventName].actions.length;
}

export function on(eventName, fn) {

    if(eventName === undefined){
        throw new Error("eventName is required!");
    }
    if(typeof eventName !== 'string' || (fn === undefined || !isFunction(fn))){
        throw new Error("Invalid input");
    }

    /*if(events[eventName] && doubleCheck(eventName, fn)){
        return events[eventName].actions.length;
    }*/

    events = {
        ...events,
        [eventName] : {
            actions :  events[eventName] !== undefined ? [...events[eventName].actions, {
                func : fn,
                once: false
            }] : [{
                func: fn,
                once: false,
            }],
        }
    };

    return events[eventName].actions.length;
}

export function once(eventName, fn) {

    if(eventName === undefined){
        throw new Error("eventName is required!");
    }
    if(typeof eventName !== 'string' || (fn === undefined || !isFunction(fn))){
        throw new Error("Invalid input");
    }

    /*if(events[eventName] && doubleCheck(eventName, fn)){
        return events[eventName].actions.length;
    }*/

    events = {
        ...events,
        [eventName] : {
            actions :  events[eventName] !== undefined ? [...events[eventName].actions, {
                func : fn,
                once: true
            }] : [{
                func: fn,
                once: true
            }],
        }
    };

    return events[eventName].actions.length;
}

export function trigger(eventName, ...args) {
    if(eventName === undefined){
        throw new Error("eventName is required!");
    }
    if(typeof eventName !== 'string'){
        throw new Error("Invalid input");
    }
    console.log(events);
    if(events[eventName] !== undefined){

        if(events[eventName].actions.length) {
            for (let action of events[eventName].actions) {
                if (action.once) {

                } else {
                    action.func(...args);
                }

            }
            return true;
        }else {
            return false;
        }
    }else {
        return false;
    }
}


function doubleCheck(name, fn){
    for(let action of events[name].actions){
        if(action.func.toString() === fn.toString()){
            return true;
        }
    }
    return false;
}

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}