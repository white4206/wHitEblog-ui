<template>
  <div class="resource-item">
    <el-image src="/src/assets/images/fileType/zip.png" alt=""/>
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
</template>

<script setup>

</script>

<style scoped lang="scss">
.resource-item {
  display: flex;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--el-border-color-light);

  .el-image {
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
</style>