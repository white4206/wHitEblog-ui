<template>
  <div class="recent-resource">
    <el-row align="middle" justify="space-between">
      <el-col :span="2">
        <div class="resource-tag">
          <el-tag effect="plain" size="small">下载</el-tag>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="resource-box">
          <el-tooltip content="【无标题】" effect="light" placement="top-start" :show-after="500">
            <div class="title">【无标题】</div>
          </el-tooltip>
          <el-tooltip content="测试博客测试博客测试博客测试博客测试博客测试博客测试博客测试博客测试博客测试博客测试博客测试博
                    客测试博客测试博客测试博客测试博客测试博客" effect="light" placement="bottom-start"
                      :show-after="500">
            <div class="abstractText text-ellipsis-1">
              测试博客测试博客测试博客测试博客测试博客测试博客测试博客测试博客测试博客测试博客测试博客测试博
              客测试博客测试博客测试博客测试博客测试博客
            </div>
          </el-tooltip>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="desc-box">
          <div class="desc-option">
            <span class="count">0</span>
            <span class="desc">下载数</span>
          </div>
          <div class="desc-option">
            <span class="count">0</span>
            <span class="desc">评论数</span>
          </div>
          <div class="desc-option">
            <span class="count">0</span>
            <span class="desc">积分数</span>
          </div>
          <div class="desc-option">
            <span class="count">0</span>
            <span class="desc">收藏数</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>

</script>
<style scoped lang="scss">
.recent-resource {
  .resource-tag {
    height: 45px;
    display: flex;
    align-items: start;
    justify-content: center;
  }

  .resource-box {
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      font-weight: bold;
      margin-bottom: 10px;
    }

    .title:hover {
      cursor: pointer;
      color: var(--el-color-primary);
    }

    .abstractText {
      cursor: pointer;
      font-size: 14px;
      color: var(--el-text-color-regular);
    }
  }

  .desc-box {
    display: flex;
    justify-content: space-around;

    .desc-option {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .count {
        width: 100%;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .count:hover {
        cursor: pointer;
        color: var(--el-color-primary);
      }

      .desc {
        width: 100%;
        color: var(--el-text-color-regular);
        font-size: 14px;
      }
    }
  }
}

</style>