<template>
  <div class="search-item-box">
    <div class="left-part">
      <el-avatar/>
      <div style="flex:1;width: 100%;">
        <div class="nickname">昵称</div>
        <div class="info">
          <span>原创 {{ 15 }}</span>
          <span>阅读 {{ '1.1万+' }}</span>
          <span>点赞 {{ 47 }}</span>
        </div>
        <div class="description text-ellipsis-1">
          CSDN博客专家，华为云享专家，HDZ核心组成员，
        </div>
      </div>
    </div>
    <div class="right-part">
      <el-button style="padding: 0 35px" round>关注</el-button>
    </div>
  </div>
  <el-backtop :right="50" :bottom="120"/>
</template>

<script setup>

</script>

<style scoped lang="scss">
.search-item-box {
  padding: 15px 25px;
  border-bottom: 1px solid var(--el-border-color-lighter);
  display: flex;
  align-items: center;

  .left-part {
    display: flex;
    align-items: center;
    flex: 1;

    .el-avatar {
      width: 50px;
      height: 50px;
      margin-right: 15px;
    }

    .nickname {
      font-weight: 500;
      cursor: pointer;
      font-size: 16px;
    }

    .nickname:hover {
      color: var(--el-color-primary);
    }

    .info {
      color: var(--el-text-color-regular);
      margin-top: 10px;
      font-size: 14px;

      span {
        margin-right: 10px;
      }
    }

    .description {
      margin-top: 10px;
      width: 230px;
      font-size: 14px;
      color: var(--el-text-color-regular);
    }
  }
}
</style>