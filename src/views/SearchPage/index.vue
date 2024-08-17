<template>
  <Affix :offset="0" :z-index="isScroll?1000:998">
    <!-- <el-affix :offset="0" position="top" z-index="1000">-->
    <div class="search-header">
      <div style="margin: 0 auto;max-width: 1500px;box-sizing: border-box;padding:10px 20px;">
        <el-row justify="center">
          <el-col :span="22" :xs="19" :sm="20" :md="21" :lg="22" :xl="23">
            <el-row :gutter="10">
              <el-col :span="18" justify="center">
                <div class="search-box">
                  <el-input v-model="queryParam.keyword" placeholder="请输入文章关键词 <(＿　＿)>"
                            @keyup.enter="search"
                            class="search-input" clearable>
                    <template #prefix>
                      <el-icon :size="25">
                        <SvgIcon icon-name="searchLogo"/>
                      </el-icon>
                    </template>
                  </el-input>
                  <el-button size="large" type="primary" :icon="Search" class="search-button" @click="search">
                    搜索
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- </el-affix>-->
  </Affix>
  <el-main>
    <el-row justify="center">
      <el-col :span="22" :xs="19" :sm="20" :md="21" :lg="22" :xl="23">
        <el-row :gutter="10">
          <el-col :span="18" justify="center">
            <el-card shadow="never" class="search-content-card">
              <el-tabs v-model="activeTab" @tab-click="tabClick">
                <el-collapse-transition>
                  <el-form v-show="isExpand" class="queryForm" :model="queryParam" ref="queryParamRef"
                           :rules="queryParamRules">
                    <el-form-item label="时间">
                      <el-radio-group v-model="queryParam.timeArea">
                        <el-radio-button v-for="item in timeAreaItems" :label="item.label" :value="item.value"/>
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                </el-collapse-transition>
                <div class="sub-option">
                  <div class="querySelectForm">
                    <el-radio-group v-model="queryParam.querySelect" size="small" @change="querySelectChange">
                      <el-radio-button label="综合" value="default"/>
                      <el-radio-button label="最新" value="latest"/>
                      <el-radio-button label="热门" value="hot"/>
                    </el-radio-group>
                  </div>
                  <div class="result-num">
                    <span>相关结果约{{ total }}个</span>
                  </div>
                </div>
                <el-tab-pane label="全站" name="default" v-infinite-scroll="load" :infinite-scroll-disabled="infinite"
                             :infinite-scroll-immediate="false" :infinite-scroll-delay="1000">
                  <template v-for="blogItem in blogItems">
                    <SearchItem :blogItem="blogItem"/>
                  </template>
                  <template v-if="route.query.author">
                    <el-empty v-if="noMore && noData" description="抱歉，在用户主页内未找到搜索结果，是否在全站搜索？"
                              v-loading="isLoading">
                      <el-button type="info" plain @click="searchAllArticle">
                        全站搜索
                      </el-button>
                    </el-empty>
                  </template>
                  <template v-else>
                    <el-empty v-if="noMore && !blogItems.length"
                              :description="noData?'抱歉，未找到搜索结果':'暂无数据'"
                              v-loading="isLoading"/>
                  </template>
                  <div class="noMore" v-if="noMore && blogItems.length" v-loading="isLoading">
                    {{ isLoading ? "..." : "暂时没有更多了..." }}
                  </div>
                </el-tab-pane>
                <el-tab-pane label="博客" name="article">
                  <template v-for="blogItem in blogItems">
                    <ArticleItem :blogItem="blogItem"/>
                  </template>
                  <template v-if="route.query.author">
                    <el-empty v-if="noMore && noData" description="抱歉，在用户主页内未找到搜索结果，是否在全站搜索？"
                              v-loading="isLoading">
                      <el-button type="info" plain @click="searchAllArticle">
                        全站搜索
                      </el-button>
                    </el-empty>
                  </template>
                  <template v-else>
                    <el-empty v-if="noMore && !blogItems.length"
                              :description="noData?'抱歉，未找到搜索结果':'暂无数据'"
                              v-loading="isLoading"/>
                  </template>
                  <div class="noMore" v-if="noMore && blogItems.length" v-loading="isLoading">
                    {{ isLoading ? "..." : "暂时没有更多了..." }}
                  </div>
                </el-tab-pane>
                <el-tab-pane label="资源" name="resource">
                  <template v-for="blogItem in blogItems">
                    <ResourceItem :resourceItem="blogItem"/>
                  </template>
                  <template>
                    <el-empty v-if="noMore && !blogItems.length"
                              :description="noData?'抱歉，未找到搜索结果':'暂无数据'"
                              v-loading="isLoading"/>
                  </template>
                  <div class="noMore" v-if="noMore && blogItems.length" v-loading="isLoading">
                    {{ isLoading ? "..." : "暂时没有更多了..." }}
                  </div>
                </el-tab-pane>
                <el-tab-pane label="用户" name="user">
                  <template v-for="blogItem in blogItems">
                    <UserItem/>
                  </template>
                  <template>
                    <el-empty v-if="noMore && !blogItems.length"
                              :description="noData?'抱歉，未找到搜索结果':'暂无数据'"
                              v-loading="isLoading"/>
                  </template>
                  <div class="noMore" v-if="noMore && blogItems.length" v-loading="isLoading">
                    {{ isLoading ? "..." : "暂时没有更多了..." }}
                  </div>
                </el-tab-pane>
                <el-tab-pane label="视频" name="video">
                  <template v-for="blogItem in blogItems">
                    <VideoItem/>
                  </template>
                  <template>
                    <el-empty v-if="noMore && !blogItems.length"
                              :description="noData?'抱歉，未找到搜索结果':'暂无数据'"
                              v-loading="isLoading"/>
                  </template>
                  <div class="noMore" v-if="noMore && blogItems.length" v-loading="isLoading">
                    {{ isLoading ? "..." : "暂时没有更多了..." }}
                  </div>
                </el-tab-pane>
              </el-tabs>
              <el-button class="fold-btn" type="info" link @click="isExpand=!isExpand">
                <span>筛选</span>
                <el-icon v-if="!isExpand">
                  <ArrowUpBold/>
                </el-icon>
                <el-icon v-else>
                  <ArrowDownBold/>
                </el-icon>
              </el-button>
            </el-card>
          </el-col>
          <el-col :span="6">
            <Affix :offset="fixHeight" :z-index="99">
              <!-- <el-affix :offset="fixHeight" :z-index="99">-->
              <div class="right-card-box" ref="rightCardRef">
                <WebsiteInfoCard/>
              </div>
              <!-- </el-affix>-->
            </Affix>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-main>
  <el-backtop :right="50" :bottom="120"/>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {Search} from "@element-plus/icons-vue";
