<template>
  <!-- <el-affix :offset="0" :z-index="999">-->
  <el-menu
      v-if="activeIndex!=='/creation'"
      :default-active="activeIndex" mode="horizontal"
      router :ellipsis="false"
      :class="{menu:isVideoPageScroll || route.path !== '/video',
      videoPageMenu:!isVideoPageScroll && route.path === '/video'}"
  >
    <Logo></Logo>
    <el-menu-item index="/home">首页</el-menu-item>
    <el-menu-item index="/blog">博客</el-menu-item>
    <el-menu-item index="/resource">资源</el-menu-item>
    <el-menu-item index="/video">视频</el-menu-item>
    <!-- 搜索框 -->
    <div v-if="activeIndex!=='/searchPage'" style="display: flex;align-items: center;">
      <div class="search-box">
        <el-input v-model="keyword"
                  @keyup.enter="searchUserArticle"
                  placeholder="请输入关键词以搜索本站内容" clearable
                  class="search-input">
          <template #prefix>
            <el-icon :size="25">
              <svg-icon icon-name="searchLogo"/>
            </el-icon>
          </template>
        </el-input>
        <el-button type="primary" :icon="Search" class="search-button"
                   @click="searchUserArticle">
          搜索
        </el-button>
      </div>
    </div>
    <div class="flex-grow"></div>
    <LoginMenuItem v-if="userStore.isLogin" :userInfo="userStore.userInfo" @logout="userLogout"/>
    <el-menu-item index="/login" v-else>
        <span>
          <el-avatar :size="48">
            登录
          </el-avatar>
        </span>
    </el-menu-item>
    <MessageMenuItem :isLogin="userStore.isLogin"/>
    <HistoryMenuItem :isLogin="userStore.isLogin"/>
    <el-menu-item index="/creation">
      创作中心
    </el-menu-item>
    <!-- 主题切换 -->
    <SwitchTheme/>
    <!-- 发布按钮 -->
    <EditButton/>
  </el-menu>
  <el-menu
      v-if="activeIndex==='/creation'&&route.path!=='/creation/editor'
      &&route.path!=='/creation/upload/single'&&route.path!=='/creation/upload/batch'
      &&route.path!=='/creation/post'"
      :default-active="activeIndex" mode="horizontal"
      router :ellipsis="false" class="menu"
  >
    <Logo></Logo>
    <div style="display: flex;align-items: center;font-size: 18px;margin-left: 10px">
      <span>创作中心</span>
    </div>
    <div class="flex-grow"></div>
    <LoginMenuItem v-if="userStore.isLogin" :userInfo="userStore.userInfo" @logout="userLogout"/>
    <el-menu-item index="/login" v-else>
        <span>
          <el-avatar :size="48">
            登录
          </el-avatar>
        </span>
    </el-menu-item>
    <MessageMenuItem :isLogin="userStore.isLogin"/>
    <!-- 主题切换 -->
    <SwitchTheme/>
  </el-menu>
  <el-menu
      v-if="route.path==='/creation/editor'||route.path==='/creation/upload/single'
      ||route.path==='/creation/upload/batch'||route.path==='/creation/post'"
      :default-active="activeIndex" mode="horizontal"
      router :ellipsis="false" class="menu"
  >
    <Logo></Logo>
    <el-popover
        :hide-after="0" trigger="hover"
        placement="bottom-start" :offset="-10"
        :show-arrow="false" width="140"
        popper-style="padding:0;min-width: auto;"
    >
      <template #reference>
        <div @mouseover="isExpand=true" @mouseleave="isExpand=false"
             style="display: flex;align-items: center;font-size: 18px;margin-left: 50px;cursor: pointer;">
          <el-icon @click="router.push('/creation')" style="margin-right: 5px">
            <ArrowLeft/>
          </el-icon>
          <span
              v-if="route.path==='/creation/editor'"
          ><b>发布文章</b></span>
          <span
              v-if="route.path==='/creation/upload/single'
              ||route.path==='/creation/upload/batch'"
          ><b>上传资源</b></span>
          <span
              v-if="route.path==='/creation/post'"
          ><b>创作视频</b></span>
          <el-icon v-if="isExpand" style="margin-left: 5px" size="14">
            <CaretBottom/>
          </el-icon>
          <el-icon v-else style="margin-left: 5px" size="14">
            <CaretTop/>
          </el-icon>
        </div>
      </template>
      <div class="creation-menu">
        <div class="creation-menu-subtitle">切换创作体裁</div>
        <div class="creation-menu-item" @click="router.push('/creation/editor')">
          <el-icon>
            <svg-icon icon-name="article"/>
          </el-icon>
          <span>文章</span>
        </div>
        <div class="creation-menu-item" @click="router.push('/creation/upload')">
          <el-icon>
            <svg-icon icon-name="upload"/>
          </el-icon>
          <span>上传资源</span>
        </div>
        <div class="creation-menu-item" @click="router.push('/creation/post')">
          <el-icon>
            <svg-icon icon-name="video"/>
          </el-icon>
          <span>视频</span>
        </div>
      </div>
    </el-popover>
    <div class="flex-grow"></div>
    <LoginMenuItem v-if="userStore.isLogin" :userInfo="userStore.userInfo" @logout="userLogout"/>
    <el-menu-item index="/login" v-else>
        <span>
          <el-avatar :size="48">
            登录
          </el-avatar>
        </span>
    </el-menu-item>
    <MessageMenuItem :isLogin="userStore.isLogin"/>
    <!-- 主题切换 -->
    <SwitchTheme/>
  </el-menu>
  <!-- </el-affix>-->
