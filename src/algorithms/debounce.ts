// instanceof
// instanceof运算符用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上。
const debounce = (fn: Function, wait: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null
  return function (...args: any[]) {
    if (!timer) {
      timer = setTimeout(() => {
        fn(...args)
        timer = null
      }, wait)
    } else {
      console.log('trigger debounce reset timer')
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
        timer = null
      }, wait)
    }
  }
}

const function1 = () => {
  console.log('debounce')
}

const function2 = debounce(function1, 2000)
function2()
setTimeout(() => {
  function2()
  setTimeout(() => {
    function2()
  }, 1000)
}, 1000)

export {}
