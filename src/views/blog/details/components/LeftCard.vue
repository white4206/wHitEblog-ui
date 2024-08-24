<template>
  <Affix :offset="fixHeight" :z-index="99">
    <!-- <el-affix :offset="fixHeight" :index="99">-->
    <div ref="leftCardRef">
      <div class="aside">
        <el-card class="author-card aside-card" shadow="never">
          <div class="author">
            <img @click="router.push({path:'/personal',query:{author:authorInfo.authorId}})"
                 :src="authorInfo.avatar" :alt="authorInfo.nickname" class="author-avatar"/>
            <div>
              <div class="author-name"
                   @click="router.push({path:'/personal',query:{author:authorInfo.authorId}})">
                {{ authorInfo.nickname }}
              </div>
              <div class="author-tags">{{ authorInfo.description }}</div>
            </div>
          </div>
          <div class="author-info">
            <dl class="author-info-item">
              <dt>{{ authorInfo.viewNum }}</dt>
              <dd>访问</dd>
            </dl>
            <dl class="author-info-item">
              <dt>{{ authorInfo.fansNum }}</dt>
              <dd>粉丝</dd>
            </dl>
            <dl class="author-info-item">
              <dt>{{ authorInfo.likedNum }}</dt>
              <dd>获赞</dd>
            </dl>
            <dl class="author-info-item">
              <dt>{{ authorInfo.commentNum }}</dt>
              <dd>评论</dd>
            </dl>
            <dl class="author-info-item">
              <dt>{{ authorInfo.favNum }}</dt>
              <dd>收藏</dd>
            </dl>
          </div>
          <el-divider/>
          <div class="author-btn">
            <el-button :icon="Message" @click="ElMessage.info('私信功能暂未支持')">私信</el-button>
            <el-button :icon="Plus" type="primary" @click="ElMessage.info('关注功能暂未支持')">关注
            </el-button>
          </div>
        </el-card>
        <el-card class="search-card aside-card" shadow="never">
          <div class="search">
            <el-input v-model="asideSearch" @keyup.enter="searchArticle" placeholder="搜博主文章"
                      class="aside-search"
                      @focus="isFocusSearchInput=true" @blur="isFocusSearchInput=false"/>
            <el-button :icon="Search" @click="searchArticle"
                       style="border-bottom-left-radius: 0;border-top-left-radius: 0;border: none;width: 10px"
                       :style="{ backgroundColor: isFocusSearchInput?'var(--el-color-primary)':'var(--el-fill-color-dark)',
                                 color:isFocusSearchInput?'var(--el-color-white)':'var(--el-text-color-regular)'}"/>
          </div>
        </el-card>
        <el-card class="hot-article-card aside-card" shadow="never">
          <template #header>
            <div class="card-header">
              热门文章
            </div>
          </template>
          <div class="hot-article">
            <ul>
              <li class="hot-article-item" v-for="hotArticle in hotArticleList"
                  @click="toDetails(`/blog/details/${hotArticle.id}`)">
                <p>
                  {{ hotArticle.title }}
                  <el-icon color="var(--el-text-color-secondary)" style="vertical-align: -2px" :size="14">
                    <View/>
                  </el-icon>
                  <span>{{ hotArticle.viewNum }}</span>
                </p>
              </li>
            </ul>
          </div>
        </el-card>
        <el-card v-if="catalogue.length" class="catalogue-card aside-card" shadow="never">
          <template #header>
            <div class="card-header">
              目录
            </div>
          </template>
          <ol>
            <li class="catalogue-item text-ellipsis-1" v-for="item in catalogue" @click="scrollToId(item.id)" :style="{
                        paddingLeft:cataloguePaddingList[item.level],color:item.read?'var(--el-color-primary)':''}">
              {{ item.title }}
            </li>
          </ol>
        </el-card>
      </div>
    </div>
    <!-- </el-affix>-->
  </Affix>
