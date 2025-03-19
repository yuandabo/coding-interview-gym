// 实现数组的push方法
let arr = []
Array.prototype.push = function (...args) {
  for (let i = 0; i < args.length; i++) {
    this[this.length] = args[i]
  }
  return this.length
}

arr.push(1, 2, 3)
console.log(arr)
export {}
