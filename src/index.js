import * as Emmiter from './emitter';

console.log(Emmiter.on("sad", (a, b, c) => { console.log(a, b , c)}));
console.log(Emmiter.on("sad", (a) => { console.log(a)}));
console.log(Emmiter.on("sad", (a, b) => { console.log(a, b )}));
console.log(Emmiter.off("sad", (a, b) => { console.log(a, b )}));
// console.log(Emmiter.on("sad", (a, b, c) => { console.log(a, b , c)}));
// console.log(Emmiter.on("sad", (a, b, c) => { console.log(a, b , c)}));
// console.log(Emmiter.on("sad2", () => {}));
//console.log(Emmiter.trigger("sad", 1, 2, 3));