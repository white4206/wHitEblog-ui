<template>
  <el-main style="overflow:visible;max-width: 1600px;">
    <el-row justify="center">
      <el-col :span="20" :xs="17" :sm="18" :md="19" :lg="20" :xl="21">
        <el-row justify="center" :gutter="10">
          <el-col :span="6">
            <!-- 左侧卡片 -->
            <LeftCard :authorInfo="data.authorInfo" :hotArticleList="data.hotArticleList"
                      v-model:catalogue="catalogue"/>
          </el-col>
          <el-col :span="18">
            <!-- 博客内容 -->
            <el-card shadow="never" class="container-card">
              <div class="container">
                <div class="title">
                  <h1>{{ data.articleDetail.title }}</h1>
                </div>
                <div class="information">
                  <div class="prefix">

                  </div>
                  <div>
                    <div class="base-info">
                      <div class="base-info-items">
                        <div class="base-info-item name"
                             @click="router.push({path:'/personal',query:{author:data.authorInfo.authorId}})">
                          {{ data.authorInfo.nickname }}
                        </div>
                        <div v-if="!data.articleDetail.updateTime" class="base-info-item" style="font-size: 12px">
                          <el-icon :size="16">
                            <Clock/>
                          </el-icon>
                          <span>{{ "于 " + data.articleDetail.createTime + " 发布" }}</span>
                        </div>
                        <div v-else>
                          <el-tooltip placement="bottom-start"
                                      :content="'于 ' + data.articleDetail.createTime + ' 发布'"
                                      effect="light">
                            <template #default>
                              <div class="base-info-item" style="font-size: 12px">
                                <el-icon :size="16">
                                  <Switch/>
                                </el-icon>
                                <span>{{ "已于 " + data.articleDetail.updateTime + " 修改" }}</span>
                              </div>
                            </template>
                          </el-tooltip>
                        </div>
                        <div class="base-info-item">
                          <el-icon :size="16">
                            <View/>
                          </el-icon>
                          <span>{{ "阅读量" + data.articleDetail.viewNum }}</span>
                        </div>
                        <div class="base-info-item fav" @click="ElMessage.info('收藏功能暂未支持')">
                          <el-icon :size="16">
                            <Star/>
                          </el-icon>
                          <span>收藏</span>
                          <span class="favNum">{{ data.articleDetail.favNum }}</span>
                        </div>
                        <div class="base-info-item like" @click="ElMessage.info('点赞信功能暂未支持')">
                          <el-icon :size="16">
                            <svg-icon icon-name="like"/>
                          </el-icon>
                          <span>{{ "点赞" + data.articleDetail.likeNum }}</span>
                        </div>
                        <div class="base-info-item" style="color: var(--el-color-primary)">
                          公开
                        </div>
                      </div>
                      <div style="font-size: 12px">
                        <el-button size="small" link
                                   v-if="userStore.userInfo.id===data.authorInfo.authorId"
                                   @click="router.push({path:'/creation/editor',query:{articleId:data.articleDetail.id}})">
                          编辑
                        </el-button>
                        <el-divider v-if="userStore.userInfo.id===data.authorInfo.authorId" direction="vertical"/>
                        <el-button size="small" link @click="ElMessage.info('待完善')">版权</el-button>
                      </div>
                    </div>
                    <div class="article-tags">
                      <span>文章标签:</span>
                      <template v-for="tag in data.tagList" :key="tag.id">
                        <el-tag @click="ElMessage.info('功能暂未支持')">{{ tag.name }}</el-tag>
                      </template>
                    </div>
                  </div>
                </div>
                <el-image-viewer :hide-on-click-modal="true" v-if="showViewer" :url-list="srcList"
                                 :initial-index="viewerIndex"
                                 @close="showViewer=false"></el-image-viewer>
                <div class="content ck-content" ref="contentRef">
                </div>
              </div>
            </el-card>
            <!-- 底部栏 -->
            <FooterCard :articleDetail="data.articleDetail" :authorInfo="data.authorInfo"/>
            <!-- 评论 -->
            <CommentCard/>
            <!-- 网站信息条 -->
            <WebsiteInfoBar type="card" style="margin-top: 10px"/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-main>
  <el-backtop :right="50" :bottom="120"/>
</template>

