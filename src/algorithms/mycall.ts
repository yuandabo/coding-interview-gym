// 实现 call
// function myCall(context: any, ...args: any[]) {
//   context = context || window
//   const fn = Symbol()
//   context[fn] = this
//   const res = context[fn](...args)
//   delete context[fn]
//   return res
// }

// Function.prototype.call = myCall
// const a = {
//   name: 'a',
//   sayName() {
//     console.log(this.name)
//   },
// }
// const b = {
//   name: 'b',
// }
// a.sayName.call(b) // b
export {}
