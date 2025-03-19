// Promise并行限制
/*
功能	实现方式	示例代码片段
​任务入队	通过add()方法将任务推入队列	this.queue.push(promiseCreator); 
​并发限制检查	判断当前执行数是否小于最大并发数	if (runCounts >= maxCount) return; 
​任务完成回调	在Promise的.then()中触发后续任务	promiseCreator().then(() => { runCounts--; this.request(); }) 
​队列消费	使用shift()或pop()按顺序取出任务	this.queue.shift()() 
*/
class PromiseScheduler {
  private queue: (() => Promise<any>)[] = []
  private maxCount: number
  private runCounts: number = 0
  constructor(maxCount: number) {
    this.maxCount = maxCount
  }
  add(promiseCreator: () => Promise<any>) {
    this.queue.push(promiseCreator)
  }
  request() {
    if (this.queue.length <= 0 || this.runCounts >= this.maxCount) return
    this.runCounts++
    this.queue.shift()!().then(() => {
      this.runCounts--
      this.request()
    })
  }
  taskStart() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request()
    }
  }
}

const timeout = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time))
const scheduler = new PromiseScheduler(1)
const addTask = (time: number, order: string) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)))
}
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
scheduler.taskStart()
export {}
