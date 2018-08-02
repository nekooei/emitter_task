import * as Emmiter from './emitter';

console.log(Emmiter.on("sad", () => {}));
console.log(Emmiter.on("sad", (a, b, c) => { console.log(a, b , c)}));
console.log(Emmiter.on("sad2", (a, b, c) => { console.log(a, b , c)}));
console.log(Emmiter.on("sad3", (a, b, c) => { console.log(a, b , c)}));
console.log(Emmiter.on("sad2", (a, b, c) => { console.log(a, b , c)}));
console.log(Emmiter.on("sad2", (a, b, c) => { console.log(a, b , c)}));
console.log(Emmiter.on("sad4", (a, b) => { console.log(a, b)}));
console.log("###################################")
console.log(Emmiter.off("sad", (a, b, c) => { console.log(a, b , c)}));
console.log(Emmiter.trigger("sad", 1, 2));
console.log(Emmiter.off("sad"));

//console.log(Emmiter.off("sad"));
//console.log(Emmiter.off("sad"));

// console.log(Emmiter.on("sad", (a, b, c) => { console.log(a, b , c)}));
// console.log(Emmiter.on("sad", (a, b, c) => { console.log(a, b , c)}));
// console.log(Emmiter.on("sad2", () => {}));
//console.log(Emmiter.trigger("sad", 1, 2, 3));