// mock vue2 react diff 双端队列对比算法
/* 
 Diff 算法的基本思路
相同节点（sameNode）：如果 tag 和 key 相同，则继续比对子节点，否则直接替换。

子节点比较：

新旧子节点都存在 → 递归 diff

旧节点存在，新节点不存在 → 删除节点

新节点存在，旧节点不存在 → 添加节点

列表 Diff（使用 key）：

相同 key 的节点会尽量复用

不同 key 的节点会重新创建

使用最长递增子序列（LIS）优化最小移动操作
*/
export {}
// 虚拟 DOM 结构
class VNode {
  tag = ''
  props = {}
  children = []
  key = ''
  constructor(tag: string, props: any, children: any, key?: any) {
    this.tag = tag // 节点类型，如 div、span
    this.props = props // 属性，如 { id: "app" }
    this.children = children // 子节点，可以是数组
    this.key = key // 唯一标识 key
  }
}
// 判断两个节点是否相同（tag 和 key 相同）
function sameNode(oldVNode: VNode, newVNode: VNode) {
  return oldVNode.tag === newVNode.tag && oldVNode.key === newVNode.key
}
function diffProps(oldProps: any, newProps: any) {
  let patches: { [key: string]: any } = {}

  // 遍历新属性，查找新增或修改的
  for (let key in newProps) {
    if (oldProps[key] !== newProps[key]) {
      patches[key] = newProps[key]
    }
  }

  // 查找删除的属性
  for (let key in oldProps) {
    if (!(key in newProps)) {
      patches[key] = null
    }
  }

  return patches
}
function diffChildren(oldChildren: any[], newChildren: any[]) {
  let patches = []

  let oldKeyMap = new Map()
  oldChildren.forEach((child, index) => {
    oldKeyMap.set(child.key, { node: child, index })
  })

  let lastIndex = 0 // 记录最长递增子序列的索引
  let moves: {
    type: string
    from?: any
    to?: number
    node?: any
    index?: number
  }[] = []

  newChildren.forEach((newChild, newIndex) => {
    let match = oldKeyMap.get(newChild.key)

    if (match) {
      let oldIndex = match.index
      if (oldIndex < lastIndex) {
        moves.push({ type: 'MOVE', from: oldIndex, to: newIndex })
      }
      lastIndex = Math.max(lastIndex, oldIndex)
    } else {
      moves.push({ type: 'INSERT', node: newChild, index: newIndex })
    }
  })

  oldChildren.forEach((oldChild, index) => {
    if (!newChildren.find((newChild) => newChild.key === oldChild.key)) {
      moves.push({ type: 'REMOVE', index })
    }
  })

  return moves
}
// 1. diff算法
// 生成 diff 结果
function diff(oldVNode: VNode, newVNode: VNode) {
  let patches = []

  // 1️⃣ 如果新旧节点不相同，直接替换
  if (!sameNode(oldVNode, newVNode)) {
    patches.push({ type: 'REPLACE', newVNode })
    return patches
  }

  // 2️⃣ 如果是相同节点，比较属性
  let attrPatches = diffProps(oldVNode.props, newVNode.props)
  if (Object.keys(attrPatches).length > 0) {
    patches.push({ type: 'UPDATE_PROPS', props: attrPatches })
  }

  // 3️⃣ 比对子节点
  let childrenPatches = diffChildren(oldVNode.children, newVNode.children)
  if (childrenPatches.length > 0) {
    patches.push({ type: 'UPDATE_CHILDREN', childrenPatches })
  }

  return patches
}

// 2. 双端队列
class Deque {}

// 3. vue3 LIS 算法
// function diffLIS(arr1, arr2) {}
// 🔹 示例使用
let oldVNode = new VNode('div', { id: 'app' }, [
  new VNode('p', {}, ['Hello'], '1'),
  new VNode('span', {}, ['World'], '2'),
  new VNode('a', {}, ['World'], '4'),
])

let newVNode = new VNode('div', { id: 'app', name: '123' }, [
  new VNode('span', {}, ['World!'], '2'), // 变更
  new VNode('p', {}, ['Hello Vue'], '1'), // 变更
  new VNode('a', { id: '1' }, ['World'], '4'),
  new VNode('strong', {}, ['New Node'], '3'), // 新增
])

let patches = diff(oldVNode, newVNode)
console.log('Diff 结果:', JSON.stringify(patches))
