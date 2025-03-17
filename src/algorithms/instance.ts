// instanceof
// instanceof运算符用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上。
const instanceofFun = (left: any, right: any) => {
  if (typeof left !== 'object' || left === null) return false
  let proto = Object.getPrototypeOf(left)
  while (true) {
    if (proto === null) return false
    if (proto === right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

console.log(instanceofFun([], Array)) // true;

export {}
