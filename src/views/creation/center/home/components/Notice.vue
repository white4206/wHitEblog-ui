<template>
  <el-card style="border: none" shadow="never">
    <div class="title">
      <h4>平台公告</h4>
      <el-button link>查看更多</el-button>
    </div>
    <div class="notice-item" v-for="platformAnnouncement in platformAnnouncements" :key="platformAnnouncement.id">
          <span class="date">
            {{
              new Date(platformAnnouncement.createTime).toLocaleDateString("sv-SE").split('-')[1]
              + '-' + new Date(platformAnnouncement.createTime).toLocaleDateString("sv-SE").split('-')[2]
            }}
          </span>
      <span class="text">{{ platformAnnouncement.title }}</span>
    </div>
  </el-card>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {getPlatformAnnouncement} from "@/api/common.js";

const platformAnnouncements = ref([])

onMounted(() => {
  getPlatformAnnouncement().then(res => {
    platformAnnouncements.value = res.data
  })
})
</script>


<style scoped lang="scss">

.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  :deep(.el-button > span) {
    font-weight: normal;
  }
}

.notice-item {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  .date {
    color: var(--el-text-color-regular);
  }

  .text {
    margin-left: 10px;
    color: var(--el-text-color-primary);
  }
}

.notice-item:hover {

  .date {
    color: var(--el-color-primary);
  }

  .text {
    margin-left: 10px;
    color: var(--el-color-primary);
  }
}
</style>