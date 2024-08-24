import request from "@/utils/request.js";

export const searchArticle = (params) => {
    return request({
        url: "/blog/searchArticle",
        method: "get",
        headers: {
            isToken: false,
        },
        params: params
    })
}
export const getArticleTag = () => {
    return request({
        url: "/blog/getArticleTag",
        method: "get",
        headers: {
            isToken: false,
        },
    })
}
export const getArticle = (params) => {
    return request({
        url: "/blog/getArticle",
        method: "get",
        params: params,
        headers: {
            isToken: false,
        },
    })
}
export const getArticleDetail = (articleId) => {
    return request({
        url: "/blog/getArticleDetail",
        method: "get",
        headers: {
            isToken: false,
        },
        params: {
            articleId
        }
    })
}
export const publishArticle = (data) => {
    return request({
        url: "/blog/publishArticle",
        method: "post",
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}
export const editArticle = (data) => {
    return request({
        url: "/blog/editArticle",
        method: "put",
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}
export const getEditArticleDetailById = (articleId) => {
    return request({
        url: "/blog/getEditArticleDetailById",
        method: "get",
        params: {articleId}
    })
}
export const getUserArticle = (params) => {
    return request({
        url: "/blog/getUserArticle",
        method: "get",
        params: params
    })
}
export const getRecentArticle = () => {
    return request({
        url: "/blog/getRecentArticle",
        method: "get",
    })
}
export const getContentArticle = (params) => {
    return request({
        url: "/blog/getContentArticle",
        method: "get",
        params: params
    })
}
export const getArticleComment = (params) => {
    return request({
        url: "/blog/getArticleComment",
        method: "get",
        params: params
    })
}