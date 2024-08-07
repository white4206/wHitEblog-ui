<template>
  <!-- <el-affix :offset="0" :z-index="999">-->
  <el-menu v-if="activeIndex!=='/creation'" :default-active="activeIndex" mode="horizontal" router :ellipsis="false"
           @select="handleSelect"
           :class="{menu:isVideoPageScroll || route.path !== '/video',videoPageMenu:!isVideoPageScroll && route.path === '/video'}">
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
    <el-menu-item :index="'/personal?author='+userStore.userInfo.id" v-if="userStore.isLogin"
                  class="user-avatar-item">
        <span class="user-avatar">
          <el-avatar :size="48" :src="userStore.userInfo.avatar"/>
        </span>
      <el-card class="user-card" @click.stop="1">
        <template #header>
          <div class="username"><span>{{ userStore.userInfo.nickname }}</span></div>
        </template>
        <div class="card-item-box user-info">
          <div class="user-info-item">
            <span class="number">{{ userStore.userInfo.fansNum === 0 ? '--' : userStore.userInfo.fansNum }}</span>
            <span>粉丝</span>
          </div>
          <div class="user-info-item">
              <span class="number">{{
                  userStore.userInfo.attentionNum === 0 ? '--' : userStore.userInfo.attentionNum
                }}</span>
            <span>关注</span>
          </div>
          <div class="user-info-item">
            <span class="number">{{ userStore.userInfo.likedNum === 0 ? '--' : userStore.userInfo.likedNum }}</span>
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
                <svg-icon icon-name="exit"/>
             </el-icon>
              退出
            </span>
        </div>
      </el-card>
    </el-menu-item>
    <el-menu-item index="/login" v-else>
        <span>
          <el-avatar :size="48">
            登录
          </el-avatar>
        </span>
    </el-menu-item>
    <el-menu-item index="/message">
      <el-popover :hide-after="0" v-if="userStore.isLogin" :width="120"
                  popper-style="padding: 10px 0 10px 0;min-width: auto;"
                  :offset="-5" trigger="hover">
        <template #reference>
          <el-badge :hidden="false" is-dot :offset="[2, 18]">消息</el-badge>
        </template>
        <div class="message-option">
          <div class="message-option-item">
            <el-badge :hidden="true" is-dot>评论和@</el-badge>
          </div>
          <div class="message-option-item">
            <el-badge is-dot>新增粉丝</el-badge>
          </div>
          <div class="message-option-item">
            <el-badge is-dot>赞和收藏</el-badge>
          </div>
          <div class="message-option-item">
            <el-badge is-dot>私信</el-badge>
          </div>
          <div class="message-option-item">
            <el-badge :hidden="true" is-dot>系统通知</el-badge>
          </div>
          <div class="message-option-item">
            <el-badge :hidden="true" is-dot>消息设置</el-badge>
          </div>
        </div>
      </el-popover>
      <span v-else>消息</span>
    </el-menu-item>
    <el-menu-item index="/user/history">
      <el-popover :hide-after="0" v-if="userStore.isLogin" popper-style="padding:0" :width="450" :offset="-5"
                  trigger="hover">
        <template #reference>
          历史
        </template>
        <div class="history-box">
          <el-scrollbar :max-height="480">
            <el-menu default-active="history" class="history-menu">
              <el-menu-item index="history">
                <span>浏览历史</span>
              </el-menu-item>
              <el-menu-item index="fav">
                <div class="name">我的收藏夹</div>
                <div class="count">{{ 76 }}</div>
              </el-menu-item>
              <el-menu-item v-for="item in 20" index="wait">
                <div class="name">收藏夹{{ item }}</div>
                <div class="count">{{ 76 }}</div>
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
          <div class="content-box">
            <div class="content">
              <el-scrollbar always :max-height="440">
                <div class="content-item" v-for="item in 20">
                  <span class="content-item-tag"><el-tag type="primary" effect="plain">博客</el-tag></span>
                  <span class="content-item-title">react项目实现语音识别功能</span>
                </div>
              </el-scrollbar>
            </div>
            <div class="viewMore" @click="router.push('/user/favorite')">
              查看更多
              <el-icon>
                <ArrowRight/>
              </el-icon>
            </div>
          </div>
        </div>
      </el-popover>
      <el-popover :hide-after="0" v-else :offset="-5" width="300px" trigger="hover">
        <template #reference>历史</template>
        <div>
          <div class="unLogin-desc">登录即可查看浏览历史和收藏</div>
          <el-button type="primary" style="width: 100%" size="large" round>立即登录</el-button>
        </div>
      </el-popover>
    </el-menu-item>
    <el-menu-item index="/creation">
      创作中心
    </el-menu-item>
    <!-- 主题切换 -->
    <div style="display: flex;align-items: center;margin-left: 10px">
      <el-switch
          v-model="globalStore.openDarkTheme"
          @click="changeTheme($event)"
          :before-change="beforeChange"
      >
        <template #active-action>
          <svg-icon icon-class="dark-icon" icon-name="moon"/>
        </template>
        <template #inactive-action>
          <svg-icon icon-class="light-icon" icon-name="sun"/>
        </template>
      </el-switch>
    </div>
    <!-- 发布按钮 -->
    <div class="edit-button">
      <el-button type="primary" round icon="CirclePlus" size="default" @click="router.push('/creation/editor')">发布
      </el-button>
    </div>
  </el-menu>
  <el-menu v-if="activeIndex==='/creation'&&route.path!=='/creation/editor'" :default-active="activeIndex"
           mode="horizontal" router
           :ellipsis="false" @select="handleSelect"
           class="menu">
    <Logo></Logo>
    <div style="display: flex;align-items: center;font-size: 18px;margin-left: 10px">
      <span>创作中心</span>
    </div>
    <div class="flex-grow"></div>
    <el-menu-item :index="'/personal?author='+userStore.userInfo.id" v-if="userStore.isLogin"
                  class="user-avatar-item">
        <span class="user-avatar">
          <el-avatar :size="48" :src="userStore.userInfo.avatar"/>
        </span>
      <el-card class="user-card" @click.stop="1">
        <template #header>
          <div class="username"><span>{{ userStore.userInfo.nickname }}</span></div>
        </template>
        <div class="card-item-box user-info">
          <div class="user-info-item">
            <span class="number">{{ userStore.userInfo.fansNum === 0 ? '--' : userStore.userInfo.fansNum }}</span>
            <span>粉丝</span>
          </div>
          <div class="user-info-item">
              <span class="number">{{
                  userStore.userInfo.attentionNum === 0 ? '--' : userStore.userInfo.attentionNum
                }}</span>
            <span>关注</span>
          </div>
          <div class="user-info-item">
            <span class="number">{{ userStore.userInfo.likedNum === 0 ? '--' : userStore.userInfo.likedNum }}</span>
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
                <svg-icon icon-name="exit"/>
             </el-icon>
              退出
            </span>
        </div>
      </el-card>
    </el-menu-item>
    <el-menu-item index="/login" v-else>
        <span>
          <el-avatar :size="48">
            登录
          </el-avatar>
        </span>
    </el-menu-item>
    <el-menu-item index="/message">
      <el-popover :hide-after="0" v-if="userStore.isLogin" :width="120"
                  popper-style="padding: 10px 0 10px 0;min-width: auto;"
                  :offset="-5" trigger="hover">
        <template #reference>
          <el-badge :hidden="false" is-dot :offset="[2, 18]">消息</el-badge>
        </template>
        <div class="message-option">
          <div class="message-option-item">
            <el-badge :hidden="true" is-dot>评论和@</el-badge>
          </div>
          <div class="message-option-item">
            <el-badge is-dot>新增粉丝</el-badge>
          </div>
          <div class="message-option-item">
            <el-badge is-dot>赞和收藏</el-badge>
          </div>
          <div class="message-option-item">
            <el-badge is-dot>私信</el-badge>
          </div>
          <div class="message-option-item">
            <el-badge :hidden="true" is-dot>系统通知</el-badge>
          </div>
          <div class="message-option-item">
            <el-badge :hidden="true" is-dot>消息设置</el-badge>
          </div>
        </div>
      </el-popover>
      <span v-else>消息</span>
    </el-menu-item>
    <!-- 主题切换 -->
    <div style="display: flex;align-items: center;margin-left: 10px">
      <el-switch
          v-model="globalStore.openDarkTheme"
          @click="changeTheme($event)"
          :before-change="beforeChange"
      >
        <template #active-action>
          <svg-icon icon-class="dark-icon" icon-name="moon"/>
        </template>
        <template #inactive-action>
          <svg-icon icon-class="light-icon" icon-name="sun"/>
        </template>
      </el-switch>
    </div>
  </el-menu>
  <el-menu v-if="route.path==='/creation/editor'" :default-active="activeIndex" mode="horizontal" router
           :ellipsis="false" @select="handleSelect"
           class="menu">
    <Logo></Logo>
    <el-popover :hide-after="0" trigger="hover" placement="bottom-start" :offset="-10" :show-arrow="false" width="140"
                popper-style="padding:0;min-width: auto;">
      <template #reference>
        <div @mouseover="isExpand=true" @mouseleave="isExpand=false"
             style="display: flex;align-items: center;font-size: 18px;margin-left: 50px">
          <el-icon @click="router.push('/creation')" style="margin-right: 5px">
            <ArrowLeft/>
          </el-icon>
          <span><b>发布文章</b></span>
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
        <div class="creation-menu-item">
          <el-icon>
            <svg-icon icon-name="article"/>
          </el-icon>
          <span>文章</span>
        </div>
        <div class="creation-menu-item">
          <el-icon>
            <svg-icon icon-name="upload"/>
          </el-icon>
          <span>上传资源</span>
        </div>
        <div class="creation-menu-item">
          <el-icon>
            <svg-icon icon-name="video"/>
          </el-icon>
          <span>视频</span>
        </div>
      </div>
    </el-popover>
    <div class="flex-grow"></div>
    <el-menu-item :index="'/personal?author='+userStore.userInfo.id" v-if="userStore.isLogin"
                  class="user-avatar-item">
        <span class="user-avatar">
          <el-avatar :size="48" :src="userStore.userInfo.avatar"/>
        </span>
      <el-card class="user-card" @click.stop="1">
        <template #header>
          <div class="username"><span>{{ userStore.userInfo.nickname }}</span></div>
        </template>
        <div class="card-item-box user-info">
          <div class="user-info-item">
            <span class="number">{{ userStore.userInfo.fansNum === 0 ? '--' : userStore.userInfo.fansNum }}</span>
            <span>粉丝</span>
          </div>
          <div class="user-info-item">
              <span class="number">{{
                  userStore.userInfo.attentionNum === 0 ? '--' : userStore.userInfo.attentionNum
                }}</span>
            <span>关注</span>
          </div>
          <div class="user-info-item">
            <span class="number">{{ userStore.userInfo.likedNum === 0 ? '--' : userStore.userInfo.likedNum }}</span>
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
                <svg-icon icon-name="exit"/>
             </el-icon>
              退出
            </span>
        </div>
      </el-card>
    </el-menu-item>
    <el-menu-item index="/login" v-else>
        <span>
          <el-avatar :size="48">
            登录
          </el-avatar>
        </span>
    </el-menu-item>
    <el-menu-item index="/message">
      <el-popover :hide-after="0" v-if="userStore.isLogin" :width="120"
                  popper-style="padding: 10px 0 10px 0;min-width: auto;"
                  :offset="-5" trigger="hover">
        <template #reference>
          <el-badge :hidden="false" is-dot :offset="[2, 18]">消息</el-badge>
        </template>
        <div class="message-option">
          <div class="message-option-item">
            <el-badge :hidden="true" is-dot>评论和@</el-badge>
          </div>
          <div class="message-option-item">
            <el-badge is-dot>新增粉丝</el-badge>
          </div>
          <div class="message-option-item">
            <el-badge is-dot>赞和收藏</el-badge>
          </div>
          <div class="message-option-item">
            <el-badge is-dot>私信</el-badge>
          </div>
          <div class="message-option-item">
            <el-badge :hidden="true" is-dot>系统通知</el-badge>
          </div>
          <div class="message-option-item">
            <el-badge :hidden="true" is-dot>消息设置</el-badge>
          </div>
        </div>
      </el-popover>
      <span v-else>消息</span>
    </el-menu-item>
    <!-- 主题切换 -->
    <div style="display: flex;align-items: center;margin-left: 10px">
      <el-switch
          v-model="globalStore.openDarkTheme"
          @click="changeTheme($event)"
          :before-change="beforeChange"
      >
        <template #active-action>
          <svg-icon icon-class="dark-icon" icon-name="moon"/>
        </template>
        <template #inactive-action>
          <svg-icon icon-class="light-icon" icon-name="sun"/>
        </template>
      </el-switch>
    </div>
  </el-menu>
  <!-- </el-affix>-->
