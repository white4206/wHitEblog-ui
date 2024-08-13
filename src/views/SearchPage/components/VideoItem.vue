<template>
  <div class="search-item-box">
    <div style="display: flex;">
      <div class="title" @click="toDetails(resourceItem.id)">
        <el-icon style="margin-right: 5px" :size="22">
          <svg-icon icon-name="videoB"/>
        </el-icon>
        <span class="text-ellipsis-1">VueCli3.x小白入门-slot插槽的使用</span>
      </div>
    </div>
    <div class="text-box">
      <div style="display: flex;justify-content: space-between;">
        <div class="abstractText text-ellipsis-1">
          欢迎收看由“weixin_39811651”带来的视频：ixin_39811651”带来的视频：ixin_39811651”带来的视频：ixin_39811651”带来的视频：ixin_39811651”带来的视频：VueCli3.x小白入门-slot插槽的使用，喜欢请多多分享、点赞、收藏。
        </div>
        <div class="image-box">
          <el-image src="/src/assets/images/common/watermark.png"/>
          <div class="masking">
            <el-icon :size="28" color="var(--el-bg-color)">
              <VideoPlay/>
            </el-icon>
          </div>
        </div>
      </div>
      <div class="info-box">
        <div class="info-box-left">
          <div class="num">
            <el-icon :size="20">
              <svg-icon icon-name="videoA"/>
            </el-icon>
            <span>1</span>
          </div>
        </div>
        <div class="info-box-right">
          <span class="author">作者</span>
          <span class="date">2024-08-03</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  resourceItem: {
    type: Object,
  }
})

const toDetails = (id) => {
  window.open(location.href.split("#")[0] + `#/blog/details/${id}`)
}
</script>

<style scoped lang="scss">
.search-item-box {
  padding: 15px 25px;
  border-bottom: 1px solid var(--el-border-color-lighter);

  .title {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 5px;

  }

  .title:hover {
    cursor: pointer;
    color: var(--el-color-primary);
  }

  .text-box {
    .abstractText {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: var(--el-text-color-regular);
      line-height: 1.5;
      margin-bottom: 10px;
    }

    .image-box {
      position: relative;

      .el-image {
        margin-left: 25px;
        width: 135px;
        height: 75px;
      }

      .masking {
        width: 0;
        height: 0;
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        .el-icon {
          color: transparent;
          transform: scale(1.8);
          transition: .4s;
        }
      }
    }

    .image-box:hover {
      .masking {
        width: 135px;
        height: 75px;

        .el-icon {
          color:var(--el-bg-color);
          transform: scale(1);
          transition: .4s;
        }
      }
    }

    .info-box {
      margin-top: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      color: var(--el-text-color-regular);

      .info-box-left, .info-box-right {
        display: flex;
        align-items: center;
      }

      .info-box-left {
        .num {
          display: flex;
          align-items: center;
          margin-right: 25px;

          .el-icon {
            margin-right: 5px;
          }
        }
      }

      .info-box-right {
        .author:hover {
          cursor: pointer;
          color: var(--el-color-primary);
        }

        .date {
          margin-left: 15px;
        }
      }
    }
  }
}
</style>