import ArticleItem from "@/views/SearchPage/components/ArticleItem.vue";
import {useRoute, useRouter} from "vue-router";
import {searchArticle} from "@/api/blog.js";
import WebsiteInfoCard from "@/components/WebsiteInfoCard/index.vue";
import Affix from "@/components/Affix/index.vue";
import ResourceItem from "@/views/SearchPage/components/ResourceItem.vue";
import UserItem from "@/views/SearchPage/components/UserItem.vue";
import VideoItem from "@/views/SearchPage/components/VideoItem.vue";
import SearchItem from "@/views/SearchPage/components/SearchItem.vue";

const isScroll = ref(false)
const total = ref(0)
const blogItems = ref([])
const infinite = ref(false)
const noData = ref(false)
const noMore = ref(true)
const isLoading = ref(true)
const route = useRoute();
const router = useRouter()
const isExpand = ref(false)
const activeTab = ref("default")
const rightCardRef = ref()
const fixHeight = ref()
const queryParam = ref({
  pageNum: 0,
  pageCount: 10,
  authorId: null,
  keyword: null,
  timeArea: "default",
  querySelect: "default"
})
const queryParamRef = ref()
const queryParamRules = ref({})
const timeAreaItems = ref([
  {id: 1, label: "不限", value: "default"},
  {id: 2, label: "一周内", value: "week"},
  {id: 3, label: "一月内", value: "month"},
  {id: 4, label: "三月内", value: "month_3"},
  {id: 5, label: "一年内", value: "year"}
])