</template>

<script setup>
import Logo from '@/components/Navbar/components/logo.vue'
import {computed, onMounted, ref} from 'vue'
import {useRoute, useRouter} from "vue-router"
import useUserStore from "@/store/modules/user.js";
import {ElMessage, ElMessageBox} from 'element-plus'
import {getToken} from "@/utils/auth.js";
import {useDark, useToggle} from '@vueuse/core'
import useGlobalStore from "@/store/modules/global.js";
import {Search} from "@element-plus/icons-vue";

const isVideoPageScroll = ref(false)
const isExpand = ref(false)
const keyword = ref()
const globalStore = useGlobalStore()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const userStore = useUserStore();
const route = useRoute()
const router = useRouter()

const searchUserArticle = () => {
  if (keyword.value)
    router.push({path: '/searchPage', query: {q: keyword.value || undefined}})
  else
    ElMessage.info("请输入搜索内容")
}
const beforeChange = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(true)
    }, 0)
  })
}
const changeTheme = (e) => {
  if (!document.startViewTransition) {
    toggleDark()
  } else {
    // 获取到 transition API 实例
    const transition = document.startViewTransition(() => {
      toggleDark()
    })
    // 在 transition.ready 的 Promise 完成后，执行自定义动画
    transition.ready.then(() => {
      // 由于我们要从鼠标点击的位置开始做动画，所以我们需要先获取到鼠标的位置
      const {clientX, clientY} = e

      // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
      const radius = Math.hypot(
          Math.max(clientX, innerWidth - clientX),
          Math.max(clientY, innerHeight - clientY)
      )
      const clipPath = [
        `circle(0% at ${clientX}px ${clientY}px)`,
        `circle(${radius}px at ${clientX}px ${clientY}px)`
      ]
      const isDark = globalStore.openDarkTheme
      // 自定义动画
      document.documentElement.animate(
          {
            // 如果要切换到暗色主题，我们在过度的时候从半径 100% 的圆开始，到 0% 的圆结束
            clipPath: isDark ? clipPath.reverse() : clipPath
          },
          {
            duration: 500,
            // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容
            pseudoElement: isDark
                ? '::view-transition-old(root)'
                : '::view-transition-new(root)'
          }
      )
    })
  }
}
// js 方法显示用户选项卡
const activeIndex = computed(() => {
  return '/' + route.path.split("/")[1]
})
const handleSelect = (key, keyPath) => {
  // console.log(key, keyPath)
}
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
  if (isDark.value) {
    globalStore.openDarkTheme = true
  }
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

