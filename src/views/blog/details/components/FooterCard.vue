<template>
  <Affix position="bottom" :offset="0" :z-index="99">
    <!-- <el-affix :offset="0" position="bottom" :index="99">-->
    <el-card class="footer-card" shadow="never">
      <div class="footer">
        <div class="footer-author">
          <el-image @click="router.push({path:'/personal',query:{author:authorInfo.authorId}})"
               :src="authorInfo.avatar" :alt="authorInfo.nickname" class="footer-author-avatar"/>
          <div @click="router.push({path:'/personal',query:{author:authorInfo.authorId}})"
               class="footer-author-name">
            <h4>{{ authorInfo.nickname }}</h4>
          </div>
          <el-button round @click="ElMessage.info('关注功能暂未支持')">关注</el-button>
        </div>
        <div class="footer-operation">
          <div class="footer-operation-item" @click="ElMessage.info('点赞功能暂未支持')">
            <el-icon :size="16">
              <Like/>
            </el-icon>
            <span>{{ articleDetail.likeNum }}</span>
          </div>
          <div class="footer-operation-item" @click="ElMessage.info('点踩功能暂未支持')">
            <el-icon :size="16">
              <Unlike/>
            </el-icon>
            <span>{{ articleDetail.dislikeNum }}</span>
          </div>
          <div class="footer-operation-item" @click="ElMessage.info('收藏功能暂未支持')">
            <el-icon>
              <Star/>
            </el-icon>
            <span>{{ articleDetail.favNum }}</span>
          </div>
          <div class="footer-operation-item" @click="ElMessage.info('评论功能暂未支持')">
            <el-icon>
              <ChatLineSquare/>
            </el-icon>
            <span>{{ articleDetail.commentNum }}</span>
          </div>
          <el-divider direction="vertical"/>
          <div class="footer-operation-item" @click="ElMessage.info('分享功能暂未支持')">
            <el-icon>
              <Share/>
            </el-icon>
            <span>{{ articleDetail.shareNum }}</span>
          </div>
        </div>
      </div>
    </el-card>
    <!-- </el-affix>-->
  </Affix>
</template>

<script setup>
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import Affix from "@/components/Affix/index.vue";

const router = useRouter()
const props = defineProps({
  articleDetail: {
    type: Object
  },
  authorInfo: {
    type: Object
  },
})
</script>

<style scoped lang="scss">
.footer-card {
  border-radius: 0 0 4px 4px;
  border: none;
  box-shadow: var(--el-box-shadow-lighter);

  .footer {
    display: flex;
    justify-content: space-between;

    .footer-author {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    .footer-author-avatar {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      border-radius: 50%;
    }

    .footer-author-name {
      margin-right: 10px;
    }

    .footer-operation {
      display: flex;
      align-items: center;
      cursor: pointer;

      .footer-operation-item {
        display: flex;
        align-items: center;

        .el-icon {
          margin-right: 5px;
        }

        margin-right: 20px;
      }
    }

  }
}
</style>