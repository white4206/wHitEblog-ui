<template>
  <el-card class="content-card" shadow="never">
    <div style="cursor: pointer">
      <el-row :gutter="16">
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic :value="98500">
              <template #title>
                <div>
                  总阅读量
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <el-tag v-if="true" type="info" round>昨日无变化</el-tag>
                <div v-else>
                  <span>较昨天</span>
                  <span class="green">
              24%
              <el-icon>
                <CaretTop/>
              </el-icon>
            </span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic :value="693700">
              <template #title>
                <div>
                  粉丝数
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <el-tag v-if="false" type="info" round>昨日无变化</el-tag>
                <div v-else>
                  <span>较昨天</span>
                  <span class="red">
              12%
              <el-icon>
                <CaretBottom/>
              </el-icon>
            </span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic :value="72000" title="New transactions today">
              <template #title>
                <div>
                  收藏数
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item">
                <el-tag v-if="false" type="info" round>昨日无变化</el-tag>
                <div v-else>
                  <span>较昨天</span>
                  <span class="green">
              16%
              <el-icon>
                <CaretTop/>
              </el-icon>
            </span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script setup>
import {CaretBottom, CaretTop,} from '@element-plus/icons-vue'
</script>

<style scoped>
.content-card {
  margin-bottom: 20px;
  border: none;

  :global(h2#card-usage ~ .example .example-showcase) {
    background-color: var(--el-fill-color) !important;
  }

  .el-statistic {
    --el-statistic-content-font-size: 28px;
  }

  .statistic-card {
    height: 100%;
    padding: 20px;
    border-radius: 5px;
    background-color: var(--el-bg-color-overlay);
  }

  .statistic-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--el-text-color-regular);
    margin-top: 16px;
  }

  .statistic-footer .footer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .green {
    color: var(--el-color-success);
  }

  .red {
    color: var(--el-color-error);
  }

  :deep(.el-statistic__head) {
    text-align: center;
  }

  :deep(.el-statistic__content) {
    text-align: center;
  }

  :deep(.el-statistic__content:hover) {
    color: var(--el-color-primary);
  }
}
</style>
