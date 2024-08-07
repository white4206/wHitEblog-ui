<template>
  <div class="video-box">
    <div class="video-item">
      <div v-if="contentArticle.cover" class="cover">
        <img :src="contentArticle.cover" :alt="contentArticle.title">
        <el-icon :size="32" style="position: absolute;left: 50%;top:50%;transform: translate(-50%,-50%)"
                 color="var(--el-bg-color)">
          <CaretRight/>
        </el-icon>
        <span
            style="padding: 0 5px;position: absolute;bottom: 5px;right:10px;font-size:12px;
                          background:rgba(0,0,0,.3);color:var(--el-color-white);border-radius: 5px">00:00:00</span>
      </div>
      <div style="display: flex;flex-direction: column;flex:1">
        <el-row class="video-box-row">
          <el-col :span="20">
                          <span class="title"
                                @click="router.push({path:'/creation/editor',query:{videoId:contentArticle.id}})">
                            {{ contentArticle.title }}
                          </span>
          </el-col>
          <el-col :span="4" style="display:flex;align-items: center;justify-content: right;">
            <el-button link type="primary">
              <span style="font-weight: normal">复制链接</span>
            </el-button>
            <el-icon :size="14" color="var(--el-text-color-placeholder)">
              <QuestionFilled/>
            </el-icon>
          </el-col>
        </el-row>
        <el-row class="video-box-row">
          <el-col :span="24">
            <span class="desc-info">观看 {{ 0 }}</span>
            <el-divider direction="vertical"/>
            <span class="desc-info">评论 {{ 0 }}</span>
            <el-divider direction="vertical"/>
            <span class="desc-info">点赞 {{ 0 }}</span>
            <el-divider direction="vertical"/>
            <span class="desc-info">收藏 {{ 0 }}</span>
          </el-col>
        </el-row>
        <el-row class="video-box-row">
          <el-col>
            <el-tag type="info" style="border: none;font-size: 14px;padding: 0 10px" size="small">正常
            </el-tag>
          </el-col>
        </el-row>
        <el-row class="video-box-row">
          <el-col :span="20">
            <span style="color: var(--el-text-color-regular);font-size: 14px">2024-07-04 21:53:28</span>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <el-button link type="primary">
              <el-icon>
                <EditPen/>
              </el-icon>
              <span>修改</span>
            </el-button>
            <el-button link type="danger">删除</el-button>
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

</script>

<style scoped lang="scss">
.video-box {
  margin-top: 10px;

  .video-item {
    display: flex;

    .cover {
      position: relative;
      width: 225px;
      height: 125px;
      margin-right: 20px;

      img {
        width: 225px;
        height: 125px;
      }
    }

    .title {
      cursor: text;
      font-weight: bold;
    }

    .title:hover {
      color: var(--el-text-color-primary);
    }

    .video-box-row {
      margin-bottom: 10px;
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