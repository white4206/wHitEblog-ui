<template>
  <div class="main">
    <el-card class="account-head-card setting-card" shadow="never">
      <div class="account-head">
        <div class="account-img"><img src="@/assets/images/common/risk.png" alt=""></div>
        <div class="account-status">
          <el-tag type="danger" effect="dark" round>低风险</el-tag>
        </div>
        <div class="account-tips">为了更好地保障您的帐号安全,请您继续完善设置</div>
      </div>
    </el-card>
    <el-card class="account-setting-card setting-card" shadow="never">
      <h3>账号设置</h3>
      <div v-for="(item, index) in accountSettingItems" :key="item.id">
        <div class="account-setting">
          <div class="setting-label">
            <span>{{ item.label }}</span>
          </div>
          <div>
            <span class="setting-text">{{ item.text }}</span>
            <el-button type="primary" link @click="router.push(item.path)">{{ item.linkText }}</el-button>
          </div>
        </div>
        <el-divider v-if="index !== accountSettingItems.length - 1"/>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from "vue-router";

const router = useRouter()
const accountSettingItems = ref([
  {
    label: "密码",
    text: "存在风险,请修改密码",
    linkText: "修改密码",
    linkURL: "",
    path: '/user/account/changePassword',
    id: 1
  },
  // {
  //   label: "手机",
  //   text: "158****1234",
  //   linkText: "修改手机",
  //   linkURL: "",
  //   id: 2
  // },
  {
    label: "邮箱",
    text: "18********@qq.com",
    linkText: "修改邮箱",
    linkURL: "",
    path: '/user/account/changeEmail',
    id: 3
  },
  // {
  //   label: "第三方账号",
  //   text: "QQ 微信",
  //   linkText: "绑定/解绑",
  //   linkURL: "",
  //   id: 4
  // },
  {
    label: "登陆记录",
    text: "",
    linkText: "查看记录",
    linkURL: "",
    path: '/user/account/loginHistory',
    id: 5
  },
  {
    label: "账号注销",
    text: "",
    linkText: "立即注销",
    linkURL: "",
    path: '/user/account/signOut',
    id: 6
  }
])
</script>

<style lang="scss" scoped>
.setting-card {
  margin-bottom: 10px;
}

.account-head-card {
  :deep(.el-card__body) {
    padding: 0;
  }

  text-align: center;

  .account-head {
    background-image: url("@/assets/images/svg/wave_1.svg");
    background-position: bottom;
    background-size: cover;
    background-repeat: no-repeat;

    .account-img img {
      margin-top: 20px;
      width: 100px;
    }

    .account-tips {
      font-size: 12px;
      margin: 20px;
    }
  }
}

.account-setting-card {

  .account-setting {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;

    .setting-label {
      padding: 0 10px;
      width: 100px;
    }

    .setting-text {
      color: var(--el-text-color-regular);
      margin-right: 20px;
    }
  }


}

.el-divider {
  border-color: var(--el-fill-color);
}
</style>