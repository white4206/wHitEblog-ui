// targetElements 目标元素列表
// element 需要遍历的元素
// callback 回调方法
export function deepTraverse(targetElements, element, callback) {
    // 创建索引
    let index = 0

    // 递归遍历元素列表
    function recurse(elements) {
        elements.forEach(element => {
            if (targetElements.includes(element.nodeName)) {
                // 执行回调
                callback(element, index)
                index++
            } else if (element.childNodes.length > 0)
                // 递归深度遍历
                recurse(element.childNodes)
        })
    }

    // 若传入元素存在子节点调用深度遍历
    if (element.childNodes.length > 0) {
        recurse(element.childNodes)
    }

}