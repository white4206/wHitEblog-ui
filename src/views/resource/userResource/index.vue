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
                <div class="resource-item">
                  <img src="@/assets/images/fileType/zip.png" alt="">
                  <div class="right-part">
                    <div class="title">基于stm32f407的示波器+FFT频谱分析</div>
                    <div class="description">
                      使用DMA直接将ADC->DR中的数据传输到ADC数据缓存区，使用定时器触发adc，可调采样率，最高2.8MHz，可进行fft运算，使用emwin绘制时域图像和频域图。
                    </div>
                    <div class="info">
                      <span class="item">浏览量: <span class="num">{{ 5526 }}</span></span>
                      <span class="item">资源大小: <span class="num">{{ 20.32 }}MB</span></span>
                      <span class="item">上传时间: <span class="num">2022-06-01</span></span>
                    </div>
                  </div>
                </div>
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

  .resource-content {
    .resource-item {
      display: flex;
      padding-bottom: 15px;
      border-bottom: 1px solid var(--el-border-color-light);

      img {
        width: 50px;
        height: 50px;
      }

      .right-part {
        margin-left: 20px;

        .title {
          font-weight: bold;
          margin-bottom: 10px;
        }

        .description {
          font-size: 14px;
          color: var(--el-text-color-secondary);
          margin-bottom: 10px;
        }

        .info {
          font-size: 12px;

          .item {
            color: var(--el-text-color-regular);
            margin-right: 30px;
          }

          .num {
            color: var(--el-text-color-primary);
          }
        }
      }
    }
  }
}


</style>