<template>
  <el-card shadow="never">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/user/account' }">账号设置</el-breadcrumb-item>
      <el-breadcrumb-item>修改邮箱</el-breadcrumb-item>
    </el-breadcrumb>
    <div v-if="!isVerify" style="height:300px;margin-top: 30px">
      <el-form style="width: 350px;margin: 0 auto" :model="verifyForm" ref="verifyRef"
               :rules="verifyRules"
               hide-required-asterisk>
        <el-form-item>
          <p>验证码将发送到18***@qq.com邮箱</p>
          <p style="color: var(--el-text-color-disabled)">如果长时间未收到验证码，请检查垃圾箱</p>
        </el-form-item>
        <el-form-item prop="code" label="填写验证码:">
          <el-input v-model="verifyForm.code" placeholder="请填写验证码">
            <template #suffix>
              <el-button type="primary" link>获取验证码</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div style="margin: 20px auto">
            <el-button type="primary" @click="goNext">下一步</el-button>
            <el-button type="primary" plain @click="verifyCancel">取消</el-button>
            <div style="margin-top: 10px">
              <el-button type="primary" link>邮箱不可用？可通过XXX修改</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div v-else style="height:300px;margin-top: 30px">
      <el-form style="width: 350px;margin: 0 auto" :model="changeEmailForm" ref="changeEmailRef"
               :rules="changeEmailRules"
               hide-required-asterisk>
        <el-form-item prop="email" label="输入新邮箱:">
          <el-input v-model="changeEmailForm.email" clearable placeholder="请输入新邮箱">
          </el-input>
        </el-form-item>
        <el-form-item prop="code" label="填写验证码:">
          <el-input v-model="changeEmailForm.code" placeholder="请填写验证码">
            <template #suffix>
              <el-button type="primary" link>获取验证码</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <p style="margin-top:20px;color: var(--el-text-color-disabled)">如果长时间未收到验证码，请检查垃圾箱</p>
          <div style="margin:0 auto">
            <el-button type="primary" @click="confirm">下一步</el-button>
            <el-button type="primary" plain @click="changeEmailCancel">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <el-divider/>
  </el-card>
</template>

<script setup>
import {ref} from 'vue'
import {validEmail} from "@/utils/validate.js";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const isVerify = ref(false)
const router = useRouter()
const verifyRef = ref()
const verifyForm = ref({
  code: null,
})
const verifyRules = ref({
  code: [{required: true, trigger: "blur", message: "请输入6位验证码", min: 6, max: 6}],
})
const changeEmailRef = ref()
const changeEmailForm = ref({
  email: null,
  code: null,
})
const changeEmailRules = ref({
  email: [{required: true, trigger: "blur", validator: validEmail}],
  code: [{required: true, trigger: "blur", message: "请输入6位验证码", min: 6, max: 6}],
})
const goNext = () => {
  verifyRef.value.validate(valid => {
    if (valid) {
      isVerify.value = true
    }
  })
}
const confirm = () => {
  changeEmailRef.value.validate(valid => {
    if (valid) {
      ElMessage.success("确认")
    }
  })
}
const verifyCancel = () => {
  verifyRef.value.resetFields()
  isVerify.value = false
  router.push('/user/account')
}
const changeEmailCancel = () => {
  changeEmailRef.value.resetFields()
  isVerify.value = false
  router.push('/user/account')
}
</script>

<style scoped lang="scss">
.el-card {
  border: none;
}
</style>