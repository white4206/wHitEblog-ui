// rgb转16进制
import ColorThief from "colorthief";

export function rgbToHex(r, g, b) {
    return `#${[r, g, b].map((x) => {
        const hex = x.toString(16)
        return hex.length === 1 ? `0${hex}` : hex
    }).join('')}`
}

// 获取主题色调色板
export async function getPaletteColors(url, count = 10, quality = 10) {
    const img = document.createElement('img')
    await new Promise((resolve) => {
        img.onload = () => resolve()
        img.src = url
    })
    return new ColorThief().getPalette(img, count, quality).map(rgb => rgbToHex(...rgb))
}

export async function getDominantColor(url, quality = 10) {
    const img = document.createElement('img')
    await new Promise((resolve) => {
        img.onload = () => resolve()
        img.src = url
    })
    return rgbToHex(...new ColorThief().getColor(img, quality))
}

