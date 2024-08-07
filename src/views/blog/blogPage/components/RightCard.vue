<template>
  <Affix :offset="fixHeight" :z-index="99">
    <!-- <el-affix :offset="fixHeight" :z-index="99">-->
    <div class="right-card-box" ref="rightCardRef">
      <el-card class="dailyRecommendation-box side-card" body-style="padding:0">
        <div class="dailyRecommendation-img-box">
          <img v-if="dailyRecommendation.cover"
               :src="dailyRecommendation.cover"
               :alt="dailyRecommendation.title" class="dailyRecommendation-img"/>
        </div>
        <div class="dailyRecommendation">
          <h3>{{ dailyRecommendation.dailyTitle || '今日番剧推荐' }}</h3>
          <div class="dailyRecommendation-header">
            <span>{{ dailyRecommendation.title }}</span>
            <el-button size="small" type="primary" class="viewBtn"
                       @click="handleOPEN(dailyRecommendation.url)">{{
                dailyRecommendation.btnText || '去追番休息~'
              }}
            </el-button>
          </div>
          <div class="dailyRecommendation-content">{{ dailyRecommendation.description }}</div>
        </div>
      </el-card>
      <el-card class="recommended-author-box side-card" shadow="never">
        <template #header>
          <div class="card-header">
            作者推荐
          </div>
        </template>
        <div v-for="item in recommendedAuthors" :key="item.id" class="recommended-author">
          <div class="recommended-author-info">
            <div class="recommended-author-img-box"
                 @click="router.push({path:'/personal',query:{author:item.authorId}})">
              <img :src="item.avatar" :alt="item.nickname" class="recommended-author-img">
            </div>
            <div>
              <div class="recommended-author-name"
                   @click="router.push({path:'/personal',query:{author:item.authorId}})">{{
                  item.nickname
                }}
              </div>
              <div class="recommended-author-desc">{{ item.description }}</div>
            </div>
          </div>
          <el-button round size="small">关注</el-button>
        </div>
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
import {getAuthorRecommended, getDailyRecommendation} from "@/api/common.js";
import {useRouter} from "vue-router";

const router = useRouter()
const dailyRecommendation = ref({})
const recommendedAuthors = ref([])
const rightCardRef = ref()
const fixHeight = ref(0)

const handleOPEN = (url) => {
  window.open(url, '_blank');
}
onMounted(() => {
  // 获取今日推荐数据
  getDailyRecommendation().then(res => {
    res.data.cover = res.data.cover ? import.meta.env.VITE_APP_BASE_ADMIN_API + res.data.cover : null
    dailyRecommendation.value = res.data
  })
  // 获取作者推荐
  getAuthorRecommended().then(res => {
    recommendedAuthors.value = res.data.map(item => {
      return {
        ...item,
        avatar: item.avatar ? import.meta.env.VITE_APP_BASE_API + item.avatar : null
      }
    })
  })
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
.side-card {
  margin-bottom: 20px;
}

.dailyRecommendation-img-box {
  width: 100%;

  .dailyRecommendation-img {
    width: 100%;
    display: block;
  }
}

.dailyRecommendation {
  padding: 15px;

  h3 {
    margin-bottom: 20px;
  }
}

.dailyRecommendation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dailyRecommendation-content {
  line-height: 1.5;
  margin-top: 15px;
  font-size: 12px;
  color: var(--el-text-color-regular);

}

.viewBtn {
  height: 100%;
}

.card-header {
  font-size: 18px;
}

.recommended-author {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.recommended-author-info {
  display: flex;
}

.recommended-author:nth-child(1) {
  margin-top: 0;
}

.recommended-author-img-box {
  width: 45px;
  height: 45px;
  margin-right: 10px;
  cursor: pointer;

  .recommended-author-img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
}

.recommended-author-name {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  cursor: pointer;
}

.recommended-author-desc {
  font-size: 12px;
  color: var(--el-text-color-regular);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>