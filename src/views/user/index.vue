<template>
  <el-main>
    <el-row justify="center">
      <el-col :span="20" :xs="17" :sm="18" :md="19" :lg="20" :xl="21">
        <el-row :gutter="10">
          <el-col :span="4">
            <Affix :offset="80" :z-index="99">
              <!-- <el-affix :offset="80" :z-index="99">-->
              <el-menu :default-active="activeIndex" class="el-menu-vertical-bar" router>
                <el-menu-item index="/user/profile">
                  <span>个人资料</span>
                </el-menu-item>
                <el-menu-item index="/user/account">
                  <span>账号设置</span>
                </el-menu-item>
                <!--                <el-menu-item index="/user/privacy">-->
                <!--                  <span>隐私设置</span>-->
                <!--                </el-menu-item>-->
                <el-menu-item index="/user/favorite">
                  <span>我的收藏</span>
                </el-menu-item>
                <el-menu-item index="/user/history">
                  <span>浏览历史</span>
                </el-menu-item>
                <el-divider/>
                <el-menu-item index="/creation/manager/content">
                  <span>内容管理 </span>
                  <el-icon class="menu-item-icon">
                    <ArrowRight/>
                  </el-icon>
                </el-menu-item>
                <el-menu-item index="">
                  <span>待办事项管理</span>
                  <el-icon class="menu-item-icon">
                    <ArrowRight/>
                  </el-icon>
                </el-menu-item>
              </el-menu>
              <!-- </el-affix>-->
            </Affix>
          </el-col>
          <el-col :span="20">
            <router-view></router-view>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-main>
  <WebsiteInfoBar/>
  <el-backtop :right="50" :bottom="120"/>
</template>

<script setup>
import {ArrowRight} from '@element-plus/icons-vue'
import {computed} from 'vue'
import {useRoute} from "vue-router"
import WebsiteInfoBar from "@/components/WebsiteInfoBar/index.vue";
import Affix from "@/components/Affix/index.vue";

const route = useRoute()
const activeIndex = computed(() => {
  return route.path
})
</script>

<style lang="scss" scoped>
.el-main {
  overflow: visible;
}

.el-menu-item {
  justify-content: center;
}

.el-menu {
  background-color: var(--el-bg-color);
  border: none;
}

.el-menu-vertical-bar:not(.el-menu--collapse) {
  // min-height: 100%;
  border-radius: 5px;
}

// .el-menu-item{}
.el-menu-item.is-active {
  border-right: 4px solid var(--el-color-primary);
}

.el-divider {
  margin: 10px 0;
  border-top: 1px solid var(--el-border-color-lighter);
}

.menu-item-icon {
  position: absolute;
  right: 10px;
}
</style>