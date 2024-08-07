<template>
  <el-card shadow="never">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/user/account' }">账号设置</el-breadcrumb-item>
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin:60px 0 30px 0">
      <el-form style="width: 350px;margin: 0 auto" :model="changePwdForm" ref="changePwdRef" :rules="changePwdRules"
               hide-required-asterisk>
        <el-form-item prop="oldPwd" label="输入旧密码:">
          <el-input v-model="changePwdForm.oldPwd" placeholder="请输入旧密码" type="password" show-password/>
        </el-form-item>
        <el-form-item prop="newPwd" label="输入新密码:">
          <el-input v-model="changePwdForm.oldPwd" placeholder="8-18位数字、字母和特殊字符组合" type="password"
                    show-password/>
        </el-form-item>
        <el-form-item prop="confirmPwd" label="确认新密码:">
          <el-input v-model="changePwdForm.oldPwd" placeholder="请输入确认密码" type="password" show-password/>
        </el-form-item>
        <el-form-item>
          <div style="margin: 0 auto">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button type="primary" plain @click="cancel">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup>
import {ref} from 'vue'
import {validPassword} from "@/utils/validate.js";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const router = useRouter()
const changePwdRef = ref()
const changePwdForm = ref({
  oldPwd: null,
  newPwd: null,
  confirmPwd: null,
})
const validConfirm = (rule, value, callback) => {
  if (value && value !== "") {
    if (changePwdForm.value.confirmPwd !== changePwdForm.value.newPwd) {
      callback(new Error("两次密码不一致"));
    } else
      callback();
  } else
    callback(new Error("请再次输入密码"));
}
const changePwdRules = ref({
  oldPwd: [{required: true, trigger: "blur", validator: validPassword}],
  newPwd: [{required: true, trigger: "blur", validator: validPassword}],
  confirmPwd: [{required: true, trigger: "blur", validator: validConfirm}],
})
const confirm = () => {
  changePwdRef.value.validate(valid => {
    if (valid) {
      ElMessage.success("确认")
    }
  })
}
const cancel = () => {
  changePwdRef.value.resetFields()
  router.push('/user/account')
}
</script>

<style scoped lang="scss">
.el-card {
  border: none;
}
</style>