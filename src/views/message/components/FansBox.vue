<template>
  <div class="fans-box">
    <div class="header">
      <div class="left-part"><span class="text">共2条内容</span></div>
      <div class="right-part">
        <el-button type="primary" link>
          <el-icon>
            <svg-icon icon-name="people"/>
          </el-icon>
          粉丝数据
        </el-button>
        <el-divider style="height: 0.75em" direction="vertical"/>
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
          <div class="left-part">
            <div>
              <div class="nickname">
                <el-button class="text-ellipsis-1" link>昵称很长你要听吗</el-button>
              </div>
              <div class="info">2024-07-13通过 博客 关注了你</div>
            </div>
            <el-popover :show-arrow="false" :offset="5" popper-style="min-width:auto;padding:5px 0"
                        :width="80">
              <template #reference>
                <el-icon class="more">
                  <More/>
                </el-icon>
              </template>
              <div class="more-item">
                <div class="item">私信</div>
                <div class="item">删除</div>
              </div>
            </el-popover>
          </div>
          <div class="right-part">
            <el-button style="padding: 0 30px" round>回关</el-button>
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
.fans-box {
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
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left-part {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .nickname {
            .el-button {
              padding: 0;
              color: var(--el-text-color-primary);
            }

            .el-button:hover {
              color: var(--el-text-color-regular);
            }
          }

          .info {
            margin-top: 10px;
            font-size: 14px;
            color: var(--el-text-color-secondary);
          }

          .more {
            display: none;
            padding: 5px;
            margin-right: 25px;
          }

          .more:hover {
            background: var(--el-fill-color);
            border-radius: 15px;
          }
        }
      }
    }

    .item:hover {
      .desc {
        .left-part {
          .more {
            display: block;
          }
        }
      }
    }
  }
}

.more-item {
  .item {
    cursor: pointer;
    text-align: center;
    padding: 10px;
  }

  .item:hover {
    background-color: var(--el-color-primary-light-9);
  }
}
</style>