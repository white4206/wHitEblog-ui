import {defineStore} from "pinia";
import {getCode, getUserInfo, login, logout, register} from "@/api/user.js";
import {setToken} from "@/utils/auth.js";
import {ref} from "vue";

const useUserStore = defineStore("user", () => {
    const isLogin = ref(false)
    const userInfo = ref({
        avatar: new URL("@/assets/images/avatar.png", import.meta.url).href
    })
    const userLogin = (user) => {
        return new Promise((resolve, reject) => {
            login(user).then(res => {
                setToken(res.data)
                isLogin.value = true
                userGetInfo()
                resolve(res)
            })
        })
    }
    const userLogout = () => {
        return new Promise((resolve, reject) => {
            logout().then(res => {
                isLogin.value = false
                userInfo.value = {avatar: new URL("@/assets/images/avatar.png", import.meta.url).href}
                resolve(res)
            })
        })
    }
    const userGetCode = (data) => {
        return new Promise((resolve, reject) => {
            getCode(data).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
    const userRegister = (user) => {
        return new Promise((resolve, reject) => {
            register(user).then(res => {
                resolve(res)
            })
        })
    }
    const userGetInfo = () => {
        getUserInfo().then(res => {
            userInfo.value = res.data
            if (userInfo.value.avatar)
                userInfo.value.avatar = import.meta.env.VITE_APP_BASE_API + userInfo.value.avatar
            else
                userInfo.value.avatar = new URL("@/assets/images/avatar.png", import.meta.url).href
        })
    }
    return {
        isLogin,
        userInfo,
        userGetInfo,
        userLogin,
        userLogout,
        userGetCode,
        userRegister
    };
});
export default useUserStore;
