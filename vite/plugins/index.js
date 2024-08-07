import vue from '@vitejs/plugin-vue'

import createSvgIcon from './plugin/svgIcon.js'
import createPrismjs from "./plugin/prismjs.js";

export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [vue()]
    vitePlugins.push(createSvgIcon(isBuild))
    vitePlugins.push(createPrismjs())
    return vitePlugins
}
