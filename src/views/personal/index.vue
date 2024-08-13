<template>
  <el-main>
    <canvas ref="backgroundRef" class="background"/>
    <div class="personal-box">
      <el-row>
        <el-col>
          <PersonalCard
              :isSelf="isSelf"
              :userData="userData" :originalTotal="originalTotal"
              @showFans="activeTab='attention';attentionActiveTab='fans'"
              @showArticle="activeTab='article'"
          />
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">
          <LeftCard/>
        </el-col>
        <el-col :span="18">
          <el-card class="content-card">
            <SearchBox :authorId="authorId" v-model:showTabItem="showTabItem"/>
            <el-tabs v-model="activeTab" @tab-change="tabChange" @tab-click="tabClick">
              <el-tab-pane label="最近" name="recently">
                <div v-if="true" class="empty-box">
                  <el-link type="primary" :underline="false">
                    <div class="text">
                      <div>教你玩转wHitE博客</div>
                      <div>创作属于自己的第一篇文章</div>
                    </div>
                  </el-link>
                  <el-button type="primary" round
                             style="width: 200px;padding: 20px 0;font-size: 16px;font-weight: normal"
                             @click="router.push('/creation/editor')">写博客
                  </el-button>
                </div>
              </el-tab-pane>
              <el-tab-pane label="文章" name="article">
                <template #label>文章<span class="num">{{ articleTotal || '' }}</span>
                </template>
                <div class="queryForm">
                  <div class="query-item query-item-status" v-if="isSelf">
                    <el-select style="width: 125px" v-model="queryParam.status" @change="queryChange">
                      <el-option label="全部可见" :value="1"/>
                      <el-option label="仅我可见" :value="0"/>
                      <el-option label="审核中&失败" :value="-1"/>
                    </el-select>
                  </div>
                  <div class="query-item" :style="{color:queryParam.sortBy==='createTime'?'var(--el-color-primary)':''}"
                       @click="sortByCreateTime">
                    按最后发布时间
                    <el-icon :size="14">
                      <Sort/>
                    </el-icon>
                  </div>
                  <div class="query-item" :style="{color:queryParam.sortBy==='viewNum'?'var(--el-color-primary)':''}"
                       @click="sortByViewNum">
                    按访问量
                    <el-icon :size="14">
                      <Sort/>
                    </el-icon>
                  </div>
                  <div class="query-item query-item-time">
                    <el-select style="width: 100px" v-model="queryParam.time">
                      <el-option label="创作历程" value="all">
                        <div style="display: flex;justify-content: space-between;width: 130px">
                          <span>全部</span>
                          <span>{{ 1 }}篇</span>
                        </div>
                      </el-option>
                      <div style="border: 1px solid var(--el-border-color-lighter);margin: 10px 20px"/>
                      <el-option-group :label="'2024年('+1+'篇)'">
                        <el-option label="创作历程" value="2024">
                          <div style="display: flex;justify-content: space-between">
                            <span>07月</span>
                            <span>{{ 1 }}篇</span>
                          </div>
                        </el-option>
                      </el-option-group>
                    </el-select>
                  </div>
                </div>
                <div class="article-content">
                  <div v-if="!articleData.length && !isLoading" class="empty-box">
                    <el-link type="primary" :underline="false">
                      <div class="text">
                        <div>教你玩转wHitE博客</div>
                        <div>创作属于自己的第一篇文章</div>
                      </div>
                    </el-link>
                    <el-button type="primary" round
                               style="width: 200px;padding: 20px 0;font-size: 16px;font-weight: normal"
                               @click="router.push('/creation/editor')">写博客
                    </el-button>
                  </div>
                  <div v-infinite-scroll="load" :infinite-scroll-disabled="infinite"
                       :infinite-scroll-immediate="false" :infinite-scroll-delay="1000">
                    <div v-for="article in articleData" class="article-item" @click="toDetails(article.id)">
                      <div style="display: flex">
                        <div v-if="article.cover" class="cover">
                          <el-image :src="article.cover" alt=""/>
                        </div>
                        <div style="display: flex;flex-direction: column;justify-content: space-between;flex: 1">
                          <div>
                            <div class="title text-ellipsis-1"><span>{{ article.title }}</span></div>
                            <div class="abstractText text-ellipsis-1">{{ article.abstractText }}</div>
                          </div>
                          <div class="info">
                            <div class="info-detail">
                              <span style="margin-right: 10px"><el-tag type="primary" size="small">原创</el-tag></span>
                              <span>发布博客 {{ timeAgo(article.createTime) }}</span>
                              <span style="margin: 0 5px">·</span>
                              <span>{{ article.viewNum }} 阅读</span>
                              <span style="margin: 0 5px">·</span>
                              <span>{{ article.likeNum }} 点赞</span>
                              <span style="margin: 0 5px">·</span>
                              <span>{{ article.commentNum }} 评论</span>
                              <span style="margin: 0 5px">·</span>
                              <span>{{ article.favNum }} 收藏</span>
                            </div>
                            <span v-if="isSelf" class="edit-btn"
                                  @click.stop="router.push({path:'/creation/editor',query:{articleId:article.id}})">编辑</span>
                          </div>
                        </div>
                      </div>
                      <el-divider/>
                    </div>
                    <div class="noMore" v-if="noMore &&  isLoading" v-loading="isLoading">
                      {{ isLoading ? "..." : "暂时没有更多了..." }}
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="资源" name="resource">
                <template #label>资源 <span class="num">{{ resourceData.length || '' }}</span>
                </template>
                <div class="resource-content">
                  <el-empty v-if="!resourceData.length" description="暂无内容"/>
                  <div v-for="resource in resourceData" class="resource-item">
                    <div class="title text-ellipsis-1">
                      很长很长的标题很长很长的标题很长很长的标题很长很长的标题很长很长的标题很长很长的标题很长很长的标题很长很长的标题很长很长的标题很长很长的标题
                    </div>
                    <div class="info">
                      <span style="margin-right: 10px"><el-tag type="primary" size="small">原创</el-tag></span>
                      <span>发布资源 {{ '1小时前' }}</span>
                      <span style="margin: 0 5px">·</span>
                      <span>png</span>
                    </div>
                    <el-divider/>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="视频" name="video">
                <template #label>视频 <span class="num">{{ videoData.length || '' }}</span></template>
                <div class="video-content">
                  <el-empty v-if="!videoData.length" description="暂无内容"/>
                  <div v-for="video in videoData" class="video-item">
                    <div class="video-cover">
                      <el-image src="/src/assets/images/common/avatar.png" alt=""/>
                      <el-icon :size="24" color="var(--el-bg-color)">
                        <VideoPlay/>
                      </el-icon>
                    </div>
                    <div class="video-info">
                      <span class="title text-ellipsis-1">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</span>
                      <span class="info">发布视频 {{ '10小时前' }}</span>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="关注/订阅/互动" name="attention">
                <div class="attention-content">
                  <el-tabs v-model="attentionActiveTab" @tab-click="innerTabClick">
                    <el-tab-pane label="关注的人" name="attention">
                      <div class="author-content">
                        <el-empty v-if="!attentionData.length" description="暂无内容"/>
                        <div v-for="attention in attentionData">
                          <div class="author-item">
                            <div class="author">
                              <div class="avatar">
                                <el-image src="/src/assets/images/common/avatar.png" alt=""/>
                              </div>
                              <div class="author-info">
                                <div class="nickname">my_styles</div>
                                <div class="desc">欢迎访问</div>
                              </div>
                            </div>
                            <div>
                              <el-button class="attention-btn" type="info" size="small" plain round>已关注</el-button>
                            </div>
                          </div>
                          <el-divider/>
                        </div>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="粉丝" name="fans">
                      <div class="author-content">
                        <el-empty v-if="!fansData.length" description="暂无内容"/>
                        <div v-for="fans in fansData">
                          <div class="author-item">
                            <div class="author">
                              <div class="avatar">
                                <el-image src="/src/assets/images/common/avatar.png" alt=""/>
                              </div>
                              <div class="author-info">
                                <div class="nickname">my_styles</div>
                                <div class="desc">欢迎访问</div>
                              </div>
                            </div>
                            <div>
                              <el-button class="attention-btn" type="info" size="small" plain round>已关注</el-button>
                            </div>
                          </div>
                          <el-divider/>
                        </div>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="发布的评论" name="comment">
                      <div class="comment-content">
                        <el-empty v-if="!postCommentData.length" description="暂无内容"/>
                        <div class="comment-item" v-for="postComment in postCommentData">
                          <div class="comment">adasddasd</div>
                          <div class="comment-info">
                            <span>昨天 {{ '10:31' }}</span>
                            <span style="margin:0 5px;">·</span>
                            <span class="title">aaaaaaa</span>
                          </div>
                          <el-divider/>
                        </div>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="收到的评论" name="receiveComment">
                      <div class="comment-content">
                        <el-empty v-if="!receiveCommentData.length" description="暂无内容"/>
                        <div class="comment-item" v-for="receive in receiveCommentData">
                          <div class="comment">adasddasd</div>
                          <div class="comment-info">
                            <span>昨天 {{ '10:31' }}</span>
                            <span style="margin:0 5px;">·</span>
                            <span>用户123</span>
                            <span style="margin:0 5px;">·</span>
                            <span class="title">aaaaaaa</span>
                          </div>
                          <el-divider/>
                        </div>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-tab-pane>
              <el-tab-pane label="收藏" name="favorite">
                <div class="favorite-content">
                  <div class="favorite-item" v-for="item in 1">
                    <div class="title">我的收藏夹</div>
                    <div class="favorite-info">
                      <span>最近更新 {{ '2024.07.02' }}</span>
                      <span style="margin: 0 5px">·</span>
                      <span>{{ 76 }} 内容</span>
                      <span style="margin: 0 5px">·</span>
                      <span>{{ 0 }} 关注</span>
                      <template v-if="favoriteData.length">
                        <el-divider direction="vertical"/>
                        <span v-if="showFavorite" style="cursor: pointer;" @click="showFavorite=false">
                        展开
                        <el-icon><ArrowDown/></el-icon>
                      </span>
                        <span v-else style="cursor: pointer;" @click="showFavorite=true">
                        收起
                        <el-icon><ArrowUp/></el-icon>
                      </span>
                      </template>
                    </div>
                    <el-collapse-transition>
                      <div v-show="showFavorite">
                        <div v-if="favoriteData.length" class="favorite">
                          <div class="item" v-for="favorite in 3">
                        <span style="margin-right: 10px"><el-tag style="background-color: transparent" size="small"
                                                                 type="primary" effect="plain">博客</el-tag></span>
                            <span class="item-title">Vue CKEditor5 自定义编辑器详细流程 (插件安装使用流水程) </span>
                          </div>
                        </div>
                      </div>
                    </el-collapse-transition>
                    <el-divider/>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-main>
  <WebsiteInfoBar/>
  <el-backtop :right="50" :bottom="120"/>
