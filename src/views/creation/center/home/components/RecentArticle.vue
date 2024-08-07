<template>
  <div class="recent-article">
    <el-row align="middle" justify="space-between">
      <el-col :span="2">
        <div class="article-tag">
          <el-tag effect="plain" size="small">博客</el-tag>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="article-box" @click="router.push('/blog/details/'+ recentArticle.id)">
          <el-tooltip :content="recentArticle.title" effect="light" placement="top-start" :show-after="500">
            <div class="title">{{ recentArticle.title }}</div>
          </el-tooltip>
          <el-tooltip :content="recentArticle.abstractText" effect="light" placement="bottom-start"
                      :show-after="500">
            <div class="abstractText">{{ recentArticle.abstractText }}</div>
          </el-tooltip>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="desc-box">
          <div class="desc-option">
            <span class="count">{{ recentArticle.viewNum }}</span>
            <span class="desc">阅读量</span>
          </div>
          <div class="desc-option">
            <span class="count">{{ recentArticle.commentNum }}</span>
            <span class="desc">评论数</span>
          </div>
          <div class="desc-option">
            <span class="count">{{ recentArticle.likeNum }}</span>
            <span class="desc">点赞数</span>
          </div>
          <div class="desc-option">
            <span class="count">{{ recentArticle.favNum }}</span>
            <span class="desc">收藏数</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const props = defineProps({
  recentArticle: {
    type: Object,
  }
})
const router = useRouter()

</script>

<style scoped lang="scss">

.recent-article {
  .article-tag {
    height: 45px;
    display: flex;
    align-items: start;
    justify-content: center;
  }

  .article-box {
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
</style>