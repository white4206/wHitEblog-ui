<template>
  <el-card shadow="never">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/user/account' }">账号设置</el-breadcrumb-item>
      <el-breadcrumb-item>登录日志</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <div style="margin:30px 0 20px 0;font-size: 14px;color:var(--el-text-color-regular)">
        若发现异常登录，请尽快修改密码
      </div>
      <el-table :data="loginHistory" stripe :show-header="false">
        <el-table-column prop="lastLoginTime" label="登陆时间"/>
        <el-table-column prop="lastLoginIp" label="登陆地点(IP地址)" width="225"/>
      </el-table>
    </div>
  </el-card>
</template>

<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";

const router = useRouter()
const loginHistory = ref([
  {lastLoginTime: '2024-07-20 02:52:23', lastLoginIp: "中国 安徽 宿州 (255.255.255.*)"},
  {lastLoginTime: '2024-07-20 02:49:23', lastLoginIp: "中国 安徽 宿州 (255.255.255.*)"},
  {lastLoginTime: '2024-07-20 02:42:23', lastLoginIp: "中国 安徽 宿州 (255.255.255.*)"},
])
</script>

<style scoped lang="scss">
.el-card {
  border: none;
}
</style>