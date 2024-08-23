<template>
  <el-menu-item index="/user/history">
    <el-popover :hide-after="0" v-if="isLogin" popper-style="padding:0" :width="450" :offset="-5"
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
                <span class="text-ellipsis-1">react项目实现react项目实现语音识别功能语音识别功能</span>
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
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
const props = defineProps({
  isLogin: {
    type: Boolean
  }
})
</script>


<style scoped lang="scss">
.history-box {
  display: flex;

  :deep(.el-scrollbar__view) {
    overflow-x: hidden;
  }

  .history-menu {
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
    border-left: 2px solid var(--el-border-color-lighter);
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

.unLogin-desc {
  margin: 10px 0 20px 0;
  text-align: center;
}
</style>