</template>

<script setup>
import {computed, onMounted, onUnmounted, ref, watch} from 'vue'
import Particles from 'particlesjs/dist/particles.min.js'
import {useRoute, useRouter} from "vue-router";
import WebsiteInfoBar from "@/components/WebsiteInfoBar/index.vue";
import {getUserData} from "@/api/user.js";
import {getUserArticle} from "@/api/blog.js";
import {timeAgo} from '@/utils/datetimeUtil.js'
import useUserStore from "@/store/modules/user.js";
import PersonalCard from "@/views/personal/components/PersonalCard.vue";
import LeftCard from "@/views/personal/components/LeftCard.vue";
import SearchBox from "@/views/personal/components/SearchBox.vue";

const infinite = ref(false)
const noMore = ref(true)
const isLoading = ref(true)
const articleTotal = ref()
const originalTotal = ref()
const userStore = useUserStore()
const authorId = ref()
const route = useRoute()
const articleData = ref([])
const resourceData = ref([])
const videoData = ref([])
const attentionData = ref([])
const fansData = ref([])
const postCommentData = ref([])
const receiveCommentData = ref([])
const favoriteData = ref([])
const showFavorite = ref(false)
const queryParam = ref({
  pageNum: 0,
  pageCount: 10,
  status: 1,
  sortBy: "createTime",
  time: "all",
})
const router = useRouter()
const backgroundRef = ref()
const activeTab = ref("article")
const attentionActiveTab = ref("attention")
const userData = ref({
  avatar: new URL("@/assets/images/common/avatar.png", import.meta.url).href
})
const showTabItem = ref("flex")

