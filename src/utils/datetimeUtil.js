export const timeAgo = (time) => {
    let nowDate = new Date(time)
    if (new Date().toDateString() === nowDate.toDateString()) {
        time = nowDate.getTime() / 1000
        let t = Date.now() / 1000 - time // Y-m-d H:i:s
        let i = 60
        let h = i * 60
        let d = h * 24
        let m = d * 30
        let y = m * 12
        const mp = new Map([
            [n => n < i, n => (n >> 0) + '秒'],
            [n => n < h, n => (n / i >> 0) + '分钟'],
            [n => n < d, n => (n / h >> 0) + '小时'],
            [n => n < m, n => (n / d >> 0) + '天'],
            [n => n < y, n => (n / m >> 0) + '月'],
            [n => true, n => (n / y >> 0) + '年'],
        ])
        return ([...mp].find(([n]) => n(t)).pop())(t) + '前'
    } else
        return nowDate.toLocaleDateString("sv-SE")
}