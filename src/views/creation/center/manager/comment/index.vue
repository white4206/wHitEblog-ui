<template>
  <el-card class="content-card" style="border: none;min-height: calc(100vh - 100px)" shadow="never">
    <el-tabs v-model="activeTab" @tab-change="tabChange" @tab-click="tabClick">
      <el-tab-pane label="博客评论" name="articleComment" v-infinite-scroll="load" :infinite-scroll-disabled="infinite"
                   :infinite-scroll-delay="1000">
        <el-tabs class="innerTab" v-model="activeArticleStatus" type="border-card" @tab-change="innerTabChange"
                 @tab-click="innerTabClick">

          <el-tab-pane label="我的文章评论" name="my">
            <el-empty v-if="!articleComments.length" description="空空如也">
            </el-empty>
            <div v-else>
              <ArticleComment v-for="articleComment in articleComments"/>
              <div class="noMore" v-if="noMore &&  isLoading" v-loading="isLoading">
                {{ isLoading ? "..." : "暂时没有更多了..." }}
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="待我审核的评论" name="myUnderReview">
            <el-empty v-if="!articleComments.length" description="空空如也">
            </el-empty>
            <div v-else>
              <UnderReviewComment :articleComments="articleComments"/>
              <div class="noMore" v-if="noMore &&  isLoading" v-loading="isLoading">
                {{ isLoading ? "..." : "暂时没有更多了..." }}
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="我发表的评论" name="myPost">
            <el-empty v-if="!articleComments.length" description="空空如也">
            </el-empty>
            <div v-else>
              <PostComment v-for="articleComment in articleComments"/>
              <div class="noMore" v-if="noMore &&  isLoading" v-loading="isLoading">
                {{ isLoading ? "..." : "暂时没有更多了..." }}
              </div>
            </div>
          </el-tab-pane>

        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import ArticleComment from "@/views/creation/center/manager/comment/components/ArticleComment.vue";
import UnderReviewComment from "@/views/creation/center/manager/comment/components/UnderReviewComment.vue";
import PostComment from "@/views/creation/center/manager/comment/components/PostComment.vue";

const route = useRoute()
const router = useRouter()
const infinite = ref(false)
const noMore = ref(true)
const isLoading = ref(true)
const activeTab = ref(route.query.tab || "articleComment")
const activeArticleStatus = ref("my")
const articleComments = ref([1, 2, 3])

const load = () => {
  noMore.value = true
  isLoading.value = true
}
const tabChange = () => {

}
const tabClick = (tab) => {
  router.push({query: {tab: tab.paneName}})
}
const innerTabClick = (tab) => {
  router.push({query: {tab: activeTab.value, status: tab.paneName}})
}
const innerTabChange = () => {
}
onMounted(() => {
  if (route.query.tab)
    activeTab.value = route.query.tab
})
</script>

<style scoped lang="scss">
.transparent-btn:hover {
  color: var(--el-color-primary)
}

.content-card {
  :deep(.el-card__body) {
    padding: 10px 20px 20px 20px;
  }
}

:deep(.el-tabs__nav-wrap::after) {
  content: none;
}

:deep(.el-tabs--border-card > .el-tabs__header) {
  background-color: transparent;
  border-bottom: none;
}

:deep(.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active) {
  border-right-color: transparent;
  border-left-color: transparent;
  font-weight: 500;
}

:deep(.el-tabs--border-card) {
  border: none;
}

:deep(.el-tabs__item.is-disabled) {
  cursor: text;
}

:deep(.el-form--inline .el-form-item) {
  margin-right: 16px;
}

:deep(.el-divider--horizontal) {
  margin: 12px 0;
}

.innerTab {
  :deep(.el-tabs__item) {
    color: var(--el-text-color-regular);
  }

  :deep(.el-tabs__item.is-active) {
    color: var(--el-color-primary);
  }

  :deep(.el-tabs__item) {
    padding: 0 10px !important;
  }

  :deep(.el-tabs__content) {
    padding: 10px;
  }
}


:deep(.el-tabs__item) {
  color: var(--el-text-color-regular);
  font-size: 16px;
}

:deep(.el-tabs__item.is-active) {
  color: var(--el-color-primary);
  font-weight: bold;
}

.innerTab {
  :deep(.el-tabs__item) {
    font-size: 14px;
  }

  :deep(.el-tabs__item.is-active) {
    font-weight: normal;
  }
}

.noMore {
  text-align: center;
  margin: 15px 0;
  font-size: 14px;
  color: var(--el-text-color-placeholder);
}
</style>