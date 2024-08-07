<template>
  <div class="search-item-box">
    <div style="display: flex;">
      <div class="title" @click="toDetails(resourceItem.id)">{{ resourceItem.title }}</div>
    </div>
    <div style="display: flex;align-items: center;">
      <div class="text-box">
        <div class="abstractText">
          {{ resourceItem.abstractText }}
        </div>
        <div class="info-box">
          <div class="info-box-left">
            <div class="num">
              <el-icon :size="16">
                <svg-icon icon-name="heat"/>
              </el-icon>
              <span>{{ resourceItem.viewNum }}</span>
            </div>
            <div v-if="resourceItem.likeNum" class="num">
              <span>{{ resourceItem.likeNum + 'MB' }}</span>
            </div>
            <div v-if="resourceItem.commentNum" class="num">
              <el-icon :size="16">
                <ChatLineSquare/>
              </el-icon>
              <span>{{ resourceItem.commentNum }}</span>
            </div>
          </div>
          <div class="info-box-right">
            <span class="author">{{ resourceItem.author }}</span>
            <span class="date">{{ new Date(resourceItem.createTime).toLocaleDateString("sv-SE") }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ChatLineSquare} from "@element-plus/icons-vue";

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
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .title:hover {
    cursor: pointer;
    color: var(--el-color-primary);
  }

  .text-box {
    flex: 1;

    .abstractText {
      font-size: 14px;
      color: var(--el-text-color-regular);
      line-height: 1.5;
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .info-box {
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

  .image-box {
    position: relative;

    .el-image {
      margin-left: 25px;
      width: 135px;
      height: 75px;
    }

    .viewerNum {
      position: absolute;
      right: 6px;
      bottom: 4px;
      z-index: 10;
      display: block;
      color: #fff;
      font-size: 12px;
      padding: 0 4px;
      line-height: normal;
      background-color: rgba(0, 0, 0, .5);
      border-radius: 2px;
    }

  }
}
</style>