</template>

<script setup>
import Logo from '@/components/Navbar/components/Logo.vue'
import {computed, onMounted, ref} from 'vue'
import {useRoute, useRouter} from "vue-router"
import useUserStore from "@/store/modules/user.js";
import {ElMessage, ElMessageBox} from 'element-plus'
import {getToken} from "@/utils/auth.js";
import {Search} from "@element-plus/icons-vue";
import LoginMenuItem from "@/components/Navbar/components/LoginMenuItem.vue";
import MessageMenuItem from "@/components/Navbar/components/MessageMenuItem.vue";
import SwitchTheme from "@/components/Navbar/components/SwitchTheme.vue";
import HistoryMenuItem from "@/components/Navbar/components/HistoryMenuItem.vue";
import EditButton from "@/components/Navbar/components/EditButton.vue";

const isVideoPageScroll = ref(false)
const isExpand = ref(false)
const keyword = ref()
const userStore = useUserStore();
const route = useRoute()
const router = useRouter()

const searchUserArticle = () => {
  if (keyword.value)
    router.push({path: '/searchPage', query: {q: keyword.value || undefined}})
  else
    ElMessage.info("请输入搜索内容")
}
// js 方法显示用户选项卡
const activeIndex = computed(() => {
  return '/' + route.path.split("/")[1]
})
const userLogout = () => {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.userLogout().then(res => {
      ElMessage.info("登出成功")
      router.push('/login')
    })
  }).catch(() => {
  });
}
onMounted(() => {
  if (getToken() !== undefined)
    userStore.userGetInfo()
  window.addEventListener("scroll", () => {
    isVideoPageScroll.value = !!document.documentElement.scrollTop;
  })
})
</script>

<style lang="scss" scoped>
.search-box {
  margin-left: 50px;
  height: 32px;
  display: flex;

  :deep(.el-input__wrapper) {
    width: 320px;
    border-radius: 25px 0 0 25px;
    background-color: var(--el-fill-color-lighter);
  }
}

.search-button {
  border-radius: 0 25px 25px 0;
}

.menu {
  background-color: var(--el-bg-color);
  box-shadow: 0 0 6px var(--el-border-color-lighter);
  border: none;
}

.videoPageMenu {
  background-color: transparent;
  border: none;
  color: var(--el-color-white);

  .el-menu-item {
    padding: 15px;
    color: var(--el-color-white) !important;
    font-weight: 500;
    background-color: transparent !important;
    border-bottom: none;
    transition: .2s;
  }

  .is-active {
    border-radius: 0 0 20px 20px;
    background-color: #9286d1 !important;
  }

  :deep(.el-input__wrapper) {
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: none;
  }

  :deep(.el-input__inner) {
    color: #606266;
  }

  @keyframes menuItemHover {
    from {
      transform: translate(0, 0px);
    }
    to {
      transform: translate(0, -2px);
    }
  }

  .el-menu-item:hover {
    animation: menuItemHover ease .2s;
  }

}

.flex-grow {
  flex-grow: 1;
}

.el-menu {
  padding: 0 20px;
}

.edit-button {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background-color: transparent;
}

:deep(.el-switch.is-checked .el-switch__core) {
  color: var(--el-text-color-primary);
  border: 1px solid var(--el-switch-border-color, var(--el-switch-off-color));
  background-color: var(--el-switch-off-color);
}

:deep(.el-switch__core .el-switch__action) {
  background-color: var(--el-bg-color);
}

.unLogin-desc {
  margin: 10px 0 20px 0;
  text-align: center;
}

.creation-menu {
  .creation-menu-subtitle {
    font-size: 12px;
    padding: 10px 25px;
    color: var(--el-text-color-primary)
  }

  .creation-menu-item {
    display: flex;
    align-items: center;
    padding: 8px 25px;

    span {
      margin-left: 10px;
    }
  }

  .creation-menu-item:hover {
    cursor: pointer;
    background-color: var(--el-color-primary-light-9);
  }
}
</style>