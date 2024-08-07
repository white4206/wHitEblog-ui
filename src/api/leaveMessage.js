import request from "@/utils/request.js";

export const getLeaveMessage = () => {
    return request({
        url: "/leaveMessage/getLeaveMessage",
        method: "get",
        headers: {
            isToken: false,
        },
    })
}