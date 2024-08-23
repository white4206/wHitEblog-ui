<template>
  <el-main>
    <div class="container">
      <SvgIcon icon-class="enter" size="64" icon-name="demon"/>
      <div class="info" v-loading="isLoading">
        <div>IP：
          <el-tag type="danger" style="font-size:14px;font-weight: 500;color:var(--el-color-danger)">
            {{ ipAddress.ip }}
          </el-tag>
        </div>
        <div>IP属地：
          <el-tag style="font-size:14px;font-weight: 500">
            {{ ipAddress.address }}
          </el-tag>
        </div>
        <div>访问时间：
          <span style="font-size:14px;font-weight: 500">
            {{ ipAddress.accessTime }}
          </span>
        </div>
        <div>访问设备：
          <el-tag type="warning" style="font-size:14px;font-weight: 500;color:var(--el-color-warning)">
            {{ ipAddress.accessOs }}
          </el-tag>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getIPAddress} from "@/api/common.js";
import SvgIcon from "@/components/SvgIcon/index.vue";

const ipAddress = ref({})
const isLoading = ref(true)

onMounted(() => {
  document.querySelector('link[rel="short icon"]').href = "/ipFavicon.ico"
  getIPAddress().then(res => {
    ipAddress.value = res.data;
    isLoading.value = false
  })
})
</script>

<style scoped lang="scss">
.el-main {
  height: 100vh;
  min-width: auto;
  background-color: var(--el-color-primary-light-9);

  @keyframes enter {
    from {
      transform: translateY(-100px);
      scale: 5;
    }
    to {
      transform: translateY(0);
      scale: 1;
    }
  }

  .enter {
    animation: enter ease 1.5s;
  }

  .container {
    margin-top: 100px;
    text-align: center;

    .info {
      color: var(--el-text-color-primary);
      line-height: 2;
    }
  }
}
</style>