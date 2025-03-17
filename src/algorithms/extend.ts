// ES5实现类的继承（原型链）
function Parent(name: string) {
  this.parent = name
}
Parent.prototype.say = function () {
  console.log(`${this.parent}: 你打篮球的样子像kunkun`)
}
function Child(name: string, parent: string) {
  // 将父类的构造函数绑定在子类上
  Parent.call(this, parent)
  this.child = name
}
/**  1. 这一步不用Child.prototype =Parent.prototype的原因是怕共享内存，修改父类原型对象就会影响子类 2. 不用Child.prototype = new Parent()的原因是会调用2次父类的构造方法（另一次是call），会存在一份多余的父类实例属性3. Object.create是创建了父类原型的副本，与父类原型完全隔离*/
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
Child.prototype.say = function () {
  console.log(`${this.parent}你好，我是练习时长两年半的${this.child}`)
}

var parent = new Parent('father')
parent.say() // father: 你打篮球的样子像kunkun

var child = new Child('cxk', 'father')
child.say() // father好，我是练习时长两年半的cxk 12
export {}
