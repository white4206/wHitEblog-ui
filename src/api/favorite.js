import request from "@/utils/request.js";

export const getFavoriteFolder = () => {
    return request({
        url: "/favorite/getFavoriteFolder",
        method: "get",
    })
}
export const getFavorite = (folderId) => {
    return request({
        url: "/favorite/getFavorite",
        method: "get",
        params: {folderId}
    })
}