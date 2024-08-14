<template>
  <el-card class="content-card" style="border: none;min-height: calc(100vh - 100px)" shadow="never">
    <el-tabs v-model="activeTab" @tab-change="tabChange" @tab-click="tabClick">

      <el-tab-pane label="文章" name="article" v-infinite-scroll="load" :infinite-scroll-disabled="infinite"
                   :infinite-scroll-delay="1000">
        <el-tabs class="innerTab" v-model="activeArticleStatus" type="border-card" @tab-change="innerTabChange"
                 @tab-click="innerTabClick">
          <el-tab-pane label="状态" disabled/>
          <el-tab-pane v-for="tab in articleStatusList" :key="tab.id" :label="tab.label" :name="tab.name">
            <template #label>{{ tab.label + '(' + contentArticles.length + ')' }}</template>
            <el-form :model="queryParam" :inline="true">
              <el-form-item style="margin-bottom: 10px">
                <el-select style="width: 80px;margin-right: 10px" v-model="queryParam.year" placeholder="年"
                           @change="yearOptionChange">
                  <el-option v-for="option in yearOptions" :key="option.key" :label="option.label"
                             :value="option.value"/>
                </el-select>
                <el-select style="width: 80px;" v-model="queryParam.month" placeholder="月" @change="monthOptionChange"
                           @focus="monthOptionFocus">
                  <el-option v-for="option in monthOptions" :key="option.key" :label="option.label"
                             :value="option.value"/>
                </el-select>
              </el-form-item>
              <el-form-item style="margin-bottom: 10px">
                <el-select style="width: 120px;" v-model="queryParam.category" placeholder="文章类型">
                  <el-option v-for="option in categoryOptions" :key="option.key" :label="option.label"
                             :value="option.value"/>
                </el-select>
              </el-form-item>
              <el-form-item style="margin-bottom: 10px">
                <el-input v-model="queryParam.keyword" placeholder="请输入关键词"></el-input>
              </el-form-item>
              <el-form-item style="margin-bottom: 10px">
                <el-button class="transparent-btn" style="background:transparent;padding: 0 25px" type="primary" plain
                           @click="search">搜索
                </el-button>
              </el-form-item>
            </el-form>
            <div>
              <div v-if="!contentArticles.length" class="empty-box">
                <el-link type="primary" :underline="false">
                  <div class="text">
                    <div>教你玩转wHitE博客</div>
                    <div>创作属于自己的第一篇文章</div>
                  </div>
                </el-link>
                <el-button type="primary" round style="width: 200px;padding: 20px 0;font-size: 18px"
                           @click="router.push('/creation/editor')">写博客
                </el-button>
              </div>
              <div v-else>
                <ArticleItem v-for="contentArticle in contentArticles" :contentArticle="contentArticle"/>
                <div class="noMore" v-if="noMore &&  isLoading" v-loading="isLoading">
                  {{ isLoading ? "..." : "暂时没有更多了..." }}
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>

      <el-tab-pane label="资源" name="resource">
        <el-tabs class="innerTab resource-tab" v-model="activeResourceTab" type="border-card"
                 @tab-change="resourceInnerTabChange"
                 @tab-click="resourceInnerTabClick">
          <el-tab-pane label="上传明细" name="upload">
            <el-form class="resource-queryForm" :model="queryParam" :inline="true">
              <el-form-item>
                <el-select style="width: 80px;margin-right: 10px" v-model="queryParam.year" placeholder="年"
                           @change="yearOptionChange">
                  <el-option v-for="option in yearOptions" :key="option.key" :label="option.label"
                             :value="option.value"/>
                </el-select>
                <el-select style="width: 80px;margin-right: 40px" v-model="queryParam.month" placeholder="月"
                           @change="monthOptionChange"
                           @focus="monthOptionFocus">
                  <el-option v-for="option in monthOptions" :key="option.key" :label="option.label"
                             :value="option.value"/>
                </el-select>
              </el-form-item>
              <el-form-item style="margin-right: 10px">
                <el-input style="width:440px" v-model="queryParam.keyword" placeholder="请输入关键词"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="transparent-btn" style="background:transparent;padding: 0 25px" type="primary" plain
                           @click="search">搜索
                </el-button>
              </el-form-item>
            </el-form>
            <el-tabs class="innerTab" v-model="activeUploadStatus" type="border-card"
                     @tab-change="innerTabChange"
                     @tab-click="innerTabClick">
              <el-tab-pane label="状态" disabled/>
              <el-tab-pane v-for="tab in resourceStatusList" :key="tab.id" :label="tab.label" :name="tab.name">
                <template #label>{{ tab.label + '(' + 0 + ')' }}</template>
                <el-empty v-if="!contentArticles.length" description="空空如也">
                  <el-button class="transparent-btn" size="small" type="primary" style="background:transparent;" plain
                             round>去传资源
                  </el-button>
                </el-empty>
                <div v-else>
                  <UploadResourceItem v-for="contentArticle in contentArticles" :contentArticle="contentArticle"/>
                  <div class="noMore" v-if="noMore &&  isLoading" v-loading="isLoading">
                    {{ isLoading ? "..." : "暂时没有更多了..." }}
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="下载明细" name="download">
            <el-tabs class="innerTab" v-model="activeDownloadStatus"
                     type="border-card" @tab-change="innerTabChange"
                     @tab-click="innerTabClick">
              <el-tab-pane label="状态" disabled/>
              <el-tab-pane label="全部" name="total">
                <template #label>{{ "全部" + '(' + 0 + ')' }}</template>
                <el-empty v-if="!contentArticles.length" description="空空如也">
                  <el-button class="transparent-btn" size="small" type="primary" style="background:transparent;" plain
                             round>去传资源
                  </el-button>
                </el-empty>
                <div v-else>
                  <DownloadResourceItem v-for="contentArticle in contentArticles" :contentArticle="contentArticle"/>
                  <div class="noMore" v-if="noMore &&  isLoading" v-loading="isLoading">
                    {{ isLoading ? "..." : "暂时没有更多了..." }}
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
        <div class="top-operation-box">
          <el-button link>我的收藏</el-button>
          <el-button class="transparent-btn" type="primary" plain round style="background:transparent;">上传资源
          </el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="视频" name="video">
        <el-tabs class="innerTab" v-model="activeArticleStatus" type="border-card" @tab-change="innerTabChange"
                 @tab-click="innerTabClick">
          <el-tab-pane v-for="tab in videoStatusList" :key="tab.id" :label="tab.label" :name="tab.name">
            <template #label>{{ tab.label + '(' + contentArticles.length + ')' }}</template>
            <div>
              <el-empty v-if="!contentArticles.length" description=" ">
                <div style="color: var(--el-text-color-secondary);font-size: 14px;margin-bottom: 5px">
                  提示:你还没有视频资源~
                </div>
                <el-button type="primary" link>去上传</el-button>
              </el-empty>
              <div v-else>
                <VideoItem v-for="contentArticle in contentArticles" :contentArticle="contentArticle"/>
                <div class="noMore" v-if="noMore &&  isLoading" v-loading="isLoading">
                  {{ isLoading ? "..." : "暂时没有更多了..." }}
                </div>
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
import {getContentArticle} from "@/api/blog.js"
import ArticleItem from "@/views/creation/center/manager/content/components/ArticleItem.vue";
import UploadResourceItem from "@/views/creation/center/manager/content/components/UploadResourceItem.vue";
import VideoItem from "@/views/creation/center/manager/content/components/VideoItem.vue";
import DownloadResourceItem from "@/views/creation/center/manager/content/components/DownloadResourceItem.vue";

