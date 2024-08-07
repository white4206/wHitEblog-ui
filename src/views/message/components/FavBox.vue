<template>
  <div  class="fav-box">
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
                          <span class="nickname">
                            <el-button link>white4206</el-button>
                            <b>、朽兮</b>
                            <b>、白大人</b>
                            <b>...</b>
                          </span>
              <span class="text">等9人收藏了你的博客</span>
            </div>
            <div class="right-part">
              <el-button size="small" :icon="Delete" link></el-button>
            </div>
          </div>
          <div class="content-title">
            <div class="left-part">
              <el-link :underline="false">
                评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论
              </el-link>
            </div>
            <div class="right-part">
              <span class="date">刚刚</span>
            </div>
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
.fav-box {
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

        .content-title {
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .left-part {
            flex: 1;

            .el-link {
              :deep(.el-link__inner) {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              font-weight: bold;
            }

            .el-link:hover {
              color: var(--el-text-color-primary);
            }
          }

          .right-part {
            margin-left: 200px;
            font-size: 14px;
            color: var(--el-text-color-secondary);
          }
        }
      }
    }
  }
}
</style>