<template>
  <el-main>
    <div class="container" ref="containerRef">
      <div class="forms-container">
        <div class="signIn-signUp">
          <el-form class="sign-in-form" :model="loginForm" :rules="loginRules" ref="loginFormRef">
            <h2 class="title">登录</h2>
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" class="custom-input" size="large" prefix-icon="User" type="text"
                        placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" class="custom-input" size="large" prefix-icon="Lock"
                        type="password" show-password placeholder="请输入密码"/>
            </el-form-item>
            <el-button type="primary" round size="large" class="btn solid" @click="userLogin">
              立即登录
            </el-button>
          </el-form>
          <el-form class="sign-up-form" :model="registerForm" :rules="registerRules" ref="registerFormRef">
            <h2 class="title">注册</h2>
            <el-form-item prop="username">
              <el-input v-model="registerForm.username" class="custom-input" size="large" prefix-icon="User" type="text"
                        placeholder="4-12位数字、字母和下划线组合"/>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="registerForm.password" class="custom-input" size="large" prefix-icon="Lock"
                        type="password" show-password
                        placeholder="8-18位数字、字母和特殊字符组合"/>
            </el-form-item>
            <el-form-item prop="confirm">
              <el-input v-model="registerForm.confirm" class="custom-input" size="large" prefix-icon="Lock"
                        type="password" show-password
                        placeholder="请输入确认密码"/>
            </el-form-item>
            <el-form-item prop="email">
              <el-input v-model="registerForm.email" class="custom-input" size="large" prefix-icon="Message"
                        placeholder="请输入邮箱"/>
            </el-form-item>
            <el-form-item>
              <div class="code-box">
                <el-input v-model="registerForm.code" class="code-input" size="large" placeholder="请输入邮箱验证码"
                          prefix-icon="Promotion"
                          clearable/>
                <el-button class="code-button" type="primary" @click="sendCode" :disabled="sendingTime!==0"
                           :loading="sending">
                  <template #loading>
                    <div class="custom-loading">
                      <svg class="circular" viewBox="-10, -10, 50, 50">
                        <path
                            class="path"
                            d="
            M 30 15
            L 28 17
            M 25.61 25.61
            A 15 15, 0, 0, 1, 15 30
            A 15 15, 0, 1, 1, 27.99 7.5
            L 15 15
          "
                            style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"
                        />
                      </svg>
                    </div>
                  </template>
                  {{ sendingTime !== 0 ? `重发验证码(${sendingTime})` : "获取验证码" }}
                </el-button>
              </div>

            </el-form-item>
            <el-button type="primary" round size="large" class="btn" @click="userRegister">立即注册</el-button>
          </el-form>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>注册本站</h3>
            <p>
              加入我们，成为本站的一份子。
            </p>
            <el-button class="btn transparent" round @click="goToSignUp">
              去注册
            </el-button>
          </div>
          <el-image src="/login.svg" class="image" alt=""/>
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>已有帐号？</h3>
            <p>
              立即登录已有帐号，开始发帖。
            </p>
            <el-button class="btn transparent" round @click="goToSignIn">
              去登录
            </el-button>
          </div>
          <el-image src="/register.svg" class="image" alt=""/>
        </div>
      </div>
    </div>
  </el-main>
  <WebsiteInfoBar/>
</template>

<script setup>
import {useRouter} from "vue-router";
import {ref} from 'vue'
import {validEmail, validPassword, validUsername} from "@/utils/validate.js";
import useUserStore from "@/store/modules/user.js";
import {ElMessage} from 'element-plus'
import {setToken} from "@/utils/auth.js";
import WebsiteInfoBar from "@/components/WebsiteInfoBar/index.vue";

const sendingTime = ref(0)
const userStore = useUserStore()
const router = useRouter()
// Vue3获取全局变量
// const it = getCurrentInstance().appContext.config.globalProperties
// console.log(it)
// console.log(getCurrentInstance())

const sending = ref(false)
const containerRef = ref()
const loginForm = ref({
  username: null,
  password: null
})
const registerForm = ref({
  username: null,
  password: null,
  confirm: null,
  email: null,
  code: null
})
const loginFormRef = ref()
const registerFormRef = ref()
const loginRules = ref({
  username: [{required: true, validator: validUsername, trigger: "blur"}],
  password: [{required: true, validator: validPassword, trigger: "blur"}]
})
const validConfirm = (rule, value, callback) => {
  if (value && value !== "") {
    if (registerForm.value.confirm !== registerForm.value.password) {
      callback(new Error("两次密码不一致"));
    } else
      callback();
  } else
    callback(new Error("请再次输入密码"));
}
const registerRules = ref({
  username: [{required: true, validator: validUsername, trigger: "blur"}],
  password: [{required: true, validator: validPassword, trigger: "blur"}],
  confirm: [{required: true, validator: validConfirm, trigger: "blur"}],
  email: [{required: true, validator: validEmail, trigger: "blur"}],
})


