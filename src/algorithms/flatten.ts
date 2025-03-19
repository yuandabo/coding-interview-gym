// 实现数组的扁平化
function flatten(arr: string | any[]) {
  let result: any[] = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
}

function flatten2(arr: any[]) {
  return arr.reduce(
    (prev, cur) => prev.concat(Array.isArray(cur) ? flatten2(cur) : cur),
    [],
  )
}
function flatten3(arr: any[]) {
  return arr.toString().split(',')
}
function flatten4(arr: any[]) {
  return arr.flat(Infinity)
}
let arr = [1, [2, [3, 4, 5]]]
console.log(flatten(arr)) //  [1, 2, 3, 4，5]
console.log(flatten2(arr))
console.log(flatten3(arr))
console.log(flatten4(arr))
export {}
