// 实现发布-订阅模式
class EventCenter {
  private events: { [key: string]: Function[] } = {}
  on(eventName: string, callback: Function) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(callback)
  }
  emit(eventName: string, ...args: any[]) {
    if (!this.events[eventName]) {
      return
    }
    this.events[eventName].forEach((callback) => {
      callback(...args)
    })
  }
  off(eventName: string, callback: Function) {
    if (!this.events[eventName]) {
      return
    }
    this.events[eventName] = this.events[eventName].filter(
      (fn) => fn !== callback,
    )
  }
}
