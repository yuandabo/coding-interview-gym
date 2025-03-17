// instanceof
// instanceof运算符用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上。
const throttle = (fn: Function, wait: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null
  return function (...args: any[]) {
    if (!timer) {
      timer = setTimeout(() => {
        fn(...args)
        timer = null
      }, wait)
    }
  }
}

const function1 = () => {
  console.log('throttle')
}

const function2 = throttle(function1, 1000)
function2()
function2()
function2()
export {}