// 获取数据
const getData = () => {
  noData.value = false
  isLoading.value = true
  noMore.value = true
  searchArticle(queryParam.value).then(res => {
    total.value = res.info.total
    // 映射拿回的数据并将其返回的数据解构推入存储
    blogItems.value.push(...(res.data.map(item => {
      return {
        ...item,
        cover: item.cover ? import.meta.env.VITE_APP_BASE_API + item.cover : null
      }
    })))
    if (!blogItems.value.length)
      noData.value = true
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
const load = () => {
  queryParam.value.pageNum += 1
  getData()
}
// 重置参数
const reset = () => {
  queryParam.value.pageNum = 1
  queryParam.value.pageCount = 10
  blogItems.value = []
  infinite.value = false
}
const search = () => {
  router.push({
    query: {
      author: queryParam.value.authorId || undefined,
      q: queryParam.value.keyword || undefined,
      tab: activeTab.value,
      query: queryParam.value.querySelect
    }
  })
  if (route.query.author) {
    queryParam.value.authorId = route.query.author
    activeTab.value = "article"
  } else
    queryParam.value.authorId = null
  reset()
  getData()
}
const searchAllArticle = () => {
  router.push({
    query: {q: queryParam.value.keyword, tab: activeTab.value, query: queryParam.value.querySelect}
  })
  queryParam.value.authorId = null
  reset()
  getData()
}
const querySelectChange = () => {
  router.push({
    query: {
      author: queryParam.value.authorId || undefined,
      q: queryParam.value.keyword,
      tab: activeTab.value,
      query: queryParam.value.querySelect
    }
  })
  reset()
  getData()
}
const tabClick = (tab) => {
  router.push({
    query: {
      author: queryParam.value.authorId || undefined,
      q: queryParam.value.keyword,
      tab: tab.paneName,
      query: queryParam.value.querySelect
    }
  })
}
onMounted(() => {
  if (route.query.tab)
    activeTab.value = route.query.tab
  if (route.query.query)
    queryParam.value.querySelect = route.query.query
  if (route.query.author) {
    queryParam.value.authorId = route.query.author
    activeTab.value = "article"
  } else
    queryParam.value.authorId = null

  queryParam.value.keyword = route.query.q || null
  load()
  // 监听滚动改变右边栏的固定位置
  window.addEventListener("scroll", () => {
    let rightCardHeight
    if (rightCardRef.value)
      rightCardHeight = rightCardRef.value.offsetHeight + 20
    let windowHeight = window.innerHeight
    if (rightCardHeight >= windowHeight - 80)
      fixHeight.value = -(rightCardHeight - windowHeight)
    else
      fixHeight.value = 80
    isScroll.value = !!document.documentElement.scrollTop;
  })
})
</script>

<style lang="scss" scoped>
.el-main {
  overflow: visible;
}

.search-header {
  min-width: 1500px;
  background-color: var(--el-bg-color);
  box-shadow: var(--el-border-color-lighter);

  .search-box {
    display: flex;

    :deep(.el-input__wrapper) {
      border-radius: 4px 0 0 4px;
      background-color: var(--el-fill-color-lighter);
    }

    .search-button {
      border-radius: 0 4px 4px 0;
    }
  }
}

.search-content-card {
  position: relative;
  border: none;

  :deep(.el-card__body) {
    padding: 0;
  }

  :deep(.el-tab-pane) {
    padding: 0;
  }

  :deep(.el-tabs__header) {
    padding: 10px 20px 0 20px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .05);
    margin-bottom: 0;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }


  :deep(.el-tabs__nav-wrap::after) {
    content: none;
  }

  :deep(.el-tabs__item) {
    color: var(--el-text-color-regular);
    font-size: 16px;
  }

  :deep(.el-tabs__item.is-active) {
    color: var(--el-color-primary);
    font-weight: bold;
  }

  .sub-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background: var(--el-fill-color-extra-light);

    .querySelectForm {

      :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
        border-radius: 4px;
        color: var(--el-text-color-primary);
        background-color: var(--el-fill-color);
        border: none;
        box-shadow: none;
      }

      :deep(.el-radio-button__inner) {
        border: none;
        background: transparent;
      }

      :deep(.el-radio-button__inner:hover) {
        color: var(--el-text-color-primary);
      }
    }

    .result-num {
      font-size: 12px;
      color: var(--el-text-color-secondary);
    }
  }

  .queryForm {
    padding: 0 20px;

    :deep(.el-form-item__label) {
      color: var(--el-text-color-secondary);
    }

    .el-form-item {
      margin: 0;
      padding: 10px 0;
      border-bottom: 1px dashed var(--el-border-color-lighter);
    }
  }

  :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
    color: var(--el-color-primary);
    font-weight: 500;
    border: none;
    background: transparent;
    box-shadow: none;
  }

  :deep(.el-radio-button__inner) {
    border: none;
    font-weight: normal;
  }

  :deep(.el-radio-button__inner:hover) {
    color: var(--el-text-color-primary);
  }

  .fold-btn {
    position: absolute;
    top: 20px;
    right: 20px;

    span {
      color: var(--el-text-color-primary)
    }

    span:hover {
      color: var(--el-text-color-secondary)
    }
  }

}

.noMore {
  text-align: center;
  margin: 15px 0;
  font-size: 14px;
  color: var(--el-text-color-placeholder);
}

</style>