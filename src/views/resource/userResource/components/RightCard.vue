<template>
  <Affix :offset="fixHeight" :z-index="99">
    <!-- <el-affix :offset="fixHeight" :z-index="99">-->
    <div class="right-card-box" ref="rightCardRef">
      <el-card class="author-card side-card">
        <div class="author-info">
          <el-avatar class="avatar"/>
          <div class="info">
            <div class="nickname">昵称</div>
          </div>
        </div>
        <div class="data">
          <div class="item">
            <span>1</span>
            <span>资源</span>
          </div>
          <div class="item">
            <span>14</span>
            <span>粉丝</span>
          </div>
        </div>
        <div class="attention-btn">
          <el-button style="width: 45%;height: 28px" round>关注</el-button>
          <el-button style="width: 45%;height: 28px" round>私信</el-button>
        </div>
      </el-card>
      <el-card class="side-card">
        <el-button type="primary" round style="width: 100%" size="large">上传资源</el-button>
      </el-card>
      <WebsiteInfoCard/>
    </div>
    <!-- </el-affix>-->
  </Affix>
</template>

<script setup>
import Affix from "@/components/Affix/index.vue";
import WebsiteInfoCard from "@/components/WebsiteInfoCard/index.vue";
import {onMounted, ref} from "vue";

const rightCardRef = ref()
const fixHeight = ref()

onMounted(() => {
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
  })
})
</script>

<style scoped lang="scss">
.el-card {
  border: none;
  box-shadow: none;
}

.side-card {
  margin-bottom: 10px;
}

.author-card {
  .author-info {
    display: flex;
    margin-bottom: 20px;

    .avatar {
      cursor: pointer;
      margin-right: 10px;
    }

    .info {
      .nickname {
        cursor: pointer;
        font-weight: bold;
        margin-bottom: 5px;
      }
    }
  }

  .data {
    display: flex;
    margin-bottom: 20px;

    .item {
      cursor: pointer;
      font-size: 14px;
      text-align: center;
      display: flex;
      flex-direction: column;
      margin: 0 10px;

      span {
        margin-bottom: 5px;
      }
    }
  }

  .attention-btn {
    text-align: center;
  }
}
</style>