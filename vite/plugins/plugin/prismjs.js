import prismjs from "vite-plugin-prismjs";

export default function createPrismjs() {
    return prismjs({
        // languages: ['json'],
        languages: 'all',// 高亮所有代码
        plugins: [
            "line-numbers",// 配置显示行号插件
            "inline-color",// 突出颜色块
            "show-language",// 显示代码语言
            "toolbar",// 复制栏按钮...
            "copy-to-clipboard",// 复制代码功能
            "previewers",// 参数预览
        ],
        //主题 →  funky科技感 okaidia暗系1 tomorrow暗系2 dark暗系3 twilight黑色  coy清新 default默认 solarizedlight明亮
        theme: "tomorrow",
        css: true,
    })
}