const infinite = ref(false)
const noMore = ref(true)
const isLoading = ref(true)
const total = ref(0)
const contentArticles = ref([])
const route = useRoute()
const router = useRouter()
const activeTab = ref(route.query.tab || "article")
const activeArticleStatus = ref("total")
const activeUploadStatus = ref("total")
const activeDownloadStatus = ref("total")
const activeResourceTab = ref("upload")
const articleStatusList = ref([
  {id: 1, label: "全部", name: "total"},
  {id: 2, label: "全部可见", name: "public"},
  {id: 3, label: "仅我可见", name: "private"},
  {id: 4, label: "审核", name: "underReview"},
  {id: 5, label: "草稿箱", name: "drafts"},
  {id: 6, label: "回收站", name: "recycleBin"},
])
const resourceStatusList = ref([
  {id: 1, label: "全部", name: "total"},
  {id: 2, label: "待审核", name: "underReview"},
  {id: 3, label: "已通过", name: "pass"},
  {id: 4, label: "未通过", name: "fault"},
  {id: 5, label: "已私密", name: "private"},
])
const videoStatusList = ref([
  {id: 1, label: "全部", name: "total"},
  {id: 2, label: "公开", name: "public"},
  {id: 3, label: "审核", name: "underReview"},
  {id: 4, label: "未通过", name: "fault"},
])
const queryParam = ref({
  status: "total",
  year: null,
  month: null,
  category: null,
  keyword: null,
  pageCount: 5,
  pageNum: 1,
})
const monthOptions = ref([{key: 0, value: 0, label: "不限"}])
const yearOptions = ref([
  {key: 0, value: 0, label: "不限"},
])
const categoryOptions = ref([
  {key: 0, value: 0, label: "不限类型"},
  {key: 1, value: 1, label: "原创"},
])

