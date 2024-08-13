<template>
  <el-main style="overflow: visible">
    <el-row justify="center">
      <el-col :span="20" :xs="17" :sm="18" :md="19" :lg="20" :xl="21">
        <el-row :gutter="10">
          <el-col :span="2" justify="center">
            <Menu/>
          </el-col>
          <el-col :span="16" justify="center">
            <el-card class="resource-card">
              <template #header>
                <el-breadcrumb>
                  <el-breadcrumb-item :to="{ path: '/resource' }">
                    <el-link>下载资源</el-link>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item>
                    <span style="color:var(--el-text-color-primary);font-weight: 500">昵称 </span>
                    <span style="color:var(--el-text-color-regular)">的资源</span>
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </template>
              <div class="resource-content">
                <ResourceItem/>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6" justify="center">
            <RightCard/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-main>
  <el-backtop :right="50" :bottom="120"/>
</template>

<script setup>
import RightCard from "@/views/resource/userResource/components/RightCard.vue";
import Menu from "@/views/resource/userResource/components/Menu.vue";
import ResourceItem from "@/views/resource/userResource/components/ResourceItem.vue";
</script>

<style scoped lang="scss">
.el-card {
  border: none;
  box-shadow: none;
}

.resource-card {
  :deep(.el-card__header) {
    background-color: var(--el-fill-color-lighter);
  }
}


</style>