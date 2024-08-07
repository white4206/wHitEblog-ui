<template>
  <el-card shadow="never">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/user/account' }">账号设置</el-breadcrumb-item>
      <el-breadcrumb-item>账号注销</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin:60px 0 30px 0">
      <div style="padding:0 40px">
        <h4>账号注销则视为您主动放弃以下资产和权益，且同意以下规则：</h4>
        <p style="line-height: 1.5;margin-top: 20px">
          1.账号注销后，您将无法登录、使用wHitE 博客账号，且不支持找回任何个人资料。<br/>
          2.将不再支持使用已注销账号的用户ID注册新的账号。<br/>
          3.注销wHitE 博客账号并不代表您注销前的账号行为和相关责任得到豁免或减轻。
        </p>
        <div style="text-align:center;margin-top:40px">
          <el-button size="large" type="primary" round @click="ElMessage.info('管 我知道了')">已知悉，确认注销账号
          </el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";

const router = useRouter()
</script>

<style scoped lang="scss">
.el-card {
  border: none;
}
</style>