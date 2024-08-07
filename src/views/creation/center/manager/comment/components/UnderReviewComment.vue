<template>
  <div>
    <el-table ref="tableRef" :data="articleComments">
      <el-table-column type="selection" width="30"/>
      <el-table-column>
        <template #header>
          <div style="display: flex;justify-content: space-between">
            <el-button link type="primary" @click="tableRef.toggleAllSelection()">全选</el-button>
            <el-button link type="primary">一键公开</el-button>
          </div>
        </template>
        <template #default="scope">
          <div class="articleComment-box">
            <div class="articleComment-item">
              <el-avatar/>
              <div style="flex:1;">
                <div class="title">
                  <div class="left-part">
                    <span class="nickname"> 白大人_ </span>
                    <span class="date"> 2024.07.28 </span>
                    <span class="text">回复了你的文章</span>
                    <span><el-link type="primary">【无标题】</el-link></span>
                  </div>
                  <div class="right-part">
                    <el-button type="danger" link>删除</el-button>
                  </div>
                </div>
                <div class="content">
                  <el-icon :size="16" style="position:absolute;left: 10px;top:3px"
                           color="var(--el-border-color-darker)">
                    <svg-icon icon-name="quoteLeft"/>
                  </el-icon>
                  <p>
                    内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                  <el-icon :size="16" style="position:absolute;right: 10px;bottom:3px"
                           color="var(--el-border-color-darker)">
                    <svg-icon icon-name="quoteRight"/>
                  </el-icon>
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import {ref} from "vue";

const props = defineProps({
  articleComments: {
    type: Object
  }
})
const tableRef = ref()

</script>
<style scoped lang="scss">
:deep(.el-table--fit .el-table__inner-wrapper::before) {
  width: 0;
}

:deep(.el-table th.el-table__cell.is-leaf) {
  border-bottom: 1px dashed var(--el-border-color)
}

:deep( .el-table td.el-table__cell) {
  border-bottom: 1px dashed var(--el-border-color)
}


:deep(.el-table-column--selection.el-table__cell) {
  vertical-align: top;
}

:deep(.el-table__row .el-table-column--selection) {
  .cell {
    margin-top: 15px;
  }
}

:deep(.el-table th.el-table__cell) {
  background-color: var(--el-fill-color-light);
}

.articleComment-box {
  margin-top: 10px;

  .articleComment-item {
    display: flex;

    .el-avatar {
      height: 30px;
      width: 30px;
      margin-right: 10px;
    }

    .title {
      line-height: 1.5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 14px;

      .left-part {
        display: flex;
        align-items: center;

        span {
          margin: 0 5px;
        }

        .date, .text {
          color: var(--el-text-color-secondary);
        }
      }

      .right-part {
        display: none;
      }

    }

    .content {
      margin-left: 10px;
      position: relative;

      p {
        padding: 0 30px;
        font-size: 14px;
      }
    }
  }
}

.articleComment-item:hover {
  .title {
    .right-part {
      display: block;
    }
  }
}
</style>