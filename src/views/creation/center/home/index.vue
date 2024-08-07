<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <Statistics/>
      <el-card class="content-card" shadow="never">
        <div style="position: relative">
          <div class="title-more">
            <el-button link class="title-btn" @click="router.push({path:'/creation/content',query:{tab:activeTab}})">
              查看更多
            </el-button>
          </div>
          <el-tabs v-model="activeTab" @tab-click="tabClick">
            <el-tab-pane label="近期文章" name="article">
              <div v-if="!recentArticles.length" class="empty-box">
                <el-empty description="空空如也"/>
                <el-link type="primary" :underline="false">
                  <div class="text">
                    <div>教你玩转wHitE博客</div>
                    <div>创作属于自己的第一篇文章</div>
                  </div>
                </el-link>
                <el-button type="primary" round style="width: 20%;padding: 20px 0"
                           @click="router.push('/creation/editor')">
                  写博客
                </el-button>
              </div>
              <RecentArticle v-else v-for="recentArticle in recentArticles" :key="recentArticle.id"
                             :recentArticle="recentArticle"/>
            </el-tab-pane>
            <el-tab-pane label="近期上传" name="resource">
              <div v-if="true" class="empty-box">
                <el-empty description="空空如也"/>
                <el-link type="primary" :underline="false">现在去上传</el-link>
              </div>
              <RecentResource v-else v-for="item in 3"/>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <Notice/>
    </el-col>
  </el-row>
</template>

<script setup>
import Statistics from "@/views/creation/center/home/components/Statistics.vue";
import Notice from "@/views/creation/center/home/components/Notice.vue";
import {onMounted, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {getRecentArticle} from "@/api/blog.js";
import RecentArticle from "@/views/creation/center/home/components/RecentArticle.vue";
import RecentResource from "@/views/creation/center/home/components/RecentResource.vue";

const router = useRouter()
const route = useRoute()
const activeTab = ref("article")
const recentArticles = ref([])

const tabClick = (tab) => {
  router.push({query: {tab: tab.paneName}})
}
onMounted(() => {
  if (route.query.tab)
    activeTab.value = route.query.tab
  getRecentArticle().then(res => {
    recentArticles.value = res.data
  })
})
</script>

<style scoped lang="scss">
.content-card {
  margin-bottom: 20px;
  border: none;

  :deep(.el-tabs__nav-wrap::after) {
    content: none;
  }

  .title-more {
    .title-btn {
      z-index: 1;
      height: 40px;
      position: absolute;
      top: 0;
      right: 0;
    }

    :deep(.el-button > span) {
      font-weight: normal;
    }
  }

  :deep(.el-divider--horizontal) {
    margin: 12px 0;
  }

  .recent-article, .recent-resource {
    .article-tag, .resource-tag {
      height: 45px;
      display: flex;
      align-items: start;
      justify-content: center;
    }

    .article-box, .resource-box {
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .title {
        font-weight: bold;
        margin-bottom: 10px;
      }

      .title:hover {
        cursor: pointer;
        color: var(--el-color-primary);
      }

      .abstractText {
        cursor: pointer;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        color: var(--el-text-color-regular);
      }
    }

    .desc-box {
      display: flex;
      justify-content: space-around;

      .desc-option {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .count {
          width: 100%;
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .count:hover {
          cursor: pointer;
          color: var(--el-color-primary);
        }

        .desc {
          width: 100%;
          color: var(--el-text-color-regular);
          font-size: 14px;
        }
      }
    }
  }

  .empty-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .el-empty {
      padding-bottom: 10px;
    }

    .el-link {
      margin-bottom: 20px;

      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;

        div {
          text-align: center;
        }
      }
    }

    .el-button {
      margin-bottom: 20px;
    }
  }

  :deep(.el-tabs__item) {
    font-size: 16px;
  }

  :deep(.el-tabs__item.is-active) {
    font-weight: bold;
  }
}
</style>