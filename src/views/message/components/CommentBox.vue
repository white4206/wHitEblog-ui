<template>
  <div class="comment-box">
    <div class="header">
      <div class="left-part"><span class="text">共2条内容</span></div>
      <div class="right-part">
        <el-button type="primary" link>
          <el-icon>
            <Delete/>
          </el-icon>
          清空所有消息
        </el-button>
      </div>
    </div>
    <div class="content">
      <div class="item" v-for="item in 3">
        <el-avatar/>
        <div class="desc">
          <div class="title">
            <div class="left-part">
              <span class="nickname"><el-button link>white4206</el-button></span>
              <span class="text">回复了你的评论</span>
            </div>
            <div class="right-part">
              <el-button size="small" :icon="Delete" link></el-button>
            </div>
          </div>
          <div class="comment-content">
            <div class="left-part">
              <el-link>评论</el-link>
            </div>
            <div class="right-part">
              <span class="date">刚刚</span>
            </div>
          </div>
          <div class="comment-title">
            <el-button link>【无标题】</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="margin-top: 30px">
    <el-pagination
        v-if="total"
        :total="total"
        background
        layout="->, total,sizes,prev, pager, next, jumper"
        :page-sizes="[5,10, 20, 30, 40, 50, 100]"
        v-model:current-page="currentPage"
        v-model:page-size="currentSize"
        @change="pageChange"
    />
  </div>
</template>

<script setup>
import {Delete} from "@element-plus/icons-vue";
import {ref} from "vue";

const total = ref(15)
const currentPage = ref(1)
const currentSize = ref(10)

const pageChange = () => {
}
</script>

<style scoped lang="scss">
.comment-box {
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .left-part {
      .text {
        font-size: 14px;
        color: var(--el-text-color-secondary)
      }
    }
  }

  .content {
    .item {
      display: flex;
      padding: 15px 0;
      border-bottom: 1px solid var(--el-border-color-lighter);

      .el-avatar {
        width: 40px;
        height: 40px;
        margin-right: 15px;
      }

      .desc {
        width: 100%;

        .title {
          color: var(--el-text-color-secondary);
          display: flex;
          justify-content: space-between;
          align-items: center;

          .left-part {
            flex: 1;
            font-size: 14px;

            .nickname {
              margin-right: 5px;

              .el-button {
                padding: 0;
                color: var(--el-text-color-primary);
              }

              .el-button:hover {
                color: var(--el-text-color-regular);
              }
            }
          }

          .right-part {
            margin-left: 200px;
          }
        }

        .comment-content {
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .left-part {
            .el-link {
              :deep(.el-link__inner) {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              color: var(--el-text-color-primary);
              font-weight: bold;
            }
          }

          .right-part {
            margin-left: 200px;
            font-size: 14px;
            color: var(--el-text-color-secondary);
          }
        }

        .comment-title {
          margin-top: 15px;
        }
      }
    }
  }
}
</style>