<template>
  <div class="article-box">
    <div class="article-item">
      <div v-if="contentArticle.cover" class="cover"><img :src="contentArticle.cover"
                                                          :alt="contentArticle.title"></div>
      <div style="display: flex;flex-direction: column;flex:1">
        <el-row class="article-box-row">
          <el-col :span="20">
            <el-tooltip content="编辑" effect="light"
                        placement="top-start" :show-after="500"><span
                class="title"
                @click="router.push({path:'/creation/editor',query:{articleId:contentArticle.id}})">{{
                contentArticle.title
              }}</span></el-tooltip>
          </el-col>
          <el-col :span="4" style="text-align: right"><span
              class="datetime">{{ contentArticle.createTime }}</span>
          </el-col>
        </el-row>
        <el-row class="article-box-row">
          <el-col>
            <el-tag size="small">原创</el-tag>
          </el-col>
        </el-row>
        <el-row class="article-box-row">
          <el-col :span="20">
            <span class="desc-info">阅读 {{ 0 }}</span>
            <span class="divider-pointer">·</span>
            <span class="desc-info">评论 {{ 0 }}</span>
            <span class="divider-pointer">·</span>
            <span class="desc-info">收藏 {{ 0 }}</span>
          </el-col>
          <el-col class="operation-box" :span="4">
            <el-button link>查看数据</el-button>
            <el-button link
                       @click="router.push({path:'/creation/editor',query:{articleId:contentArticle.id}})">
              编辑
            </el-button>
            <el-button link @click="toDetails(contentArticle.id)">浏览</el-button>
            <div class="operation-more">
              <el-popover :hide-after="0" popper-style="padding: 10px 0 10px 0;min-width: auto;"
                          placement="bottom-start"
                          :width="150" trigger="hover">
                <template #reference>
                  <el-icon>
                    <MoreFilled/>
                  </el-icon>
                </template>
                <div class="more-option-box">
                  <span class="more-option">粉丝可读</span>
                  <span class="more-option">评论审核后公开</span>
                  <span class="more-option">置顶</span>
                  <span class="more-option">删除</span>
                </div>
              </el-popover>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-divider/>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
const props = defineProps({
  contentArticle: {
    type:Object
  }
})

const toDetails = (id) => {
  window.open(location.href.split("#")[0] + `#/blog/details/${id}`)
}
</script>

<style scoped lang="scss">
.article-box {
  margin-top: 10px;

  .article-item {
    display: flex;

    .cover {
      width: 175px;
      height: 100px;
      margin-right: 20px;

      img {
        width: 175px;
        height: 100px;
      }
    }

    .article-box-row {
      margin-bottom: 15px;
    }
  }
}

.title {
  cursor: pointer;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.title:hover {
  color: var(--el-color-primary);
}

.datetime, .desc-info {
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

.divider-pointer {
  color: var(--el-text-color-primary);
}

.operation-box {
  display: flex;
  justify-content: end;
  align-items: center;

  :deep(.el-button > span) {
    font-weight: normal;
  }

  .operation-more {
    padding-left: 10px;
    cursor: pointer;
  }

  :deep(.el-button.is-link) {
    color: var(--el-text-color-primary);
  }

  :deep(.el-button.is-link:hover) {
    color: var(--el-button-hover-link-text-color);
  }
}

.more-option-box {
  display: flex;
  flex-direction: column;
  align-items: center;

  .more-option {
    border-radius: 20px;
    padding: 5px 20px;
    cursor: pointer;
  }

  .more-option:hover {
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
  }
}
</style>