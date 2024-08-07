<template>
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
            <el-button type="primary" link>快速回复</el-button>
            <el-divider direction="vertical"/>
            <el-button type="danger" link>删除</el-button>
          </div>
        </div>
        <div class="content">
          <el-icon :size="16" style="position:absolute;left: 10px;top:3px"
                   color="var(--el-border-color-darker)">
            <svg-icon icon-name="quoteLeft"/>
          </el-icon>
          <p>
            啊顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶啊顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶啊顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶啊顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶啊顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶啊顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶啊顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶啊顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶啊顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶啊顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶啊顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶啊顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶啊顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶啊顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶啊顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶啊顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶啊顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶啊顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶啊顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶</p>
          <el-icon :size="16" style="position:absolute;right: 10px;bottom:3px"
                   color="var(--el-border-color-darker)">
            <svg-icon icon-name="quoteRight"/>
          </el-icon>
        </div>
      </div>
    </div>
    <el-divider border-style="dashed"/>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
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