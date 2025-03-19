// 函数柯里化的实现
function curry(fn: Function, ...args: any[]) {
  return args.length >= fn.length
    ? fn(...args)
    : (...args2: any[]) => curry(fn, ...args, ...args2)
}
function add(a: any, b: any, c: any) {
  return a + b + c
}

const curriedAdd = curry(add)

console.log(curriedAdd(1)(2)(3)) // 输出 6
console.log(curriedAdd(1, 2)(3)) // 输出 6
console.log(curriedAdd(1)(2, 3)) // 输出 6

const concat = (a: any, b: any, c: any) => a + b + c
const curriedConcat = curry(concat)

const addPrefix = curriedConcat('【前缀】')
const addPrefixAndSuffix = addPrefix('【后缀】')

console.log(addPrefixAndSuffix('正文')) // 输出 "【前缀】【后缀】正文"
export {}
