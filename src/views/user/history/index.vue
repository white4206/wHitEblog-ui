<template>
  <div>
    <el-card class="history-card" shadow="never">
      <el-tabs v-model="activeTab" @tab-click="tabClick">
        <el-tab-pane label="足迹" name="footmarks">
          <el-empty v-if="false" description="近期没有足迹"/>
          <div class="footmarks-box">
            <div class="operation-btn">
              <el-button size="small" round>清空历史</el-button>
            </div>
            <el-timeline>
              <el-timeline-item>
                <div class="timeline-content">
                  <div class="timestamp">今日</div>
                  <div class="content">
                    <el-card v-for="item in 2" shadow="hover">
                      <div class="content-item">
                        <div class="cover">
                          <el-image src="/src/assets/images/common/avatar.png" alt=""/>
                        </div>
                        <div class="desc">
                          <div class="title">react项目实现语音识别功能</div>
                          <div class="author-info">
                            <span class="avatar"><el-avatar src="/src/assets/images/common/avatar.png" alt=""/></span>
                            <span class="nickname">cachron</span>
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </div>
                </div>
              </el-timeline-item>
              <el-timeline-item>
                <div class="timeline-content">
                  <div class="timestamp">昨日</div>
                  <div class="content">
                    <el-card v-for="item in 3" shadow="hover">
                      <div class="content-item">
                        <div class="cover">
                          <el-image src="/src/assets/images/common/avatar.png" alt=""/>
                        </div>
                        <div class="desc">
                          <div class="title">react项目实现语音识别功能</div>
                          <div class="author-info">
                            <span class="avatar"><el-avatar src="/src/assets/images/common/avatar.png" alt=""/></span>
                            <span class="nickname">cachron</span>
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </div>
                </div>
              </el-timeline-item>
              <el-timeline-item>
                <div class="timeline-content">
                  <div class="timestamp">更早</div>
                  <div class="content">
                    <el-card v-for="item in 5" shadow="hover">
                      <div class="content-item">
                        <div class="cover">
                          <el-image src="/src/assets/images/common/avatar.png" alt=""/>
                        </div>
                        <div class="desc">
                          <div class="title">react项目实现语音识别功能</div>
                          <div class="author-info">
                            <span class="avatar"><el-avatar src="/src/assets/images/common/avatar.png" alt=""/></span>
                            <span class="nickname">cachron</span>
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </div>
                </div>
              </el-timeline-item>
              <el-timeline-item hollow type="primary">
                <div class="timeline-content">
                  <div class="timestamp">暂无更多</div>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-tab-pane>
        <el-tab-pane label="评论" name="comment">
          <el-empty v-if="false" description="近期没有评论"/>
          <div class="comment-box">
            <el-card v-for="item in 3" style="margin-bottom: 20px" shadow="never">
              <div class="comment-content">谢谢分享</div>
              <div class="comment-info">
                <div class="article-card">
                  <div class="cover"><el-image src="/src/assets/images/common/avatar.png" alt=""/></div>
                  <div class="article-info">
                    <div class="title">富文本编辑器CKEditor4简单使用-06（开发自定义插件——中级篇Part11）</div>
                    <div class="info">
                      <span>{{ 1309 }} 浏览</span>
                      <span>·</span>
                      <span>{{ 2 }} 评论</span>
                      <span>·</span>
                      <span class="avatar"><el-avatar src="/src/assets/images/common/avatar.png" alt=""/></span>
                      <span class="nickname">cachron</span>
                    </div>
                  </div>
                </div>
                <div class="comment-time">
                  2024-12-12 12:12:12
                </div>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="点赞" name="like">
          <el-empty v-if="true" description="近期没有点赞"/>
          <div v-else class="like-box">
            <el-timeline>
              <el-timeline-item>
                <div class="timeline-content">
                  <div class="timestamp">今日</div>
                  <div class="content">
                    <el-card v-for="item in 2" shadow="hover">
                      <div class="content-item">
                        <div class="cover">
                          <el-image src="/src/assets/images/common/avatar.png" alt=""/>
                        </div>
                        <div class="desc">
                          <div class="title">react项目实现语音识别功能</div>
                          <div class="author-info">
                            <span class="avatar"><el-avatar src="/src/assets/images/common/avatar.png" alt=""/></span>
                            <span class="nickname">cachron</span>
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </div>
                </div>
              </el-timeline-item>
              <el-timeline-item>
                <div class="timeline-content">
                  <div class="timestamp">昨日</div>
                  <div class="content">
                    <el-card v-for="item in 3" shadow="hover">
                      <div class="content-item">
                        <div class="cover">
                          <el-image src="/src/assets/images/common/avatar.png" alt=""/>
                        </div>
                        <div class="desc">
                          <div class="title">react项目实现语音识别功能</div>
                          <div class="author-info">
                            <span class="avatar"><el-avatar src="/src/assets/images/common/avatar.png" alt=""/></span>
                            <span class="nickname">cachron</span>
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </div>
                </div>
              </el-timeline-item>
              <el-timeline-item>
                <div class="timeline-content">
                  <div class="timestamp">更早</div>
                  <div class="content">
                    <el-card v-for="item in 5" shadow="hover">
                      <div class="content-item">
                        <div class="cover">
                          <el-image src="/src/assets/images/common/avatar.png" alt=""/>
                        </div>
                        <div class="desc">
                          <div class="title text-ellipsis-1">react项目实现语音识别功能</div>
                          <div class="author-info">
                            <span class="avatar"><el-avatar src="/src/assets/images/common/avatar.png" alt=""/></span>
                            <span class="nickname">cachron</span>
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </div>
                </div>
              </el-timeline-item>
              <el-timeline-item hollow type="primary">
                <div class="timeline-content">
                  <div class="timestamp">暂无更多</div>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";