.message-option {
  text-align: center;

  .message-option-item {
    padding: 10px 30px;
    cursor: pointer;
    text-align: left;
  }

  .message-option-item:hover {
    background-color: var(--el-color-primary-light-9);
  }
}

.history-box {
  display: flex;

  :deep(.el-scrollbar__view) {
    overflow-x: hidden;
  }

  .history-menu {
    border-right: 2px solid var(--el-border-color-lighter);
    padding: 10px 0 10px 0;
    min-height: 480px;
    width: 150px;

    .el-menu-item {
      height: 40px;
      color: var(--el-text-color-regular);
      justify-content: space-between;

      .count {
        color: var(--el-text-color-secondary);
      }

    }

    .el-menu-item.is-active {
      color: var(--el-color-primary);
      background-color: var(--el-color-primary-light-9);

      .count {
        color: var(--el-color-primary);
      }
    }

  }

  .content-box {
    width: 300px;

    .content {
      padding: 10px 0 10px 0;
      height: 440px;

      .content-item {
        color: var(--el-text-color-primary);
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 40px;
        padding: 10px 20px;

        .content-item-tag {
          margin-right: 10px;

          .el-tag {
            background-color: transparent;
          }
        }

        .content-item-title {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .content-item:hover {
        background-color: var(--el-color-primary-light-9);
        cursor: pointer;
      }
    }

    .viewMore {
      color: var(--el-text-color-secondary);
      border-top: 2px solid var(--el-border-color-lighter);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
    }

    .viewMore:hover {
      cursor: pointer;
      color: var(--el-color-primary);
    }
  }
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

.dark-icon {
  border-radius: 50%;
  color: #cfd3dc;
  background-color: #141414;
}

.light-icon {
  color: var(--el-text-color-regular);
}
</style>