const load = () => {
  noMore.value = true
  isLoading.value = true
  queryParam.value.pageNum += 1
  getData()
}
const yearOptionChange = () => {
  reset()
  if (!queryParam.value.year) {
    queryParam.value.month = 0
  }
}
const monthOptionChange = () => {
  reset()
}
const monthOptionFocus = () => {
  if (queryParam.value.year) {
    monthOptions.value = [
      {key: 0, value: 0, label: "不限"},
      {key: 1, value: 1, label: "1月"},
      {key: 2, value: 2, label: "2月"},
      {key: 3, value: 3, label: "3月"},
      {key: 4, value: 4, label: "4月"},
      {key: 5, value: 5, label: "5月"},
      {key: 6, value: 6, label: "6月"},
      {key: 7, value: 7, label: "7月"},
      {key: 8, value: 8, label: "8月"},
      {key: 9, value: 9, label: "9月"},
      {key: 10, value: 10, label: "10月"},
      {key: 11, value: 11, label: "11月"},
      {key: 12, value: 12, label: "12月"},
    ]
  } else {
    monthOptions.value = [{key: 0, value: 0, label: "不限"}]
  }
}
const reset = () => {
  queryParam.value.pageNum = 1
  queryParam.value.pageCount = 5
  infinite.value = false
}
const getData = () => {
  getContentArticle(queryParam.value).then(res => {
    contentArticles.value.push(...res.data.map(item => {
      return {
        ...item,
        cover: item.cover ? import.meta.env.VITE_APP_BASE_API + item.cover : null
      }
    }))
    total.value = res.info.total
    // 无更多设置为假
    noMore.value = false
    // 加载中设置为假
    isLoading.value = false
    // 若当前页参数请求下返回无数据
    if (res.data.length === 0) {
      // 则设置无更多为真
      noMore.value = true
      // 设置停止无限加载为真
      infinite.value = true
    }
  })
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
  reset()
  contentArticles.value = []
  queryParam.value.status = activeArticleStatus.value
  isLoading.value = true
  getData()
}
const resourceInnerTabClick = (tab) => {
  router.push({query: {tab: activeTab.value, resource: tab.paneName}})
}
const resourceInnerTabChange = () => {
  reset()
  contentArticles.value = []
  queryParam.value.status = activeArticleStatus.value
  isLoading.value = true
  getData()
}
const search = () => {
  reset()
  contentArticles.value = []
  getData()
}
onMounted(() => {
  // 读取路径参数 更新当前激活的tab标签
  if (route.query.tab)
    activeTab.value = route.query.tab
  if (route.query.resource)
    activeResourceTab.value = route.query.resource

  // 设置初始年份
  // 动态根据当前年份设置年份选项
  let startYear = 2021
  for (let i = startYear; i <= new Date().getFullYear(); i++) {
    yearOptions.value.push({key: i - startYear, value: i, label: i + ""},)
  }

  // 获取数据
  getData()
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
    font-size: 14px;

    color: var(--el-text-color-regular);
  }

  :deep(.el-tabs__item.is-active) {
    font-weight: normal;
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


:deep(.el-select__placeholder.is-transparent) {
  color: var(--el-text-color-regular);
}

:deep(.el-input__inner::placeholder) {
  color: var(--el-text-color-regular);
}

.empty-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .el-link {
    margin: 50px 0 20px 0;

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

.resource-tab {
  :deep(.el-tabs__nav-scroll) {
    margin-bottom: 0;
  }

  :deep(.el-tabs__content) {
    padding: 0;
  }

  .resource-queryForm {
    margin-top: 10px;
    padding: 5px 10px;

    .el-form-item {
      margin-bottom: 0;
    }
  }

  .innerTab {
    :deep(.el-tabs__content) {
      padding: 10px;
    }
  }
}

.top-operation-box {
  position: absolute;
  right: 0;
  top: 3px;
}

.noMore {
  text-align: center;
  margin: 15px 0;
  font-size: 14px;
  color: var(--el-text-color-placeholder);
}

</style>