const activeTab = ref("footmarks")
const router = useRouter()
const route = useRoute()

const tabClick = (tab) => {
  router.push({query: {tab: tab.paneName}})
}
onMounted(() => {
  if (route.query.tab)
    activeTab.value = route.query.tab
})
</script>

<style scoped lang="scss">
.history-card {
  border: none;

  :deep(.el-card__body) {
    padding: 0;
  }

  :deep(.el-tab-pane) {
    padding: 0 20px 20px 20px;
  }

  :deep(.el-tabs__header) {
    padding: 10px 20px 0 20px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  :deep(.el-tabs__nav-wrap::after) {
    content: none;
  }
}

.footmarks-box, .like-box {
  margin-top: 10px;
  padding: 10px;

  .operation-btn {
    position: absolute;
    top: 0;
    right: 30px;
  }

  .timeline-content {
    .timestamp {
      font-weight: bold;
      color: var(--el-text-color-regular);
    }

    .content {
      .el-card {
        border-radius: 0;
        border: 1px solid var(--el-border-color-lighter);

        :deep(.el-card__body) {
          padding: 20px;
        }
      }

      margin-top: 20px;

      .content-item {
        display: flex;

        .cover {
          .el-image {
            width: 140px;
            height: 80px;
          }

          margin-right: 10px;
        }

        .desc {
          .title {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 10px;
          }

          .title:hover {
            cursor: pointer;
            text-decoration: underline;
          }

          .author-info {
            display: flex;
            align-items: center;

            .avatar {
              .el-avatar {
                border-radius: 50%;
                width: 20px;
                height: 20px;
              }

              width: 20px;
              height: 20px;
              margin-right: 5px;
            }

            .nickname {
              font-size: 14px;
              color: var(--el-text-color-secondary);
            }
          }
        }
      }
    }
  }
}

.comment-box {
  padding: 10px;

  .el-card {
    :deep(.el-card__body) {
      padding: 10px;
    }
  }

  .comment-content {
    margin-bottom: 10px;
  }

  .comment-info {
    display: flex;
    justify-content: space-between;

    .article-card {
      padding: 10px;
      display: flex;
      background-color: var(--el-fill-color-lighter);

      .cover {
        .el-image {
          width: 105px;
          height: 60px;
        }

        margin-right: 10px;
      }

      .article-info {
        .title {
          font-size: 14px;
          color: var(--el-text-color-regular);
          margin-bottom: 5px;
        }

        .title:hover {
          cursor: pointer;
          text-decoration: underline;
        }

        span {
          margin-right: 5px;
        }

        .info {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: var(--el-text-color-secondary);

          .el-avatar {
            .el-image {
              border-radius: 50%;
              width: 20px;
              height: 20px;
            }

            width: 20px;
            height: 20px;
          }
        }
      }
    }

    .comment-time {
      padding: 10px;
      display: flex;
      align-items: end;
      font-size: 14px;
      color: var(--el-text-color-secondary);
    }
  }
}
</style>