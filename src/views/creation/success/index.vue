<template>
  <el-main>
    <el-card class="success-dialog" shadow="always">
      <template #header>
        <div class="title" @click="router.push('/creation/content')">
          <el-icon>
            <el-icon>
              <ArrowLeft/>
            </el-icon>
          </el-icon>
          <span>管理博文</span>
        </div>
      </template>
      <div class="content">
        <div>
          <div class="underReview">
            <el-icon :size="128">
              <SvgIcon icon-name="underReview"/>
            </el-icon>
            <div class="underReview-text">发布成功! 正在审核中</div>
          </div>
          <div class="operation">
            <el-button round @click="toDetails(`/blog/details/${route.params.Sid}`)">查看文章</el-button>
            <el-button round @click="router.push({path:'/creation/editor',query:{articleId:route.params.Sid}})">
              重新编辑
            </el-button>
            <el-button type="primary" plain round @click="router.push('/creation/editor')">再写一篇</el-button>
          </div>
          <el-divider border-style="dashed">分享至</el-divider>
          <Share/>
        </div>
      </div>
    </el-card>
  </el-main>
</template>
<script setup>
import {useRoute, useRouter} from 'vue-router'
import Share from "@/views/creation/success/components/Share.vue";
import {onMounted} from "vue";
import toDetails from "@/utils/toDetails.js";

const route = useRoute()
const router = useRouter()

onMounted(() => {
})
</script>

<style scoped lang="scss">
.title {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.success-dialog {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  min-height: 500px;
  background-image: url("@/assets/images/svg/wave.svg");
  background-position: bottom;
  background-size: contain;
  background-repeat: no-repeat;
}

.content {
  display: flex;
  justify-content: center;
}

.underReview {
  text-align: center;
}

.underReview-text {
  position: relative;
  top: -20px;
}

.operation {
  text-align: center;
}

:deep(.el-divider__text.is-center) {
  color: var(--el-text-color-secondary);
}
</style>