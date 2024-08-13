<template>
  <div class="resource-box">
    <div class="resource-item">
      <div v-if="contentArticle.cover" class="icon"><el-image src="/src/assets/images/fileType/zip.png"
                                                         :alt="contentArticle.title"/></div>
      <div style="display: flex;flex-direction: column;flex:1">
        <el-row class="resource-box-row">
          <el-col :span="24">
            <span class="title text-ellipsis-1" @click="router.push({path:'/creation/editor',query:{resourceId:contentArticle.id}})">
                <b>{{ contentArticle.title }}</b>
            </span>
          </el-col>
        </el-row>
        <el-row class="resource-box-row" style="margin-bottom: 15px">
          <el-col>
            <span class="content">#EBEEF5v#EBEEF5#EBEEF5#EBEEF5内容内容</span>
          </el-col>
        </el-row>
        <el-row class="resource-box-row">
          <el-col :span="20">
            <el-tag style="margin-right: 15px;border: none;padding:0 5px" size="small">av</el-tag>
            <el-divider style="margin: 0;height: 0.5em" direction="vertical"/>
            <span
                style="margin-left: 15px;color: var(--el-text-color-primary);font-size: 14px">上传时间: 2024-07-04</span>
          </el-col>
          <el-col class="operation-box" :span="4">
            <el-button link
                       @click="router.push({path:'/creation/editor',query:{resourceId:contentArticle.id}})">
              立即评价
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-divider/>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
const props = defineProps({
  contentArticle: {
    type: Object
  }
})
</script>

<style scoped lang="scss">
.resource-box {
  margin-top: 20px;

  .resource-item {
    display: flex;

    .icon {
      width: 50px;
      height: 50px;
      margin-right: 20px;

      .el-image {
        width: 50px;
        height: 50px;
      }
    }

    .resource-box-row {
      margin-bottom: 10px;

      .content {
        font-size: 14px;
        color: var(--el-text-color-secondary)
      }
    }
  }
}

.title {
  cursor: pointer;
}

.title:hover {
  color: var(--el-color-primary);
}

.datetime, .desc-info {
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

.divider-pointer {
  color: var(--el-text-color-primary);
}

.operation-box {
  display: flex;
  justify-content: end;
  align-items: center;

  :deep(.el-button > span) {
    font-weight: normal;
  }

  .operation-more {
    padding-left: 10px;
    cursor: pointer;
  }

  :deep(.el-button.is-link) {
    color: var(--el-text-color-primary);
  }

  :deep(.el-button.is-link:hover) {
    color: var(--el-button-hover-link-text-color);
  }
}

.more-option-box {
  display: flex;
  flex-direction: column;
  align-items: center;

  .more-option {
    border-radius: 20px;
    padding: 5px 20px;
    cursor: pointer;
  }

  .more-option:hover {
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
  }
}
</style>