<script setup>
// 导入ckeditor5的样式表
import '@/styles/ckeditor5/index.css';
import {Clock, Star, View} from '@element-plus/icons-vue'
import {onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {getArticleDetail} from "@/api/blog.js";
import Prism from 'prismjs'
import {ElMessage} from "element-plus";
import WebsiteInfoBar from "@/components/WebsiteInfoBar/index.vue";
import {deepTraverse} from "@/utils/deepTraverse.js";
import useUserStore from "@/store/modules/user.js";
import LeftCard from "@/views/blog/details/components/LeftCard.vue";
import CommentCard from "@/views/blog/details/components/CommentCard.vue";
import FooterCard from "@/views/blog/details/components/FooterCard.vue";

// 生成的目录
const catalogue = ref([])
const userStore = useUserStore()
const router = useRouter()
const showViewer = ref(false)
const srcList = ref([])
const viewerIndex = ref(0)
const route = useRoute()
const data = ref({
  articleDetail: {},
  authorInfo: {},
  hotArticleList: [],
  tagList: []
})
const contentRef = ref()

onMounted(() => {
  getArticleDetail(route.params.Bid).then(res => {
        data.value = res.data
        data.value.authorInfo.avatar = data.value.authorInfo.avatar ? import.meta.env.VITE_APP_BASE_API
            + data.value.authorInfo.avatar : null
        contentRef.value.innerHTML = res.data.articleDetail.content

        // 动态设置标题
        document.title = data.value.articleDetail.title + ' - ' + document.title

        // 动态创建图片预览元素
        document.querySelectorAll("figure.image img").forEach((img, index) => {
          srcList.value.push(img.src)
          img.style.cursor = "zoom-in"
          img.onclick = () => {
            showViewer.value = true
            viewerIndex.value = index
          }
        })

        // 代码美化
        const presEl = document.querySelectorAll('pre')
        for (let index = 0; index < presEl.length; index++) {
          const element = presEl[index];
          element.setAttribute("lang", 'zh-Hans-CN')
          element.setAttribute("data-prismjs-copy", '复制')
          element.setAttribute("data-prismjs-copy-error", '复制失败')
          element.setAttribute("data-prismjs-copy-success", '已复制')
          element.setAttribute("class", 'line-numbers')
        }
        Prism.highlightAll()

        // 获取并创建目录
        // 要获取的标题元素
        const titleElements = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
        // 元素深度遍历查询目标元素
        deepTraverse(titleElements, contentRef.value, (element, index) => {
          const id = 'header-' + index
          element.setAttribute('id', id)
          catalogue.value.push({
            id: id,
            title: element.innerText,
            level: Number(element.nodeName.substring(1, 2)) - 2,
            nodeName: element.nodeName,
            e: element,
            read: false
          })
        })
      }
  )
})
</script>

<style lang="scss" scoped>
.container-card {
  border: none;
  border-radius: 4px 4px 0 0;

  .container {
    .title {
      margin-bottom: 10px;
    }

    .information {
      padding: 10px;
      font-size: 14px;
      line-height: 1.5;
      color: var(--el-text-color-regular);
      background-color: var(--el-fill-color-lighter);
      border-radius: 5px;

      .prefix {
        margin-right: 10px;
      }

      .base-info {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .base-info-items {
          display: flex;
          align-items: center;
        }

        .base-info-item.name {
          cursor: pointer;
        }

        .base-info-item.name:hover {
          color: var(--el-color-primary);
        }

        .base-info-item.fav, .base-info-item.like {
          cursor: pointer;
        }

        .base-info-item.fav:hover {
          color: var(--el-color-primary);
        }

        .favNum {
          margin-left: 5px;
        }

        .base-info-item.fav:hover .favNum {
          color: var(--el-text-color-regular);
        }

        .base-info-item {
          .el-icon {
            margin-right: 5px;
          }

          display: flex;
          align-items: center;
          margin-right: 10px;
        }
      }

      .article-tags {
        display: flex;
        align-items: center;

        span {
          margin-right: 5px;
        }

        .el-tag {
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }

    .content {
      margin-top: 50px;
    }

    :deep(.el-image-viewer__wrapper) {

      .el-image-viewer__canvas {
        position: absolute;
        height: 80%;
        top: 10%;
      }
    }
  }
}
</style>
<style>
.ck-content {
  line-height: 2;
}

.ck-content ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 40px;
  unicode-bidi: isolate;
}

.ck-content ol {
  display: block;
  list-style-type: decimal;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 40px;
  unicode-bidi: isolate;
}
</style>