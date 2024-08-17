<template>
  <el-main>
    <el-row justify="center">
      <el-col :span="20" :xs="17" :sm="18" :md="19" :lg="20" :xl="21">
        <el-row :gutter="20">
          <el-col :span="18" justify="center">
            <el-card class="main-card video-card">
              <Plyr :videos="videos"/>
              <div class="operation-box">
                <div class="left-part">
                  <span>
                  <el-icon><SvgIcon icon-name="share"/></el-icon>
                  分享
                </span>
                  <span>
                  <el-icon><SvgIcon icon-name="like"/></el-icon>
                  点赞
                </span>
                  <span>
                  <el-icon><Star/></el-icon>
                  收藏
                </span>
                </div>
                <div class="right-part">
                  <el-switch style="margin-right: 25px" v-model="isOpen" class="custom-switch">
                    <template #active-action>弹</template>
                    <template #inactive-action>弹</template>
                  </el-switch>
                  <el-input class="custom-input" style="width:420px" placeholder="赶快来发弹幕吐槽吧~" clearable/>
                  <el-button class="custom-button" type="primary">发送</el-button>
                </div>
              </div>
              <div class="video-info">
                <div class="left-part">
                  <div class="title">League of Legends (TM) Client</div>
                  <div class="info">
                    <el-icon :size="20">
                      <SvgIcon icon-name="videoA"/>
                    </el-icon>
                    <span>6</span>
                    <span> · </span>
                    <span>发布于 {{ "2024-07-04 21:21:30" }}</span>
                  </div>
                  <div class="description">2024年3月13日，HarmonyOS Connect伙伴峰会（以下简称峰会）于上海隆重召开。本次峰会以《一起创造无限可能
                    新空间 再出发》为主题，深度解读鸿蒙智联发布的全场景智慧生活战略，展示了鸿蒙智联助力生态伙伴产品的全新成果，一系列华为智选春季新品在峰会上惊艳亮相。
                  </div>
                </div>
                <div class="right-part">
                  <el-avatar/>
                  <div style="flex:1;">
                    <div class="nickname text-ellipsis-1">HarmonyOS开发者</div>
                    <div class="fansNum">910粉丝</div>
                    <el-button style="padding: 0 20px" round>关注</el-button>
                  </div>
                </div>
              </div>
            </el-card>
            <el-card class="main-card comment-card">
              <div style="font-size: 16px;font-weight: bold">0条评论</div>
              <div style="display: flex;margin-left: 20px;margin-top: 20px">
                <el-input v-model="commentValue" class="custom-input" size="large" type="textarea"
                          placeholder="来都来了，还不说两句再走..."
                          :rows="showRow" resize="none" @focus="focusCommentInput" @blur="blurCommentInput"/>
                <el-button v-if="!isFocusCommentInput" style="margin:0 10px;" size="large" type="info">评论</el-button>
              </div>
              <div v-if="isFocusCommentInput" class="comment-info">
                <span>还能输入{{ wordCount }}个字符</span>
                <el-button style="padding: 0 5px;" @click="ElMessage.success('代雨倩')">发表评论</el-button>
              </div>
              <el-empty v-if="false" description="暂无评论，抢沙发！"/>
              <div class="comment-item" v-for="item in 5">
                <el-avatar/>
                <div class="content">
                  <div class="title">
                    <span>白大人: </span>
                    <div class="operation">
                      <el-button link type="primary">回复</el-button>
                      <el-icon style="margin-left: 25px">
                        <SvgIcon icon-name="like"/>
                      </el-icon>
                    </div>
                  </div>
                  <div class="text">
                    2024年3月13日，HarmonyOS Connect伙伴峰会（以下简称峰会）于上海隆重召开。本次峰会以《一起创造无限可能 新空间
                    再出发》为主题，深度解读鸿蒙智联发布的全场景智慧生活战略，展示了鸿蒙智联助力生态伙伴产品的全新成果，一系列华为智选春季新品在峰会上惊艳亮相。
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <Affix :disabled="true" :offset="fixHeight" :z-index="99">
              <!-- <el-affix :offset="fixHeight" :z-index="99">-->
              <div class="right-card-box" ref="rightCardRef">
                <el-card shadow="never" class="side-card recommendation-card">
                  <div class="title">为你推荐</div>
                  <div class="content">
                    <div class="item" v-for="item in 5">
                      <div class="cover">
                        <img src="@/assets/images/common/placeholder.png" alt=""/>
                        <el-icon :size="20"
                                 style="z-index:1;position: absolute;left: 50%;top:50%;transform: translate(-50%,-50%)"
                                 color="var(--el-bg-color)">
                          <CaretRight/>
                        </el-icon>
                        <div
                            style="position: absolute;left: 50%;top:50%;transform: translate(-50%,-50%);width: 25px;
                            height: 25px;background-color: rgba(0, 0, 0, 0.5);border-radius: 50%">
                        </div>
                        <span
                            style="padding: 0 5px;position: absolute;bottom: 5px;right:5px;font-size:12px;
                          background:rgba(0,0,0,.3);color:var(--el-color-white);border-radius: 5px">00:00</span>
                      </div>
                      <div class="info">
                        <div class="title text-ellipsis-2">标题标题标题标题标题标题标题标题标题标题标题标题</div>
                        <div class="desc">
                          <span class="nickname text-ellipsis-1">昵称</span>
                          <span class="viewNum">
                            <el-icon>
                              <SvgIcon icon-name="videoA"/>
                            </el-icon>
                            {{ 14 }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-card>
              </div>
              <!-- </el-affix>-->
            </Affix>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-main>
  <WebsiteInfoBar/>
  <el-backtop :right="50" :bottom="120"/>
</template>

<script setup>
import Plyr from '@/components/Plyr/index.vue'
import WebsiteInfoBar from '@/components/WebsiteInfoBar/index.vue'
import {onMounted, ref, watch} from "vue";
import {ElMessage} from "element-plus";
import Affix from "@/components/Affix/index.vue";

const textareaBg = ref("var(--el-fill-color-light)")
const commentValue = ref("")
const wordCount = ref(0)
const isFocusCommentInput = ref(false)
const showRow = ref(1)
const isOpen = ref(false)
const rightCardRef = ref()
const fixHeight = ref(0)
const videos = ref([
  {src: "http://47.120.12.136:8080/videos/jojo.mp4", size: "1440"},
  {src: "http://47.120.12.136:8080/videos/jojo.mp4"}
])

const focusCommentInput = () => {
  isFocusCommentInput.value = true
  showRow.value = 2
  textareaBg.value = "var(--el-bg-color)"
}
const blurCommentInput = () => {
  setTimeout(() => {
    isFocusCommentInput.value = false
    showRow.value = 1
    textareaBg.value = "var(--el-fill-color-light)"
  }, 80)
}
watch(commentValue, () => {
  let maxLength = 1000
  wordCount.value = maxLength - commentValue.value.length
}, {
  immediate: true
})
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
.el-main {
  overflow: visible;
}

.el-card {
  border: none;
}

.main-card {
  margin-bottom: 5px;
}

.video-card {

  :deep(.el-card__body) {
    padding: 0;
  }

  .operation-box {
    border-bottom: 1px solid var(--el-border-color-light);
    margin: 0 20px;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left-part {
      display: flex;
      align-items: center;

      span {
        display: flex;
        align-items: center;
        margin-right: 25px;

        .el-icon {
          margin-right: 5px;
        }
      }
    }

    .right-part {
      .custom-switch {
        :deep(.el-switch__core) {
          height: 24px;
          border-radius: 4px;
          background: var(--el-text-color-secondary);
        }

        :deep(.el-switch__core .el-switch__action) {
          font-size: 12px;
          border-radius: 4px;
          left: 2px;
          color: var(--el-text-color-regular)
        }
      }

      :deep(.custom-switch.el-switch.is-checked .el-switch__core) {
        border: var(--el-color-success);
        background-color: var(--el-color-success);
      }

      :deep(.custom-switch.el-switch.is-checked .el-switch__core .el-switch__action) {
        left: calc(100% - 19px);
      }

      .custom-input {
        :deep(.el-input__wrapper) {
          background: var(--el-fill-color-light);
          border-radius: 4px 0 0 4px;
        }
      }

      .custom-button {
        border-radius: 0 4px 4px 0;
      }
    }
  }

  .video-info {
    display: flex;
    align-items: center;
    margin: 0 20px;
    padding: 20px 0;

    .left-part {
      width: 620px;

      .title {
        font-weight: 500;
        font-size: 20px;
      }

      .info {
        margin-top: 10px;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: var(--el-text-color-regular);

        .el-icon {
          margin-right: 5px;
        }
      }

      .description {
        line-height: 1.5;
        margin-top: 10px;
        font-size: 14px;
        color: var(--el-text-color-secondary);
      }
    }

    .right-part {
      display: flex;
      margin-left: 30px;

      .el-avatar {
        width: 55px;
        height: 55px;
        margin-right: 15px;
      }

      .nickname {
        font-size: 14px;
        margin-bottom: 5px;
      }

      .fansNum {
        font-size: 12px;
        color: var(--el-text-color-secondary);
        margin-bottom: 5px;
      }
    }
  }
}

.recommendation-card {
  :deep(.el-card__body) {
    padding: 15px 15px 10px 15px;
  }

  .title {
    font-weight: bold;
  }

  .content {
    margin-top: 15px;

    .item {
      margin-bottom: 15px;
      display: flex;

      .cover {
        position: relative;
        border: 1px solid var(--el-border-color-lighter);
        cursor: pointer;
        margin-right: 10px;
        width: 125px;
        height: 70px;

        img {
          width: 125px;
          height: 70px;
        }
      }

      .info {
        .title {
          cursor: pointer;
          line-height: 1.5;
          font-size: 14px;
          font-weight: normal;
        }

        .desc {
          margin-top: 10px;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .nickname {
            color: var(--el-text-color-regular)
          }

          .viewNum {
            color: var(--el-text-color-secondary)
          }
        }
      }
    }

    .item:hover {
      .cover {
        border: 1px solid var(--el-color-primary);
      }

      .title {
        color: var(--el-color-primary)
      }
    }
  }
}

.comment-card {
  .custom-input {
    :deep(.el-textarea__inner) {
      padding: 10px;
      background: v-bind(textareaBg);
    }
  }

  .comment-info {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: right;
    font-size: 12px;
    color: var(--el-text-color-secondary);

    :deep(.el-button) {
      margin-left: 25px;
      color: var(--el-text-color-secondary)
    }

    :deep(.el-button:hover) {
      color: var(--el-color-primary)
    }
  }

  .comment-item {
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid var(--el-border-color-lighter);

    .el-avatar {
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }

    .content {
      flex: 1;

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: var(--el-text-color-regular);

        .operation {
          min-height: 20px;
          display: flex;
          align-items: center;

          .el-button {
            display: none;
          }
        }
      }

      .text {
        margin-top: 10px;
        font-size: 14px;
      }
    }
  }

  .comment-item:last-child {
    border-bottom: none;
  }

  .comment-item:hover {
    .content {
      .title {
        .operation {
          .el-button {
            display: inline-flex;
          }
        }
      }
    }
  }
}

</style>