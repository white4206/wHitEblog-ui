import request from "@/utils/request.js";

export const login = (data) => {
    return request({
        url: "/user/login",
        method: "post",
        header: {
            isToken: false,
        },
        data: data
    })
}
export const register = (data) => {
    return request({
        url: "/user/register",
        method: "post",
        header: {
            isToken: false,
        },
        data: data
    })
}
export const getCode = (params) => {
    return request({
        url: "/user/getCode",
        method: "get",
        header: {
            isToken: false,
        },
        params: params
    })
}
export const logout = () => {
    return request({
        url: "/user/logout",
        method: "post",
        headers: {
            isToken: false,
        },
    })
}
export const updateAvatar = (data) => {
    let formData = new FormData()
    formData.set("file", data)
    return request({
        url: "/user/updateAvatar",
        method: "put",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}
export const getUserInfo = () => {
    return request({
        url: "/user/getUserInfo",
        method: "get",
    })
}
export const getUserInfoDetail = () => {
    return request({
        url: "/user/getUserInfoDetail",
        method: "get",
    })
}
export const getUserData = (authorId) => {
    return request({
        url: "/user/getUserData",
        method: "get",
        params: {authorId}
    })
}
export const updateUserInfoDetail = (data) => {
    return request({
        url: "/user/updateUserInfoDetail",
        method: "put",
        data: data
    })
}
export const getIdentityTag = () => {
    return request({
        url: "/user/getIdentityTag",
        method: "get"
    })
}