const toDetails = (id) => {
  window.open(location.href.split("#")[0] + `#/blog/details/${id}`)
}
const reset = () => {
  articleData.value = []
  queryParam.value.pageNum = 0
  infinite.value = false
}
const load = () => {
  noMore.value = true
  isLoading.value = true
  queryParam.value.pageNum += 1
  getArticleData()
}
const queryChange = () => {
  reset()
  load()
}
const getArticleData = () => {
  getUserArticle({authorId: authorId.value, ...queryParam.value}).then(res => {
    articleData.value.push(...(res.data.map(item => {
      return {
        ...item,
        cover: item.cover ? import.meta.env.VITE_APP_BASE_API + item.cover : null
      }
    })))
    articleTotal.value = res.info.total
    if (queryParam.value.status === 1)
      originalTotal.value = res.info.total
    noMore.value = false
    isLoading.value = false
    if (res.data.length === 0) {
      noMore.value = true
      infinite.value = true
    }
  })
}
const tabChange = (name) => {
  if (name === "article")
    getArticleData()
}
const tabClick = (tab) => {
  router.push({query: {author: authorId.value, tab: tab.paneName, attentionActiveTab: attentionActiveTab.value}})
}
const innerTabClick = (tab) => {
  router.push({query: {author: authorId.value, tab: activeTab.value, attentionActiveTab: tab.paneName}})
}
const sortByCreateTime = () => {
  queryParam.value.sortBy = "createTime"
  reset()
  getArticleData()
}
const sortByViewNum = () => {
  queryParam.value.sortBy = "viewNum"
  reset()
  getArticleData()
}
const isSelf = computed(() => {
  return Number(route.query.author) === userStore.userInfo.id
})
watch(route, () => {
  authorId.value = route.query.author || null
  getUserData(authorId.value).then(res => {
    userData.value = res.data
    if (res.data.avatar)
      userData.value.avatar = import.meta.env.VITE_APP_BASE_API + res.data.avatar
    else
      userData.value.avatar = new URL("@/assets/images/common/avatar.png", import.meta.url).href
  })
  reset()
  getArticleData()
})
onMounted(() => {
  authorId.value = route.query.author || null
  if (route.query.tab)
    activeTab.value = route.query.tab
  getUserData(authorId.value).then(res => {
    userData.value = res.data
    if (res.data.avatar)
      userData.value.avatar = import.meta.env.VITE_APP_BASE_API + res.data.avatar
    else
      userData.value.avatar = new URL("@/assets/images/common/avatar.png", import.meta.url).href
  })
  load()
  Particles.init({
    selector: '.background',
    speed: 0.3,
    maxParticles: 180, // 最大粒子数
    sizeVariations: 3, // 粒子最大尺寸
    minDistance: 120, // 连线距离
    connectParticles: true, // 是否连线
    color: '#9286d1',
  });
})
onUnmounted(() => {
  Particles.destroy()
})
</script>

