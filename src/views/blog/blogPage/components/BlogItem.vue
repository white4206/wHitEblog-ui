<template>
  <div class="blog-item">
    <div class="left">
      <img v-if="blogItem.cover" :src="blogItem.cover" :alt="blogItem.title" class="left-img">
    </div>
    <div class="content">
      <div class="title">
        <p class="text">{{ blogItem.title }}</p>
      </div>
      <div class="description">
        <p class="text">{{ blogItem.abstractText }}</p>
      </div>
      <div class="operation">
        <div class="isLike">
          <div class="like" @click.stop="ElMessage.info('点赞功能暂未支持')">
            <el-icon :size="16">
              <svg-icon icon-name="like"/>
            </el-icon>
            <span class="number">{{ blogItem.likeNum }} 赞</span>
          </div>
          <div class="unlike" @click.stop="ElMessage.info('点踩功能暂未支持')">
            <el-icon :size="16">
              <svg-icon icon-name="unlike"/>
            </el-icon>
            <span class="number">{{ blogItem.dislikeNum }} 踩</span>
          </div>
        </div>
        <div class="author" @click.stop="router.push({path:'/personal',query:{author:blogItem.authorId}})">
          作者: {{ blogItem.author }}
        </div>
        <div class="release-time">
          发布时间: {{ new Date(blogItem.createTime).toLocaleDateString("sv-SE") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const router = useRouter()
const props = defineProps({
  blogItem: {
    type: Object
  }
})
</script>

<style lang="scss" scoped>
.blog-item {
  display: flex;
  box-sizing: border-box;
  height: 145px;
  padding: 20px 10px;
  transition: .2s;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.blog-item:hover {
  background-color: var(--el-bg-color-page);
  transition: .2s;
  cursor: pointer;
}

.left-img {
  width: 175px;
  height: 100px;
  margin-right: 20px;
}

.content {
  .title {
    color: var(--el-text-color-primary);
    font-weight: 500;

    .text {
      font-size: 18px;
      margin-bottom: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
  }

  .title:hover {
    text-decoration: underline;
  }

  .description {

    .text {
      color: var(--el-text-color-regular);
      font-size: 14px;
      line-height: 1.5;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }

  .operation {
    color: var(--el-text-color-regular);
    font-size: 14px;
    margin-top: 10px;
    display: flex;

    .isLike {
      display: flex;
      margin-right: 20px;
    }

    .like,
    .unlike {
      display: flex;
      align-items: center;
      margin-right: 10px;

      .el-icon {
        margin-right: 5px;
      }
    }

    .like:hover,
    .unlike:hover {
      color: var(--el-text-color-placeholder);
    }

    .author {
      margin-right: 20px;
    }

    .author:hover {
      color: var(--el-text-color-placeholder);
    }
  }

}
</style>