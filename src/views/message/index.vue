<template>
  <el-main>
    <div class="message-card">
      <el-card shadow="never">
        <div>
          <div class="title-box">
            <span class=title>消息中心</span>
            <el-button link>
              <el-icon>
                <Setting/>
              </el-icon>
              消息设置
            </el-button>
          </div>
          <el-tabs v-model="activeTab" @tab-click="tabClick">
            <el-tab-pane label="评论和@" name="comment">
              <template #label>
                <el-badge :hidden="true" is-dot>评论和@</el-badge>
              </template>
              <el-empty v-if="false" description="空空如也"/>
              <CommentBox v-else/>
            </el-tab-pane>
            <el-tab-pane label="新增粉丝" name="fans">
              <template #label>
                <el-badge :hidden="true" is-dot>新增粉丝</el-badge>
              </template>
              <el-empty v-if="false" description="空空如也"/>
              <FansBox v-else/>
            </el-tab-pane>
            <el-tab-pane label="赞和收藏" name="fav">
              <template #label>
                <el-badge :hidden="false" is-dot>赞和收藏</el-badge>
              </template>
              <el-empty v-if="false" description="空空如也"/>
              <FavBox v-else/>
            </el-tab-pane>
            <el-tab-pane label="私信" name="message">
              <template #label>
                <el-badge :hidden="true" is-dot>私信</el-badge>
              </template>
              <el-empty v-if="true" description="空空如也"/>
              <MessageBox v-else/>
            </el-tab-pane>
            <el-tab-pane label="系统通知" name="notice">
              <template #label>
                <el-badge :hidden="true" is-dot>系统通知</el-badge>
              </template>
              <el-empty v-if="false" description="空空如也"/>
              <NoticeBox v-else/>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </div>
  </el-main>
  <WebsiteInfoBar/>
  <el-backtop :right="50" :bottom="120"/>
</template>

<script setup>
import {onMounted, ref} from "vue";
import WebsiteInfoBar from "@/components/WebsiteInfoBar/index.vue";
import {useRoute, useRouter} from "vue-router";
import CommentBox from "@/views/message/components/CommentBox.vue";
import FansBox from "@/views/message/components/FansBox.vue";
import FavBox from "@/views/message/components/FavBox.vue";
import NoticeBox from "@/views/message/components/NoticeBox.vue";
import MessageBox from "@/views/message/components/_deprecated_MessageBox.vue";

const router = useRouter()
const route = useRoute()
const activeTab = ref("comment")

const tabClick = (tab) => {
  router.push({query: {tab: tab.paneName}})
}
onMounted(() => {
  if (route.query.tab)
    activeTab.value = route.query.tab
})
</script>

<style scoped lang="scss">
:deep(.el-tabs__nav-wrap::after) {
  content: none;
}

.message-card {
  margin: 0 auto;
  width: 1200px;

  .title-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .title {
      font-size: 18px;
    }
  }

  :deep(.el-tabs__item) {
    color: var(--el-text-color-secondary);
    font-size: 16px;
  }

  :deep(.el-tabs__item.is-active) {
    color: var(--el-color-primary);
  }
}


</style>