<style scoped lang="scss">
.el-main {
  overflow: visible;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--el-bg-color);
}

.personal-box {
  margin: 80px auto 0 auto;
  width: 1300px;
}

.content-card {
  :deep(.el-card__body) {
    padding: 0;
  }

  :deep(.el-tab-pane) {
    padding: 0 20px 20px 20px;
  }

  :deep(.el-tabs__header) {
    padding: 10px 20px 0 20px;
    margin-bottom: 0;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  :deep(.el-tabs__nav-wrap::after) {
    content: none;
  }
}


:deep(.el-tabs__item) {
  font-size: 16px;
}

.el-tabs {
  .num {
    font-size: 14px;
    color: var(--el-text-color-secondary);
    margin-left: 5px;
  }
}

.queryForm {

  border-bottom: 1px solid var(--el-border-color-lighter);
  display: flex;
  align-items: center;

  .query-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-right: 50px;
    font-size: 14px;
  }

  .query-item-status {
    margin-right: 30px;
  }

  :deep(.el-select__wrapper) {
    box-shadow: none;
  }

  :deep(.el-select__placeholder) {
    color: var(--el-color-primary);
  }

  :deep(.el-select__wrapper.is-focused) {
    box-shadow: none;
  }

  :deep(.el-select__wrapper:hover) {
    box-shadow: none;
  }
}