window.addEventListener('resize', function () {
  height.value = document.documentElement.clientHeight - 60 + "px";
});
const goToSignIn = () => {
  containerRef.value.classList.remove("sign-up-mode")
}
const goToSignUp = () => {
  containerRef.value.classList.add("sign-up-mode")
}
const userLogin = () => {
  loginFormRef.value.validate(valid => {
    if (valid) {
      userStore.userLogin(loginForm.value)
          .then(res => {
            ElMessage.success("登陆成功")
            setToken(res.data)
            router.push("/home")
          })
    }
  })
}
// 验证码冷却倒计时
const sendingTimeOut = () => {
  let time = setInterval(() => {
    if (sendingTime.value === 0)
      clearInterval(time)
    else
      sendingTime.value--
  }, 1000)
}
const sendCode = () => {
  registerFormRef.value.validateField("username", valid => {
    if (valid) {
      registerFormRef.value.validateField("email", valid => {
        if (valid) {
          sending.value = true
          userStore.userGetCode({username: registerForm.value.username, email: registerForm.value.email})
              .then(res => {
                ElMessage.success(res.data)
                sending.value = false
                sendingTime.value = 120
                sendingTimeOut()
              }).catch(err => sending.value = false)
        }
      })
    }
  })
}
const userRegister = () => {
  registerFormRef.value.validate(valid => {
    if (valid) {
      userStore.userRegister({
        user: {
          username: registerForm.value.username,
          password: registerForm.value.password,
          email: registerForm.value.email
        },
        code: registerForm.value.code
      }).then(res => {
        ElMessage.success(res.data)
        goToSignIn()
        loginForm.value.username = registerForm.value.username
        loginForm.value.password = registerForm.value.password
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.el-main {
  max-width: none;
  padding: 0;
}

.container {
  position: relative;
  height: calc(100vh - 60px);
  background-color: var(--el-bg-color);
  overflow: hidden;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signIn-signUp {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 75%;
  width: 50%;
  transition: 1s 0.7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  margin: 50px 0;
}

form.sign-up-form {
  opacity: 0;
  z-index: 1;
}

form.sign-in-form {
  z-index: 2;
}

.title {
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 10px;
}

.custom-input {
  height: 50px;
  width: 350px;
}

:deep(.el-input__wrapper) {
  border-radius: 20px;
  background-color: var(--el-fill-color-light);
}

.code-box {
  width: 350px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.code-input .el-input__wrapper) {
  height: 50px;
  border-radius: 20px 0 0 20px;
}

.code-button {
  height: 50px;
  border-radius: 0 20px 20px 0;
}


.btn {
  width: 350px;
  height: 50px;
  color: var(--el-bg-color);
  font-weight: 600;
  cursor: pointer;
  transition: 0.5s;
}

.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.container:before {
  content: "";
  position: absolute;
  height: 2500px;
  width: 2500px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, var(--el-color-primary) 0%, var(--el-color-primary-light-5) 100%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;
}

.image {
  width: 85%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.panel .content {
  color: var(--el-bg-color);
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid var(--el-bg-color);
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}

.btn.transparent:hover {
  background-color: rgba(255, 255, 255, 0.1)
}

.right-panel .image,
.right-panel .content {
  transform: translateX(800px);
}

/* ANIMATION */

.container.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.container.sign-up-mode .signIn-signUp {
  left: 25%;
}

.container.sign-up-mode form.sign-up-form {
  opacity: 1;
  z-index: 2;
}

.container.sign-up-mode form.sign-in-form {
  opacity: 0;
  z-index: 1;
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
  transform: translateX(0%);
}

.container.sign-up-mode .left-panel {
  pointer-events: none;
}

.container.sign-up-mode .right-panel {
  pointer-events: all;
}

@media (max-width: 870px) {
  .container {
    min-height: 800px;
    height: 100vh;
  }
  .signIn-signUp {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .signIn-signUp,
  .container.sign-up-mode .signIn-signUp {
    left: 50%;
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .image {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel .content {
    padding-right: 15%;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.8s;
  }

  .panel h3 {
    font-size: 1.2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }

  .container:before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .container.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .container.sign-up-mode .left-panel .image,
  .container.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  .container.sign-up-mode .right-panel .image,
  .container.sign-up-mode .right-panel .content {
    transform: translateY(0px);
  }

  .right-panel .image,
  .right-panel .content {
    transform: translateY(300px);
  }

  .container.sign-up-mode .signIn-signUp {
    top: 5%;
    transform: translate(-50%, 0);
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }
  .panel .content {
    padding: 0.5rem 1rem;
  }
  .container {
    padding: 1.5rem;
  }

  .container:before {
    bottom: 72%;
    left: 50%;
  }

  .container.sign-up-mode:before {
    bottom: 28%;
    left: 50%;
  }
}

.el-button .custom-loading .circular {
  margin-right: 6px;
  width: 18px;
  height: 18px;
  animation: loading-rotate 2s linear infinite;
}

.el-button .custom-loading .circular .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-button-text-color);
  stroke-linecap: round;
}
</style>