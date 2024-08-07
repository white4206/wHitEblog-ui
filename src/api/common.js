import request from "@/utils/request.js";

// 通用接口测试方法
export const requestTest = () => {
    return request({
        url: "/test",
        method: "get",
        header: {
            isToken: false,
        }
    });
};
export const getDailyRecommendation = () => {
    return request({
        url: "/getDailyRecommendation",
        method: "get",
        headers: {
            isToken: false,
        },
    })
}
export const getCarousel = () => {
    return request({
        url: "/getCarousel",
        method: "get",
        headers: {
            isToken: false,
        },
    })
}
export const getRelatedLink = () => {
    return request({
        url: "/getRelatedLink",
        method: "get",
        headers: {
            isToken: false,
        },
    })
}
export const getHomePageNotice = () => {
    return request({
        url: "/getHomePageNotice",
        method: "get",
        headers: {
            isToken: false,
        },
    })
}
export const imageUpload = (data) => {
    let formData = new FormData()
    formData.set("file", data)
    return request({
        url: "/imageUpload",
        method: "post",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}
export const getAuthorRecommended = () => {
    return request({
        url: "/getAuthorRecommended",
        method: "get",
    })
}
export const getPlatformAnnouncement = () => {
    return request({
        url: "/getPlatformAnnouncement",
        method: "get",
    })
}