.article-content {


  .article-item {
    cursor: pointer;
    padding-top: 20px;

    .cover {
      width: 175px;
      height: 100px;
      margin-right: 20px;

      .el-image {
        width: 175px;
        height: 100px;
      }
    }

    .title {
      line-height: 1.5;
      margin-bottom: 5px;
      font-size: 18px;
    }

    .title span:hover {
      color: var(--el-color-primary);
    }

    .abstractText {
      margin-bottom: 15px;
      font-size: 14px;
      color: var(--el-text-color-regular);
    }

    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: var(--el-text-color-regular);

      .info-detail {
        display: flex;
        align-items: center;
      }

      .edit-btn {
        display: none;
      }
    }

    .el-divider {
      margin: 20px 0 0 0;
    }
  }

  .article-item:hover .edit-btn {
    display: inline-block;
  }
}

.resource-content {


  .resource-item {
    cursor: pointer;
    padding-top: 10px;

    .title {
      line-height: 2;
      font-size: 18px;
      margin-bottom: 10px;
    }

    .title:hover {
      color: var(--el-color-primary);
    }

    .info {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: var(--el-text-color-regular);
    }

    .el-divider {
      margin: 20px 0 0 0;
    }
  }
}

.video-content {


  .video-item {
    cursor: pointer;
    padding-top: 10px;
    display: flex;

    .video-cover {
      position: relative;
      width: 175px;
      height: 100px;
      margin-right: 20px;

      .el-icon {
        position: absolute;
        bottom: 5px;
        right: 10px;
      }

      .el-image {
        width: 175px;
        height: 100px;
      }
    }

    .video-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        font-size: 18px;
      }

      .info {
        font-size: 14px;
        color: var(--el-text-color-regular);
      }
    }
  }
}

.attention-content {

  :deep(.el-tabs__header) {
    padding: 0;
    margin-bottom: 0;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  .author-content {
    margin-top: 10px;

    .author-item {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .author {
        .avatar {
          cursor: pointer;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;

          .el-image {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }

        display: flex;
        align-items: center;

        .nickname {
          margin-bottom: 5px;
        }

        .desc {
          font-size: 14px;
          color: var(--el-text-color-regular);
        }
      }

      .attention-btn {
        background-color: transparent;
      }

      .attention-btn:hover {
        color: var(--el-text-color-secondary);
      }
    }
  }

  :deep(.el-tabs__item) {
    color: var(--el-text-color-primary);
    font-size: 14px;
  }

  :deep(.el-tabs__item.is-active) {
    color: var(--el-color-primary);
  }
}

.comment-content {
  margin-top: 10px;

  .comment-item {
    .comment {
      margin-bottom: 20px;
    }

    .comment-info {
      font-size: 14px;
      color: var(--el-text-color-regular);
    }

  }
}

.noMore {
  text-align: center;
  margin: 15px 0;
  font-size: 14px;
  color: var(--el-text-color-placeholder);
}

.favorite-content {
  margin-top: 10px;

  .favorite-item {
    .title {
      font-size: 18px;
      margin-bottom: 20px;
    }

    .favorite-info {
      font-size: 14px;
      color: var(--el-text-color-regular);
      margin-bottom: 10px;
    }

    .favorite {
      padding: 20px;
      background-color: var(--el-fill-color-light);

      .item {
        padding: 10px 0;
        cursor: pointer;
        display: flex;
        align-items: center;

        .item-title {
          color: var(--el-text-color-regular);
          font-size: 16px;
        }

        .item-title:hover {
          color: var(--el-color-primary);
        }
      }
    }
  }
}

.empty-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .el-link {
    margin: 50px 0 20px 0;

    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;

      div {
        text-align: center;
      }
    }
  }

  .el-button {
    margin-bottom: 20px;
  }
}

:deep(.el-tabs__item) {
  color: var(--el-text-color-regular);
  font-size: 16px;
}

:deep(.el-tabs__header.is-top) {
  display: v-bind(showTabItem);
}

:deep(.el-tabs__item.is-active) {
  color: var(--el-color-primary);
}
</style>