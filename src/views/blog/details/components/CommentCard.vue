<template>
  <div class="comment-card">
    <el-card shadow="never">
      <div class="content">
        <div class="left-part">
          <div class="info">
            <span class="num">{{ 6 }} 条评论</span>
            <el-icon>
              <ArrowRight/>
            </el-icon>
            <el-avatar/>
            <span class="nickname">朽兮_</span>
            <el-tag type="primary" size="small">热评</el-tag>
            <span
                class="text">博主adc基础配置那张图博主adc基础配置那张图博主adc基础配置那张图博主adc基础配置那张图，扫描应该是disable把，连续模式应该打开</span>
          </div>
        </div>
        <div class="right-part">
          <el-button type="primary" style="padding: 0 20px" round @click="showComment=true">写评论</el-button>
        </div>
      </div>
    </el-card>
    <el-drawer v-model="showComment" :size="500" :title="'评论 '+7">
      <div class="post-comment">
        <el-avatar/>
        <div class="textarea">
          <el-input v-model="commentValue" type="textarea" maxlength="1000" :rows="4"
                    resize="none">
          </el-input>
          <div class="operation-box">
            <div class="left-part">
              还能输入<span style="color: var(--el-text-color-primary)">{{ wordCount }}</span>个字符
            </div>
            <div class="right-part">
              <el-icon color="var(--el-text-color-secondary)" :size="22">
                <svg-icon icon-name="emoji"/>
              </el-icon>
              <el-icon color="var(--el-text-color-secondary)" :size="22">
                <svg-icon icon-name="code"/>
              </el-icon>
              <el-button size="small" style="padding:0 15px" type="primary" round>评论</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="all-comment">
        <div class="comment-item" v-for="item in 10">
          <el-avatar/>
          <div class="content">
            <div class="title">
              <div class="left-part">
                <span class="nickname">昵称</span> <span class="datetime">12 小时前</span>
              </div>
              <div class="right-part">
                <el-icon>
                  <More/>
                </el-icon>
                <span><el-icon><ChatSquare/></el-icon>回复</span>
                <el-icon>
                  <svg-icon icon-name="like"/>
                </el-icon>
              </div>
            </div>
            <div class="description">大佬求代码，541767872@qq.com，感激不尽</div>
          </div>
        </div>
      </div>
      <div class="viewMore">
        <span>查看更多评论</span>
        <el-icon :size="12">
          <ArrowDown/>
        </el-icon>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";

const showComment = ref(false)
const commentValue = ref("")
const wordCount = ref(1000)

watch(commentValue, () => {
  let maxLength = 1000
  wordCount.value = maxLength - commentValue.value.length
}, {
  immediate: true
})
</script>

<style scoped lang="scss">
.comment-card {
  margin-top: 10px;

  .el-card {
    border: none;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left-part {
      display: flex;
      align-items: center;

      .info {
        display: flex;
        align-items: center;
        margin-right: 25px;

        .num {
          cursor: pointer;
        }

        .el-icon {
          cursor: pointer;
          margin-right: 25px;
        }

        .el-avatar {
          cursor: pointer;
          margin-right: 10px;
        }

        .nickname {
          cursor: pointer;
          font-size: 14px;
          color: var(--el-text-color-regular);
          margin-right: 10px;
        }

        .el-tag {
          margin-right: 5px;
        }

        .text {
          flex: 1;
          font-size: 14px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  :deep(.el-drawer__header) {
    color: var(--el-text-color-primary);
    margin-bottom: 0;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--el-border-color);
  }
}

.post-comment {
  display: flex;

  .el-avatar {
    width: 30px;
    height: 30px;
    padding-top: 10px;
    margin-right: 10px;
  }

  .textarea {
    flex: 1;
    background: var(--el-fill-color-light);
    padding: 5px 11px;
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));

    :deep(.el-textarea__inner) {
      background: transparent;
      padding: 0;
      border-radius: 0;
      box-shadow: none;
    }

    ::-webkit-scrollbar {
      width: 2px;
    }

    .operation-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .left-part {
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }

      .right-part {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .el-icon {
          margin-right: 10px;
        }
      }
    }
  }
}

.all-comment {
  margin-top: 10px;

  .comment-item {
    display: flex;

    .el-avatar {
      margin-top: 15px;
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }

    .content {
      flex: 1;
      display: flex;
      align-items: start;
      flex-direction: column;
      padding: 15px 0;
      font-size: 14px;

      .title {
        color: var(--el-text-color-regular);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 5px;

        .left-part {
          .nickname {
            margin-right: 5px;
          }
        }

        .right-part {
          display: flex;
          align-items: center;

          .el-icon {
            margin-right: 15px;
          }

          span {
            display: flex;
            align-items: center;
            margin-right: 20px;

            .el-icon {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}

.viewMore {
  margin: 0 auto 30px auto;
  width: 40%;
  color: var(--el-text-color-regular);
  font-size: 14px;
  border-radius: 20px;
  text-align: center;
  padding: 5px 20px;
  background: var(--el-fill-color-light);
}
</style>