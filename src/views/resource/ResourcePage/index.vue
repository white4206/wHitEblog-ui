<template>
  <div style="background-color: var(--el-bg-color);min-width: 1500px">
    <el-main>
      <el-row justify="center">
        <el-col :span="22" :xs="19" :sm="20" :md="21" :lg="22" :xl="23">
          <el-row :gutter="50">
            <el-col :span="18" justify="center">
              <el-card class="queryForm-card">
                <template #header>
                  <div class="queryForm-card-header">
                    <div><img src="" alt=""/></div>
                    <div class="title"><span>设置查询参数</span></div>
                  </div>
                </template>
                <el-form :model="queryParam" ref="queryParamRef" :rules="queryParamRules">
                  <el-form-item label="类型">
                    <el-radio-group @change="typeChange" v-model="queryParam.type">
                      <el-radio-button v-for="item in typeItems" :label="item.name" :value="item.id"/>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="方向">
                    <el-radio-group @change="directionChange" v-model="queryParam.direction">
                      <el-radio-button v-for="item in directionItems" :label="item.name" :value="item.id"/>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item v-if="queryParam.direction!==1" label="分类">
                    <el-radio-group @change="categoryChange" v-model="queryParam.category">
                      <el-radio-button v-for="item in categoryItems" :label="item.name" :value="item.id"/>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="格式">
                    <el-radio-group @change="formatChange" v-model="queryParam.format">
                      <el-radio-button v-for="item in formatItems" :label="item.name" :value="item.id"/>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </el-card>
              <el-tabs v-model="activeTab" @tab-click="tabClick">
                <el-tab-pane label="综合" name="default">
                  <div style="display: grid;grid-template-columns: repeat(6,1fr);justify-items:center;;gap:0 20px">
                    <ResourceItem @click="router.push('/resource/details/1')" v-for="item in 1"/>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="最新" name="latest">

                </el-tab-pane>
                <el-tab-pane label="热门" name="hot">
                </el-tab-pane>
              </el-tabs>
            </el-col>
            <el-col :span="6">
              <RightCard/>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </div>
  <WebsiteInfoBar/>
  <el-backtop :right="50" :bottom="120"/>
</template>

<script setup>
import WebsiteInfoBar from "@/components/WebsiteInfoBar/index.vue";
import {onMounted, ref} from "vue";
import ResourceItem from "@/views/resource/ResourcePage/components/ResourceItem.vue";
import {useRoute, useRouter} from "vue-router";
import RightCard from "@/views/resource/ResourcePage/components/RightCard.vue";

const route = useRoute()
const router = useRouter()
const activeTab = ref("default")
const queryParam = ref({
  pageNum: 1,
  pageCount: 50,
  type: 1,
  direction: 1,
  format: 1,
  category: 1
})
const queryParamRef = ref()
const queryParamRules = ref({})
const typeItems = ref([
  {id: 1, name: "下载资源"}, {id: 2, name: "电子书"}, {id: 3, name: "效率工具"},
  {id: 4, name: "开发工具"}, {id: 5, name: "软件资源"}, {id: 6, name: "源代码"},
  {id: 7, name: "其他"}
])
const directionItems = ref([
  {id: 1, name: "全部"}, {id: 2, name: "前端"}, {id: 3, name: "后端"},
  {id: 4, name: "行业研究"}, {id: 5, name: "移动开发"}, {id: 6, name: "移动开发"},
  {id: 7, name: "操作系统"}, {id: 8, name: "人工智能"}, {id: 9, name: "物联网"},
  {id: 10, name: "操作系统"}, {id: 11, name: "人工智能"}, {id: 12, name: "物联网"}
])
const formatItems = ref([
  {id: 1, name: "全部"}, {id: 2, name: "doc"}, {id: 3, name: "pdf"},
  {id: 4, name: "zip"}, {id: 5, name: "ppt"}, {id: 6, name: "rar"},
  {id: 7, name: "exe"}, {id: 8, name: "txt"}, {id: 9, name: "7z"}
])
const categoryItems = ref([
  {id: 1, name: "全部"}, {id: 2, name: "Java"}, {id: 3, name: "C++"},
  {id: 4, name: "C#"}, {id: 5, name: "C"}, {id: 6, name: "Python"},
  {id: 7, name: "VB"}, {id: 8, name: "Netty"}, {id: 9, name: "Delphi"}
])

const tabClick = (tab) => {
  router.push({
    query: {
      type: queryParam.value.type || undefined,
      direction: queryParam.value.direction || undefined,
      category: queryParam.value.category || undefined,
      format: queryParam.value.format || undefined,
      tab: tab.paneName
    }
  })
}
const typeChange = () => {
  router.push({
    query: {
      type: queryParam.value.type || undefined,
      direction: queryParam.value.direction || undefined,
      category: queryParam.value.category || undefined,
      format: queryParam.value.format || undefined,
      tab: activeTab.value
    }
  })
}
const directionChange = () => {
  router.push({
    query: {
      type: queryParam.value.type || undefined,
      direction: queryParam.value.direction || undefined,
      category: queryParam.value.category || undefined,
      format: queryParam.value.format || undefined,
      tab: activeTab.value
    }
  })
}
const categoryChange = () => {
  router.push({
    query: {
      type: queryParam.value.type || undefined,
      direction: queryParam.value.direction || undefined,
      category: queryParam.value.category || undefined,
      format: queryParam.value.format || undefined,
      tab: activeTab.value
    }
  })
}
const formatChange = () => {
  router.push({
    query: {
      type: queryParam.value.type || undefined,
      direction: queryParam.value.direction || undefined,
      category: queryParam.value.category || undefined,
      format: queryParam.value.format || undefined,
      tab: activeTab.value
    }
  })
}
onMounted(() => {
  if (route.query.tab)
    activeTab.value = route.query.tab
  if (route.query.type)
    queryParam.value.type = route.query.type
  if (route.query.direction)
    queryParam.value.direction = route.query.direction
  if (route.query.category)
    queryParam.value.category = route.query.category
  if (route.query.format)
    queryParam.value.format = route.query.format
})
</script>

<style lang="scss" scoped>
.el-main {
  overflow: visible;
}

.queryForm-card {
  padding: 0 20px;
  margin-bottom: 40px;
  border: none;
  box-shadow: 0 0 6px var(--el-border-color-lighter);

  :deep(.el-card__header) {
    padding: 18px 0;
  }

  :deep(.el-card__body) {
    padding: 20px 0;
  }

  .queryForm-card-header {
    display: flex;

    .title {
      font-size: 16px;
    }
  }

  .el-form-item {
    margin-bottom: 10px;
  }

  :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
    color: var(--el-color-primary);
    font-weight: 500;
    border: none;
    background: transparent;
    box-shadow: none;
  }

  :deep(.el-radio-button__inner) {
    border: none;
    font-weight: normal;
  }

  :deep(.el-radio-button__inner:hover) {
    color: var(--el-text-color-primary);
  }
}


:deep(.el-tabs__item) {
  color: var(--el-text-color-regular);
  font-size: 16px;
}

:deep(.el-tabs__item.is-active) {
  color: var(--el-color-primary);
}

:deep(.el-tabs__nav-wrap::after) {
  content: none;
}
</style>