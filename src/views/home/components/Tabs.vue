<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="推荐" name="recommended" v-infinite-scroll="load" :infinite-scroll-disabled="infinite"
                 :infinite-scroll-immediate="false" :infinite-scroll-delay="1000">
      <BlogItem v-for="item in blogItems" :key="item.id" :blogItem="item"
                @click="toDetails(`/blog/details/${item.id}`)">
      </BlogItem>
      <el-empty v-if="noMore && !blogItems.length" description="暂无数据"
                v-loading="isLoading"/>
      <div class="noMore" v-if="noMore && blogItems.length" v-loading="isLoading">
        {{ isLoading ? "..." : "到底了(⊙_⊙;)..." }}
      </div>
    </el-tab-pane>
    <el-tab-pane label="热门" name="hot" v-infinite-scroll="loadHot" :infinite-scroll-disabled="hotInfinite"
                 :infinite-scroll-immediate="false" :infinite-scroll-delay="1000">
      <BlogItem v-for="item in hotBlogItems" :key="item.id" :blogItem="item"
                @click="toDetails(`/blog/details/${item.id}`)">
      </BlogItem>
      <el-empty v-if="noMore && !blogItems.length" description="暂无数据"
                v-loading="isLoading"/>
      <div class="noMore" v-if="noMore && blogItems.length" v-loading="isLoading">
        {{ isLoading ? "..." : "到底了(⊙_⊙;)..." }}
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import BlogItem from '@/views/home/components/BlogItem.vue';
import {onMounted, ref} from 'vue'
import {getArticle} from '@/api/blog.js'
import toDetails from "@/utils/toDetails.js";

// 推荐文章请求参数
const queryParam = ref({
  pageNum: 0,
  pageCount: 10,
})
// 热门文章请求参数
const hotQueryParam = ref({
  pageNum: 0,
  pageCount: 10,
})
// 关注文章请求参数
const attentionQueryParam = ref({
  pageNum: 0,
  pageCount: 10,
})
const noMore = ref(true)
const noMoreHot = ref(true)
const infinite = ref(false)
const hotInfinite = ref(true)
const isLoading = ref(true)
const isHotLoading = ref(true)
const blogItems = ref([])
const hotBlogItems = ref([])
const attentionBlogItems = ref([])
const activeName = ref('recommended')

// 获取推荐数据
const getData = () => {
  noMore.value = true
  isLoading.value = true
  getArticle(queryParam.value).then(res => {
    blogItems.value.push(...(res.data.map(item => {
      return {
        ...item,
        cover: item.cover ? import.meta.env.VITE_APP_BASE_API + item.cover : null
      }
    })))
    noMore.value = false
    isLoading.value = false
    if (res.data.length === 0) {
      noMore.value = true
      infinite.value = true
    }
  })
}
// 获取热门数据
const getHotData = () => {
  getArticle(hotQueryParam.value).then(res => {

    hotBlogItems.value.push(...(res.data.map(item => {
      return {
        ...item,
        cover: item.cover ? import.meta.env.VITE_APP_BASE_API + item.cover : null
      }
    })))
    noMore.value = false
    isHotLoading.value = false
    if (res.data.length === 0) {
      noMoreHot.value = true
      hotInfinite.value = true
    }
  })
}
const reset = () => {
  queryParam.value = hotQueryParam.value = attentionQueryParam.value = {
    pageNum: 1,
    pageCount: 10,
  }
  blogItems.value = hotBlogItems.value = attentionBlogItems.value = []
}
const handleClick = (tab, event) => {
  if (tab.props.name === "recommended") {
    infinite.value = false
    hotInfinite.value = true
    reset()
    getData()
  } else if (tab.props.name === "hot") {
    infinite.value = true
    hotInfinite.value = false
    reset()
    getHotData()
  }
}
const load = () => {
  queryParam.value.pageNum += 1
  getData()
}
const loadHot = () => {
  hotQueryParam.value.pageNum += 1
  getHotData()
}
onMounted(() => {
  load()
})
</script>

<style lang="scss" scoped>
.noMore {
  text-align: center;
  margin: 15px 0;
  font-size: 14px;
  color: var(--el-text-color-placeholder);
}

:deep(.el-tabs__header) {
  padding: 10px 0 0 0;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

:deep(.el-tabs__nav-wrap::after) {
  content: none;
}

:deep(.el-tabs__item) {
  color: var(--el-text-color-secondary);
  font-size: 16px;
}

:deep(.el-tabs__item.is-active) {
  color: var(--el-color-primary);
}

</style>
  