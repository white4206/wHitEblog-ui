<template>
  <div class="notice-box">
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
        <div class="content-header">
          <div class="left-part">
            <el-tag size="small" type="primary">博客</el-tag>
            <span class="title">标题</span>
          </div>
          <div class="right-part">
            <span class="date">2024-08-28</span>
            <el-button size="small" :icon="Delete" link></el-button>
          </div>
        </div>
        <div class="content-html">
                      <span data-v-0947769e=""><img width="90" height="90"
                                                    src="@/assets/images/common/watermark.png"
                                                    alt="图片"><br>欢迎来到CSDN，发布首篇文章参与抽奖，即有机会获得红包、CSDN定制周边！<a
                          target="_blank" href="https://mp.csdn.net/activity/newclock/">点击报名</a> 参与新人创作打卡挑战赛，还有更多奖品及流量扶持等你来。扫码入群，与C友一起玩转博客。</span>
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
.notice-box {
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
      padding: 15px 5px;
      border-bottom: 1px dashed var(--el-border-color-lighter);

      .content-header {
        display: flex;
        justify-content: space-between;
        background-color: var(--el-fill-color-lighter);
        padding: 15px;
        border-radius: 10px 10px 0 0;

        .left-part {
          flex: 1;

          .el-tag {
            margin-right: 5px;
          }

          .title {
            font-size: 14px;
          }
        }

        .right-part {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: var(--el-text-color-secondary);

          .date {
            margin-right: 25px;
          }
        }
      }

      .content-html {
        box-shadow: var(--el-box-shadow-lighter);
        border-radius: 0 0 5px 5px;
        background-color: var(--el-fill-color-light);
        padding: 15px;
      }
    }
  }
}
</style>