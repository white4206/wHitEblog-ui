<template>
  <div class="sidebar-container">
    <Affix :offset="80" :z-index="99">
      <!-- <el-affix :offset="80" z-index="99">-->
      <div class="title-btn">
        <el-popover :hide-after="0" width="120" placement="right-start" trigger="hover"
                    popper-style="padding:0;min-width: auto;">
          <template #reference>
            <el-button style="width: 100%" type="primary" size="large" round
                       @click="router.push('/creation/editor')">发布
              <el-icon>
                <CaretBottom/>
              </el-icon>
            </el-button>
          </template>
          <div class="post-menu">
            <div class="post-menu-item" @click="router.push('/creation/editor')">文章</div>
            <div class="post-menu-item" @click="ElMessage.success('上传资源')">上传资源</div>
            <div class="post-menu-item" @click="ElMessage.success('视频')">视频</div>
          </div>
        </el-popover>
      </div>
      <div class="menu">
        <el-menu :default-active="activeIndex" ref="menuRef" router>
          <el-menu-item index="/creation">
            <el-icon>
              <House/>
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="manager">
            <template #title>
              <el-icon>
                <TrendCharts/>
              </el-icon>
              <span>管理</span>
            </template>
            <el-menu-item index="/creation/manager/content">
              <span>内容管理</span>
            </el-menu-item>
            <el-menu-item index="/creation/manager/comment">
              <span>评论管理</span>
            </el-menu-item>
          </el-sub-menu>
          <!--          <el-sub-menu index="data">-->
          <!--            <template #title>-->
          <!--              <el-icon>-->
          <!--                <Histogram/>-->
          <!--              </el-icon>-->
          <!--              <span>数据</span>-->
          <!--            </template>-->
          <!--            <el-menu-item>-->
          <!--              <span>作品数据</span>-->
          <!--            </el-menu-item>-->
          <!--            <el-menu-item>-->
          <!--              <span>粉丝数据</span>-->
          <!--            </el-menu-item>-->
          <!--            <el-menu-item>-->
          <!--              <span>一周小结</span>-->
          <!--            </el-menu-item>-->
          <!--          </el-sub-menu>-->
          <el-sub-menu index="setting">
            <template #title>
              <el-icon>
                <Tools/>
              </el-icon>
              <span>设置</span>
            </template>
            <el-menu-item index="/creation/setting/blogSetting">
              <span>博客设置</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
      <!-- </el-affix>-->
    </Affix>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import Affix from "@/components/Affix/index.vue";

const route = useRoute();
const router = useRouter();
const menuRef = ref()

const activeIndex = computed(() => {
  return '/' + route.path.split("/")[1]
      + (route.path.split("/")[2] ? "/" + route.path.split("/")[2] : "")
      + (route.path.split("/")[3] ? "/" + route.path.split("/")[3] : "")
})
onMounted(() => {
  // 默认展开所有二级菜单
  menuRef.value.open("manager")
  menuRef.value.open("setting")
})
</script>

<style scoped lang="scss">
.sidebar-container {
  overflow: visible;
  width: 256px;
  min-height: calc(100vh - 100px);
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .menu {
    margin: 0 auto;
    width: 220px;

    :deep(.el-menu ) {
      border: none;
      background-color: transparent;
    }

    .el-menu-item {
      .el-icon {
        color: var(--el-text-color-secondary);
      }
    }

    .el-menu-item.is-active {
      .el-icon {
        color: var(--el-color-primary);
      }
    }

    .el-sub-menu__title {
      .el-icon {
        color: var(--el-text-color-secondary);
      }
    }
  }

  .title-btn {
    margin: 0 20px 20px 20px;

    .el-button {
      font-size: 18px;
      font-weight: bold;
    }
  }
}

.post-menu {
  .post-menu-item {
    padding: 10px 20px;
  }

  .post-menu-item:hover {
    cursor: pointer;
    background-color: var(--el-color-primary-light-9);
  }
}
</style>