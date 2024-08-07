<template>
  <el-main>
    <div class="main-box">
      <el-row justify="center">
        <el-col :span="20" :xs="17" :sm="18" :md="19" :lg="20" :xl="21">
          <div class="title">
            <el-row :gutter="75">
              <el-col :span="16">
                <Swiper></Swiper>
              </el-col>
              <el-col :span="8">
                <div class="right-box">
                  <div class="blog-headNotice" @click="toDetails(blogHeadNotice.id)">
                    <img :src="blogHeadNotice.cover" :alt="blogHeadNotice.title"
                         class="blog-headNotice-img">
                    <div class="title-link">
                      <h3>{{ blogHeadNotice.title }}</h3>
                    </div>
                    <div>
                      <p class="title-description">{{ blogHeadNotice.abstractText }}</p>
                    </div>
                  </div>
                  <div class="blog-tools">
                    <h3>工具箱</h3>
                    <div class="blog-tools-items">
                      <div class="tool-item" v-for="item in blogToolsItems" :key="item.id"
                           @click="goToPage(item.href)">
                        <img :src="item.logoURL" :alt="item.title" class="tool-item-img">
                        <div>{{ item.title }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-main>
  <el-footer height="100%" class="bottom">
    <div class="bottom-box">
      <el-row justify="center">
        <el-col :span="20" :xs="17" :sm="18" :md="19" :lg="20" :xl="21">
          <div class="content">
            <el-row :gutter="75" justify="center">
              <el-col :span="16">
                <Tabs></Tabs>
              </el-col>
              <el-col :span="8">
                <RightCard/>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-footer>
  <el-backtop :right="50" :bottom="120"/>
</template>

<script setup>
import Swiper from '@/views/home/components/Swiper.vue';
import Tabs from '@/views/home/components/Tabs.vue'
import {onMounted, ref} from 'vue'
import {getHomePageNotice} from "@/api/common.js";
import RightCard from "@/views/home/components/RightCard.vue";

const blogHeadNotice = ref({})
const blogToolsItems = ref([
  {
    logoURL: new URL("@/assets/images/toolIcon//keyboard.png", import.meta.url).href,
    title: "游戏",
    href: "https://www.4399.com/",
    id: 1
  },
  {
    logoURL: new URL("@/assets/images/toolIcon/disk.png", import.meta.url).href,
    title: "图片转换",
    href: "https://convertio.co/zh/ico-converter/",
    id: 2
  },
  {
    logoURL: new URL("@/assets/images/toolIcon/pc_2.png", import.meta.url).href,
    title: "波浪",
    href: "https://getwaves.io/",
    id: 3
  },
  {
    logoURL: new URL("@/assets/images/toolIcon/pc.png", import.meta.url).href,
    title: "我的世界",
    href: "https://www.mcmod.cn/",
    id: 4
  },
])

const goToPage = (href) => {
  window.open(href, "__blank")
}
const toDetails = (id) => {
  window.open(location.href.split("#")[0] + `#/blog/details/${id}`)
}
onMounted(() => {
  console.log(`(•̀⌓• )シ ( ꒪̇ꌂ̇꒪̇)" 欢迎来到 wHitE 博客 ~
--------------------------------------`)
  getHomePageNotice().then(res => {
    res.data.cover = res.data.cover ? import.meta.env.VITE_APP_BASE_API + res.data.cover : null
    blogHeadNotice.value = res.data
  })
})
</script>

<style lang="scss" scoped>
.blog-headNotice {
  position: relative;
  line-height: 1.5;
  cursor: pointer;
  transition: .2s;
}

.blog-headNotice-img {
  width: 100%;
  height: 100%;
}

.blog-tools {
  color: var(--el-text-color-primary);
  margin-top: 20px;
}

.blog-tools-items {
  border: 2px solid var(--el-border-color-lighter);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px;
  background-color: var(--el-bg-color);
  display: flex;
  margin-top: 10px;
}

.tool-item {
  cursor: pointer;
  text-align: center;
  flex: 0 0 25%;
  font-size: 14px;
}

.tool-item-img {
  width: 25px;
  transition: .2s;
}

.tool-item-img:hover {
  transform: scale(1.1);
  transition: .2s;
}

.title-link {
  color: var(--el-text-color-primary);
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.title-link:hover {
  text-decoration: underline;
}

.title-description {
  color: var(--el-text-color-secondary);
  overflow: hidden;
  margin-top: 5px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.bottom {
  background-color: var(--el-bg-color);
  padding: 20px;
}

.el-main {
  min-height: auto;
  max-width: none;
  margin: 0;
}

.main-box {
  max-width: 1500px;
  margin: 0 auto;
}

.bottom-box {
  max-width: 1500px;
  margin: 0 auto;
}
</style>