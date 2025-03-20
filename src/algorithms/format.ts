// 将数字每千分位用逗号隔开
function formatNumber(num: number): string {
  let numStr = num.toString()
  let result = ''
  if (numStr.includes('.')) {
    let [integer, decimal] = numStr.split('.')
    result =
      integer.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => s + ',') + '.' + decimal
  }
  return result
}
console.log(formatNumber(1234567890.123)) // "1,234,567,890.123";

export {}
