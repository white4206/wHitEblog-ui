<template>
  <el-menu-item :index="'/personal?author='+userInfo.id" class="user-avatar-item">
      <span class="user-avatar">
          <el-avatar :size="48" :src="userInfo.avatar"/>
        </span>
    <el-card class="user-card" @click.stop="1">
      <template #header>
        <div class="username"><span>{{ userInfo.nickname }}</span></div>
      </template>
      <div class="card-item-box user-info">
        <div class="user-info-item">
          <span class="number">{{ userInfo.fansNum === 0 ? '--' : userInfo.fansNum }}</span>
          <span>粉丝</span>
        </div>
        <div class="user-info-item">
              <span class="number">{{
                  userInfo.attentionNum === 0 ? '--' : userInfo.attentionNum
                }}</span>
          <span>关注</span>
        </div>
        <div class="user-info-item">
          <span class="number">{{ userInfo.likedNum === 0 ? '--' : userInfo.likedNum }}</span>
          <span>获赞</span>
        </div>
      </div>
      <el-divider/>
      <div class="card-item-box user-option">
            <span class="user-option-item" @click="router.push('/user')">
              <el-icon :size="16"><User/></el-icon>
              个人中心
            </span>
        <span class="user-option-item" @click="router.push('/creation/content')">
              <el-icon :size="16"><Document/></el-icon>
              内容管理
            </span>
        <span class="user-option-item">
              <el-icon :size="16"><DataLine/></el-icon>
              我的待办
            </span>
        <el-divider/>
        <span class="user-option-item" @click="userLogout">
             <el-icon :size="14">
                <SvgIcon icon-name="exit"/>
             </el-icon>
              退出
            </span>
      </div>
    </el-card>
  </el-menu-item>
</template>

<script setup>
import {useRouter} from "vue-router";

const emits = defineEmits(["logout"])
const router = useRouter()
const props = defineProps({
  userInfo: {
    type: Object
  }
})
const userLogout = () => {
  emits("logout")
}
</script>

<style scoped lang="scss">
.user-avatar-item {
  z-index: 1001;
  border-bottom: none;
}

.user-avatar {
  z-index: 1002;
  transition: .3s;
  display: flex;
  align-items: center;
}

.user-card {
  display: none;
  color: var(--el-text-color-regular);
  z-index: 1001;
  line-height: 1;
  position: absolute;
  width: 250px;
  top: 100%;
  cursor: initial;
  font-size: 14px;

  :deep(.el-card__body) {
    padding: 0;
  }

  .el-divider {
    margin: 10px 0;
  }

  .card-item-box {
    padding: 20px 20px;
  }

  .username {
    color: var(--el-text-color-primary);
    margin-top: 20px;
    text-align: center;
    font-size: 16px;
  }

  .user-info {
    display: flex;
    justify-content: space-around;

    .user-info-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      .number {
        color: var(--el-text-color-primary);
        font-weight: bold;
        font-size: 18px
      }

      span {
        margin: 5px 0;
      }
    }
  }

  .user-option {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 10px;
    padding: 0;

    .user-option-item {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      cursor: pointer;
    }

    .user-option-item:hover {
      background-color: var(--el-color-primary-light-9);
    }
  }
}

@keyframes user-card-animation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.user-avatar:hover {
  transform: translateY(16px);
  scale: 1.1;
  transition: .3s;
}

.user-avatar-item:hover {
  .user-avatar {
    transform: translateY(16px);
    scale: 1.1;
    transition: .3s;
  }

  .user-card {
    display: block;
    animation: .3s user-card-animation;
  }
}
</style>