</template>
<script setup>
import {Message, Plus, Search, View} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import Affix from "@/components/Affix/index.vue";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import toDetails from "@/utils/toDetails.js";

const emits = defineEmits(["update:catalogue"])
const props = defineProps({
  authorInfo: {
    type: Object
  },
  hotArticleList: {
    type: Array,
  },
  catalogue: {
    type: Array
  }
})
const catalogue = ref(props.catalogue)
// 当前滚动到的标题索引
const currentScrollIndex = ref()
const leftCardRef = ref()
const fixHeight = ref(0)
const router = useRouter()
const isFocusSearchInput = ref(false)

// 目录padding值列表
const cataloguePaddingList = ref(['20px', '40px', '60px', '80px', '100px'])
const asideSearch = ref()

const searchArticle = () => {
  if (asideSearch.value)
    window.open(location.href.split("#")[0] +
        `#/searchPage?author=${authorInfo.value.authorInfo.authorId}&q=${asideSearch.value}`)
  else
    ElMessage.info("请输入搜索内容")
}
const scrollToId = (id) => {
  let el = document.getElementById(id)
  window.scrollTo({top: el.offsetTop, behavior: 'smooth'})
}
onMounted(() => {
  window.addEventListener("scroll", () => {
    catalogue.value.forEach((item, index) => {
      item.read = false
      if (document.documentElement.scrollTop + 50 > item.e.offsetTop) {
        currentScrollIndex.value = index
      }
    })
    if (currentScrollIndex.value !== undefined) {
      catalogue.value[currentScrollIndex.value].read = true
      emits("update:catalogue", catalogue.value)
    }

    let leftCardHeight
    if (leftCardRef.value)
      leftCardHeight = leftCardRef.value.offsetHeight + 20
    let windowHeight = window.innerHeight
    if (leftCardHeight >= windowHeight - 80)
      fixHeight.value = -(leftCardHeight - windowHeight)
    else
      fixHeight.value = 80
  })
})
</script>
<style scoped lang="scss">
.aside-card {
  margin-bottom: 10px;
  border: none;
}

.search-card {
  .search {
    display: flex;

    :deep(.el-input__wrapper) {
      box-shadow: none;
      background-color: var(--el-fill-color-light);
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }

    .el-button:hover {
      color: var(--el-text-color-regular);
    }

    :deep(.el-select__placeholder.is-transparent) {
      color: var(--el-text-color-regular);
    }

    :deep(.el-input__inner::placeholder) {
      color: var(--el-text-color-regular);
    }
  }
}

.author {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.author-avatar {
  width: 45px;
  height: 45px;
  margin-right: 10px;
  border-radius: 50%;
  cursor: pointer;
}

.author-name {
  font-size: 14px;
  margin-bottom: 5px;
  cursor: pointer;
}

.author-name:hover {
  color: var(--el-color-primary);
}

.author-tags {
  font-size: 12px;
  color: var(--el-text-color-regular);
}

.author-info {
  display: flex;
  justify-content: space-around;
  font-size: 14px;
}

.author-info-item {
  text-align: center;

  dd {
    color: var(--el-text-color-regular);
  }
}

.author-btn {
  display: flex;
  justify-content: space-around;

  .el-button {
    width: 45%;
  }
}

.catalogue-card ol {
  list-style: none;

  .catalogue-item {
    padding: 0 10px;
    margin-bottom: 10px;
    line-height: 1.5;
    cursor: pointer;
  }

  .catalogue-item:hover {
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
  }
}

.hot-article {
  ul {
    list-style: none;
  }

  .hot-article-item {
    line-height: 1.5;
    margin-bottom: 10px;
    cursor: pointer;

    .el-icon {
      margin: 0 5px;
    }

    span {
      color: var(--el-text-color-regular);
      font-size: 14px;
      line-height: 1.5;
    }
  }

  .hot-article-item:hover {
    color: var(--el-color-primary);
  }
}
</style>