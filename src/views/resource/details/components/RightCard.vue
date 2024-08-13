<template>
  <Affix :offset="fixHeight" :z-index="99">
    <!-- <el-affix :offset="fixHeight" :z-index="99">-->
    <div class="right-card-box" ref="rightCardRef">
      <el-card class="author-card side-card">
        <div style="display: flex;align-items: center;justify-content: space-between">
          <div class="author-info">
            <el-avatar class="avatar"/>
            <div class="info">
              <div class="nickname">昵称</div>
              <div class="data">
                <span>粉丝: {{ 14 }}</span>
                <span>资源: <span class="num" @click="router.push('/resource/user')">{{ 1 }}</span></span>
              </div>
            </div>
          </div>
          <div class="attention-btn">
            <el-button round>私信</el-button>
          </div>
        </div>
      </el-card>
      <el-card class="operation-card side-card">
        <el-button style="width: 100%;" type="primary" size="large" :icon="Plus" round>上传资源</el-button>
        <div class="manager-operation" @click="isFoldManage=!isFoldManage">
          <div class="title">
            <el-icon :size="18">
              <FolderAdd/>
            </el-icon>
            我的内容管理
          </div>
          <el-button type="info" v-if="isFoldManage" size="small" link>
            <span>展开</span>
            <el-icon color="var(--el-text-color-secondary)">
              <ArrowRight/>
            </el-icon>
          </el-button>
          <el-button type="info" v-else size="small" link>
            <span>收起</span>
            <el-icon color="var(--el-text-color-secondary)">
              <ArrowDown/>
            </el-icon>
          </el-button>
        </div>
        <el-collapse-transition>
          <div v-show="!isFoldManage" class="manager-content">
            <div class="manager-item">
              <div class="title">
                <el-icon :size="18">
                  <FolderAdd/>
                </el-icon>
                我的资源
              </div>
              <el-button type="info" size="small" link>
                <span>{{ 2 }}个</span>
                <el-icon color="var(--el-text-color-secondary)">
                  <ArrowRight/>
                </el-icon>
              </el-button>
            </div>
            <div class="manager-item">
              <div class="title">
                <el-icon :size="18">
                  <Star/>
                </el-icon>
                我的资源
              </div>
              <el-button type="info" size="small" link>
                <el-icon color="var(--el-text-color-secondary)">
                  <ArrowRight/>
                </el-icon>
              </el-button>
            </div>
            <div class="manager-item">
              <div class="title">
                <el-icon :size="18">
                  <Download/>
                </el-icon>
                我的下载
              </div>
              <el-button type="info" size="small" link>
                <el-icon color="var(--el-text-color-secondary)">
                  <ArrowRight/>
                </el-icon>
              </el-button>
            </div>
          </div>
        </el-collapse-transition>
      </el-card>
      <el-card class="newest-card side-card">
        <template #header>
          <span style="font-size: 18px">最新资源</span>
        </template>
        <div class="newest-content">
          <div class="newest-item" v-for="item in 2">
            <el-button style="font-weight: normal;padding: 0" link>抓包工具Fiddler可执行文件</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <!-- </el-affix>-->
  </Affix>
</template>

<script setup>
import {Plus} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import Affix from "@/components/Affix/index.vue";

const props = defineProps({
  websiteInfoBarRef: {
    type: Object
  }
})
const rightCardRef = ref()
const fixHeight = ref()
const router = useRouter()
const isFoldManage = ref(true)

onMounted(() => {
  // 监听滚动改变右边栏的固定位置
  window.addEventListener("scroll", () => {
    let rightCardHeight
    let bottomBarHeight
    if (websiteInfoBarRef.value) {
      bottomBarHeight = websiteInfoBarRef.value.offsetHeight
      if (rightCardRef.value)
        rightCardHeight = rightCardRef.value.offsetHeight + 20 + bottomBarHeight
    }
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
    align-items: center;

    .avatar {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }

    .info {
      .nickname {
        font-size: 18px;
      }

      .data {
        font-size: 14px;
        color: var(--el-text-color-secondary);

        span {
          margin-right: 10px;
        }

        .num {
          cursor: pointer;
          font-weight: 500;
          color: var(--el-color-primary)
        }
      }
    }
  }
}

.operation-card {

  .manager-operation {
    cursor: pointer;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 14px;
      display: flex;
      align-items: center;
      color: var(--el-text-color-regular);

      .el-icon {
        margin-right: 5px;
      }
    }
  }

  .manager-content {
    .manager-item {
      cursor: pointer;
      margin: 20px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0 0 25px;

      .title {
        font-size: 14px;
        display: flex;
        align-items: center;
        color: var(--el-text-color-regular);

        .el-icon {
          margin-right: 5px;
        }
      }
    }
  }
}

.newest-card {
  :deep(.el-card__body) {
    padding: 0 20px;
  }

  .newest-content {
    .newest-item {
      cursor: pointer;
      font-size: 14px;
      padding: 10px 0;
      border-bottom: 1px solid var(--el-border-color-lighter);
    }
  }
}
</style>