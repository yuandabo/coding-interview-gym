// 手写类型判断函数
function getType(target: any) {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
}

console.log(getType(undefined)) // "undefined"
console.log(getType(null)) // "null";
console.log(getType(1)) // "number"
console.log(getType('')) // "string"

export {}
