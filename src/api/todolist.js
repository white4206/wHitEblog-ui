import request from "@/utils/request.js";

export const getToDoList = () => {
    return request({
        url: "/todolist/getToDoList",
        method: "get",
    })
}