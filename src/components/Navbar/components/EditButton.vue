<template>
  <div class="edit-button">
    <el-popover :show-arrow="false" placement="top-start" width="410px" trigger="hover">
      <template #reference>
        <el-button type="primary" round icon="CirclePlus" size="default" @click="router.push('/creation/editor')">
          发布
        </el-button>
      </template>
      <div class="post-item">
        <div class="item" @click="router.push('/creation/editor')">
          <el-icon :size="18">
            <SvgIcon icon-name="articleA"/>
          </el-icon>
          <div style="margin-top: 10px">写文章</div>
        </div>
        <div class="item" @click="router.push('/creation/upload')">
          <el-icon :size="18">
            <SvgIcon icon-name="resource"/>
          </el-icon>
          <div style="margin-top: 10px">传资源</div>
        </div>
        <div class="item" @click="router.push('/creation/post')">
          <el-icon :size="18">
            <SvgIcon icon-name="videoC"/>
          </el-icon>
          <div style="margin-top: 10px">发视频</div>
        </div>
      </div>
      <el-divider style="margin: 15px 0 10px 0"/>
      <div class="new-comment-box">
        <div class="header">
          <span style="font-weight: 600;">新评论</span>
          <el-button type="info" link @click="toDetails('/creation/manager/comment')">
            查看全部
            <el-icon>
              <ArrowRight/>
            </el-icon>
          </el-button>
        </div>
        <div class="content">
          <div class="item" v-for="item in 2">
            <el-link type="default" :underline="false">我是{{ item }}条评论</el-link>
          </div>
        </div>
      </div>
      <el-divider style="margin: 15px 0"/>
      <img src="" alt="">
    </el-popover>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import toDetails from "@/utils/toDetails.js";

const router = useRouter()
</script>

<style scoped lang="scss">
.post-item {
  display: flex;

  .item {
    margin: 0 10px;

    .el-icon {
      cursor: pointer;
      border-radius: 50%;
      padding: 10px;
      background-color: var(--el-fill-color);
      color: var(--el-text-color-regular);
    }

    .el-icon:hover {
      background-color: var(--el-fill-color-dark);
      color: var(--el-text-color-primary);
    }
  }
}

.new-comment-box {
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .content {
    .item {
      line-height: 1.5;
    }
  }
}
</style>