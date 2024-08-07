import {defineConfig, loadEnv} from "vite";
import path from "path";
import createVitePlugins from "./vite/plugins/index.js";

// https://vitejs.dev/config/
export default defineConfig(({mode, command}) => {
    const env = loadEnv(mode, process.cwd());
    const {VITE_APP_ENV} = env;
    return {
        base: VITE_APP_ENV === "production" ? "./" : "/",
        plugins: createVitePlugins(env, command === 'build'),
        server: {
            open: true,
            port: 80,
            proxy: {
                "/dev-api": {
                    target: "http://localhost:10010",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/dev-api/, ""), // 不可以省略rewrite
                },
                "/admin-dev-api": {
                    target: "http://localhost:10020",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/admin-dev-api/, ""), // 不可以省略rewrite
                },
            },
        },
        resolve: {
            // 配置路径别名
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
    };
});
