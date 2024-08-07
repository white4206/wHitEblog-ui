<template>
  <el-card class="website-info side-card" shadow="never">
    <div class="website-info-header">
      <div class="info-item">联系我 (工作时间: 23:59-0:00)</div>
      <div class="info-contact-box">
        <span>158-5572-6398</span>
        <span>1834893128@qq.com</span>
        <span>在线客服</span>
      </div>
    </div>
    <div class="operation-box">
      <el-button link>关于我们</el-button>
      <el-divider style="margin: 0" direction="vertical"/>
      <el-button link>招贤纳士</el-button>
      <el-divider style="margin: 0" direction="vertical"/>
      <el-button link>业务合作</el-button>
      <el-divider style="margin: 0" direction="vertical"/>
      <el-button link>寻求报道</el-button>
    </div>
    <div class="record-info">
      <el-button type="info" link class="info-item" @click="viewRecord('https://beian.miit.gov.cn')">皖ICP备2024053724号-1
      </el-button>
      <el-button type="info" link class="info-item"
                 @click="viewRecord('https://beian.mps.gov.cn/#/query/webSearch?code=34130202000761')">
        <img style="height: 14px;margin-right: 5px" src="@/assets/images/common/record.png" alt="">
        <span>皖公网安备34130202000761</span>
      </el-button>
      <el-button type="info" link class="info-item" @click="viewRecord(`#`)">&copy;2024 By wHitE_
        个人开发者
      </el-button>
    </div>
  </el-card>
</template>

<script setup>
const viewRecord = (url) => {
  if (url === '#')
    window.open(location.href.split('#')[0] + `#/personal?author=1`)
  else
    window.open(url)
}
</script>

<style scoped lang="scss">
.side-card {
  margin-bottom: 20px;
}

.website-info {
  cursor: pointer;
  font-size: 14px;
  color: var(--el-text-color-secondary);

  .website-info-header {
    display: flex;
    flex-direction: column;

    .info-item {
      margin-bottom: 10px;
    }

    .info-contact-box {
      span {
        margin-right: 5px;
      }

      margin-bottom: 10px;
    }
  }

  .operation-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    padding: 10px 0;
    border-top: 1px solid var(--el-border-color-lighter);
    border-bottom: 1px solid var(--el-border-color-lighter);
    margin-bottom: 10px;
    color: var(--el-text-color-regular);

    :deep(.el-button > span) {
      font-weight: normal;
    }
  }

  .record-info {
    display: flex;
    flex-direction: column;

    :deep(.el-button > span) {
      font-weight: normal;
    }

    .info-item {
      justify-content: start;
      margin-left: 0;
      margin-bottom: 5px;
    }
  }
}
</style>