<template>
  <el-card shadow="never" class="websiteInfoBar"
           :style="
       {borderRadius: isBar?0:'4px',
        borderTop: isBar?'1px solid var(--el-border-color-lighter)':'none',
        minWidth: isBar?'1500px':'auto'}">
    <div class="website-info">
      <div style="margin-right: 10px">
        <el-button link type="info">关于我们</el-button>
        <el-button link type="info">招贤纳士</el-button>
        <el-button link type="info">商务合作</el-button>
        <el-button link type="info">寻求报道</el-button>
      </div>
      <span>
        <el-icon><PhoneFilled/></el-icon>
        158-5572-6398
      </span>
      <span>
        <el-icon><Message/></el-icon>
        1834893128@qq.com
      </span>
      <span>
        <el-icon><Service/></el-icon>
        在线客服
      </span>
      <span>
        工作时间 23:59-0:00
      </span>
    </div>
    <div class="record-info">
      <el-button type="info" size="small" link class="info-item"
                 @click="viewRecord('https://beian.mps.gov.cn/#/query/webSearch?code=34130202000761')">
        <img style="height: 12px;margin-right: 5px" src="@/assets/images/common/record.png" alt="">
        <span>皖公网安备34130202000761</span>
      </el-button>
      <el-button type="info" size="small" link class="info-item" @click="viewRecord('https://beian.miit.gov.cn')">
        皖ICP备2024053724号-1
      </el-button>
    </div>
    <div class="copy-info">
      <el-button type="info" link class="info-item" @click="viewRecord(`#`)">&copy;2024 By wHitE_
        个人开发者
      </el-button>
    </div>
  </el-card>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "bar",
  }
})
const isBar = computed(() => {
  return props.type === "bar"
})
const viewRecord = (url) => {
  if (url === '#')
    window.open(location.href.split('#')[0] + `#/personal?author=1`)
  else
    window.open(url)
}
</script>

<style scoped lang="scss">
.websiteInfoBar {
  border: none;
  position: relative;
  color: var(--el-text-color-secondary);

  :deep(.el-card__body) {
    padding: 20px 30px 10px 30px;
  }

  .website-info {
    display: flex;
    justify-content: center;
    font-size: 14px;
    margin-bottom: 10px;

    :deep(.el-button > span) {
      font-weight: normal;
    }

    span {
      display: flex;
      align-items: center;
      margin-right: 10px;

      .el-icon {
        margin-right: 5px;
      }
    }
  }

  .record-info, .copy-info {
    margin-bottom: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;

    :deep(.el-button > span) {
      font-weight: normal;
    }
  }
}
</style>