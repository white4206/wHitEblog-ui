<template>
  <div style="background-color: var(--el-bg-color);min-width: 1500px">
    <el-main>
      <el-row justify="center">
        <el-col :span="20" :xs="17" :sm="18" :md="19" :lg="20" :xl="21">
          <!-- 标签条 -->
          <TagBar v-model:tagId="queryParam.tagId" v-model:childTagId="queryParam.childTagId" @getData="getData"
                  @reset="reset"/>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="20" :xs="17" :sm="18" :md="19" :lg="20" :xl="21">
          <el-row :gutter="75">
            <el-col :span="16" justify="center">
              <!-- 博客内容 -->
              <div class="blog-box" v-infinite-scroll="load" :infinite-scroll-disabled="infinite"
                   :infinite-scroll-immediate="false" :infinite-scroll-delay="1000">
                <BlogItem v-for="item in blogItems" :key="item.id" :blogItem="item"
                          @click="toDetails(item.id)">
                </BlogItem>
                <el-empty v-if="noMore && !blogItems.length" :description="noData?'到底了(⊙_⊙;)...':'暂无数据'"
                          v-loading="isLoading"/>
                <div class="noMore" v-if="noMore && blogItems.length" v-loading="isLoading">
                  {{ isLoading ? "..." : "到底了(⊙_⊙;)..." }}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <!-- 右侧卡片 -->
              <RightCard/>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </div>
  <el-backtop :right="50" :bottom="120"/>
</template>

<script setup>
import BlogItem from '@/views/blog/blogPage/components/BlogItem.vue'
import {onMounted, ref} from 'vue'
import {getArticle} from "@/api/blog.js";
import TagBar from "@/views/blog/blogPage/components/TagBar.vue";
import RightCard from "@/views/blog/blogPage/components/RightCard.vue";

const queryParam = ref({
  pageNum: 0,
  pageCount: 10,
  tagId: null,
  childTagId: "default",
})
const infinite = ref(false)
const noData = ref(false)
const noMore = ref(true)
const isLoading = ref(true)
const blogItems = ref([])

// 获取数据
const getData = () => {
  noData.value = false
  isLoading.value = true
  noMore.value = true
  getArticle(queryParam.value).then(res => {
    // 若查询到数据则无数据设置为假
    if (res.data.length > 0) noData.value = false
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
// 重置参数
const reset = () => {
  queryParam.value.pageNum = 1
  queryParam.value.pageCount = 10
  blogItems.value = []
  infinite.value = false
}
const load = () => {
  queryParam.value.pageNum += 1
  getData()
}
const toDetails = (id) => {
  window.open(location.href.split("#")[0] + `#/blog/details/${id}`)
}
onMounted(() => {
  load()
})
</script>

<style lang="scss" scoped>
.el-main {
  overflow: visible;
}

.noMore {
  text-align: center;
  margin: 15px 0;
  font-size: 14px;
  color: var(--el-text-color-placeholder);
}

.blog-box {
  .el-button {
    background-color: transparent;
  }

  .el-button:hover {
    color: var(--el-text-color-secondary);
  }
}
</style>