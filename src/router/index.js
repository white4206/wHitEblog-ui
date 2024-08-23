import {createRouter, createWebHistory} from "vue-router";
import NotFound from "@/components/NotFound/index.vue";
import useUserStore from "@/store/modules/user.js";
import {ElMessage} from "element-plus";
import {getToken} from "@/utils/auth.js";
// import useGlobalStore from "@/store/modules/global.js";
import NProgress from "@/nprogress/index.js";

const title = "Blog | wHitE 博客"
const routes = [
    {
        path: "/login",
        meta: {title: "登录", authorization: false},
        component: () => import("@/views/login/index.vue"),
    },
    {
        path: "/home",
        meta: {title: "首页", authorization: false},
        component: () => import("@/views/home/index.vue"),
    },
    {
        path: "/blog",
        meta: {title: "博客", authorization: false},
        component: () => import("@/views/blog/index.vue"),
        children: [
            {
                path: "",
                meta: {title: "博客"},
                component: () => import("@/views/blog/blogPage/index.vue"),
            },
            {
                path: "details/:Bid",
                meta: {title: ""},
                component: () => import("@/views/blog/details/index.vue"),
            },
        ],
    },
    {
        path: "/resource",
        meta: {title: "下载资源", authorization: false},
        component: () => import("@/views/resource/index.vue"),
        children: [
            {
                path: "",
                meta: {title: "下载资源"},
                component: () => import("@/views/resource/ResourcePage/index.vue"),
            },
            {
                path: "details/:Rid",
                meta: {title: ""},
                component: () => import("@/views/resource/details/index.vue"),
            },
            {
                path: "user",
                meta: {title: "用户资源"},
                component: () => import("@/views/resource/userResource/index.vue"),
            }
        ],
    },
    {
        path: "/video",
        meta: {title: "视频列表", navbar: "video", authorization: false},
        component: () => import("@/views/video/index.vue"),
        children: [
            {
                path: "",
                meta: {title: "视频列表", navbar: "video"},
                component: () => import("@/views/video/videoList/index.vue"),
            },
            {
                path: "details/:Vid",
                meta: {title: ""},
                component: () => import("@/views/video/details/index.vue"),
            }
        ],
    },
    {
        path: "/searchPage",
        meta: {title: "搜索页", authorization: false},
        component: () => import("@/views/searchPage/index.vue")
    },
    {
        path: "/message",
        meta: {title: "消息中心", authorization: true},
        component: () => import("@/views/message/index.vue")
    },
    {
        path: "/creation",
        meta: {title: "创作中心", navbar: "creation", authorization: true},
        component: () => import("@/views/creation/index.vue"),
        children: [
            {
                path: "editor",
                meta: {title: "写文章", navbar: "editor"},
                component: () => import("@/views/creation/editor/index.vue")
            },
            {
                path: "success/:Sid",
                meta: {title: "发布成功"},
                component: () => import("@/views/creation/success/index.vue")
            },
            {
                path: "upload",
                meta: {title: "上传资源", navbar: "upload"},
                component: () => import("@/views/creation/upload/index.vue"),
                children: [
                    {
                        path: "single",
                        meta: {title: "上传资源"},
                        component: () => import("@/views/creation/upload/single/index.vue")
                    },
                    {
                        path: "batch",
                        meta: {title: "批量上传"},
                        component: () => import("@/views/creation/upload/batch/index.vue")
                    },
                    {
                        path: "/creation/upload",
                        redirect: "/creation/upload/single",
                    }
                ],
            },
            {
                path: "post",
                meta: {title: "创作视频", navbar: "post"},
                component: () => import("@/views/creation/post/index.vue"),
            },
            {
                path: "",
                meta: {title: "创作中心"},
                component: () => import("@/views/creation/center/index.vue"),
                children: [
                    {
                        path: "",
                        meta: {title: "创作中心"},
                        component: () => import("@/views/creation/center/home/index.vue")
                    },
                    {
                        path: "manager/content",
                        meta: {title: "内容管理"},
                        component: () => import("@/views/creation/center/manager/content/index.vue")
                    },
                    {
                        path: "manager/comment",
                        meta: {title: "评论管理"},
                        component: () => import("@/views/creation/center/manager/comment/index.vue")
                    },
                    {
                        path: "setting/blogSetting",
                        meta: {title: "博客设置"},
                        component: () => import("@/views/creation/center/setting/blogSetting/index.vue")
                    }

                ]
            }
        ]
    },
    {
        path: "/user",
        meta: {title: "个人中心", authorization: true},
        component: () => import("@/views/user/index.vue"),
        children: [
            {
                path: "profile",
                meta: {title: "个人资料"},
                component: () => import("@/views/user/profile/index.vue"),
            },
            {
                path: "account",
                meta: {title: "账号设置"},
                component: () => import("@/views/user/account/index.vue"),
            },
            {
                path: "account/changePassword",
                meta: {title: "修改密码"},
                component: () => import("@/views/user/account/changePassword/index.vue"),
            },
            {
                path: "account/changeEmail",
                meta: {title: "修改邮箱"},
                component: () => import("@/views/user/account/changeEmail/index.vue"),
            },
            {
                path: "account/loginHistory",
                meta: {title: "登陆日志"},
                component: () => import("@/views/user/account/loginHistory/index.vue"),
            },
            {
                path: "account/signOut",
                meta: {title: "账号注销"},
                component: () => import("@/views/user/account/signOut/index.vue"),
            },
            {
                path: "history",
                meta: {title: "浏览历史"},
                component: () => import("@/views/user/history/index.vue")
            },
            {
                path: "favorite",
                meta: {title: "我的收藏"},
                component: () => import("@/views/user/favorite/index.vue")
            },
            {
                path: "/user",
                redirect: "/user/profile",
            },
        ],
    },
    {
        path: "/personal",
        meta: {title: "个人主页", authorization: true},
        component: () => import("@/views/personal/index.vue"),
    },
    {
        path: "/demo",
        meta: {title: "案例"},
        component: () => import("@/views/demo/index.vue")
    },
    {
        path: "/ipAddress",
        meta: {title: "IP查询", hidden: true, fullTitle: true},
        component: () => import("@/views/ipAddress/index.vue"),
    },
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/:pathMatch(.*)*",
        meta: {title: "404"},
        component: NotFound,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    // 页面加载时显示全屏加载蒙版
    // const globalStore = useGlobalStore();
    // globalStore.pageLoading = true

    userStore.isLogin = getToken() !== undefined;
    if (userStore.isLogin && to.path === "/login") {
        ElMessage.info("您已登录,请先退出登陆后再尝试")
        next({
            path: from.path
        })
    } else if (!userStore.isLogin && to.meta.authorization) {
        ElMessage.warning("登录以查看更多内容")
        next("/login")
    } else {
        // 设置加载标题
        document.title = "正在加载..."
        // 开启进度条
        NProgress.start();
        next();
    }
});
router.afterEach((to, from, next) => {
    // 若在搜索页搜索 则给标题添加 搜索
    if (to.path === '/searchPage' && to.query.q)
        to.meta.title = to.query.q + " 搜索"

    // 先判断是否需要单独显示自己的标题
    if (to.meta.fullTitle)
        document.title = to.meta.title
    // 再判断是否有自定义的标题
    else if (to.meta.title)
        document.title = to.meta.title + " - " + title
    else
        document.title = title
    // 关闭进度条
    NProgress.done()
    window.scrollTo(0, 0);
});
export default router;
