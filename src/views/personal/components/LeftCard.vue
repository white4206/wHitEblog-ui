<template>
  <Affix :offset="fixHeight" :z-index="99">
    <!-- <el-affix :offset="fixHeight" :z-index="99">-->
    <div ref="leftCardRef">
      <el-card class="achievement-card">
        <template #header>
          <div class="more">个人成就</div>
        </template>
        <div>
          <div>
            <div class="info-item">
              <el-image src="/src/assets/images/common/modal_like.png" alt=""/>
              <span>获得 <span class="num">{{ "13,337" }}</span> 次点赞</span>
            </div>
            <div class="info-item">
              <el-image src="/src/assets/images/common/modal_comment.png" alt=""/>
              <span>内容获得 <span class="num">{{ "13,337" }}</span> 次评论</span>
            </div>
            <div class="info-item">
              <el-image src="/src/assets/images/common/modal_favorite.png" alt=""/>
              <span>获得 <span class="num">{{ "13,337" }}</span> 次收藏</span>
            </div>
          </div>
          <!--                  <div class="info-item">-->
          <!--                    <el-image src="/src/assets/images/common/modal_code.png" alt="">-->
          <!--                    <span>代码片获得 <span class="num">{{ "13,337" }}</span> 次分享</span>-->
          <!--                  </div>-->
          <el-collapse-transition>
            <div v-show="!isFold" class="creation-process">
              <div class="title">
                <el-icon :size="18">
                  <Calendar/>
                </el-icon>
                <span>创作历程</span>
              </div>
              <div class="content">
                <div class="content-item">
                  <span class="num">11篇</span>
                  <span class="year">2016年</span>
                </div>
                <div class="content-item">
                  <span class="num">96篇</span>
                  <span class="year">2015年</span>
                </div>
                <div class="content-item">
                  <span class="num">138篇</span>
                  <span class="year">2014年</span>
                </div>
                <div class="content-item">
                  <span class="num">720篇</span>
                  <span class="year">2013年</span>
                </div>
              </div>
            </div>
          </el-collapse-transition>
          <div v-if="!isFold" class="arrow" @click="isFold=true">
                    <span>
                      <el-icon color="var(--el-text-color-regular)">
                        <ArrowUp/>
                      </el-icon>
                    </span>
          </div>
          <div v-else class="arrow" @click="isFold=false">
                    <span>
                      <el-icon color="var(--el-text-color-regular)">
                        <ArrowDown/>
                      </el-icon>
                    </span>
          </div>
        </div>
      </el-card>
    </div>
    <!-- </el-affix>-->
  </Affix>
</template>

<script setup>
import Affix from "@/components/Affix/index.vue";
import {onMounted, ref} from "vue";

const fixHeight = ref(0)
const leftCardRef = ref()
const isFold = ref(true)
onMounted(() => {
  window.addEventListener("scroll", () => {
    let leftCardHeight
    if (leftCardRef.value)
      leftCardHeight = leftCardRef.value.offsetHeight + 20
    let windowHeight = window.innerHeight
    if (leftCardHeight >= windowHeight - 80)
      fixHeight.value = -(leftCardHeight - windowHeight)
    else
      fixHeight.value = 80
  })
})
</script>

<style scoped lang="scss">
.achievement-card {
  :deep(.el-card__body) {
    padding-bottom: 10px;
  }

  .info-item {
    font-size: 14px;
    display: flex;
    align-items: center;
    color: var(--el-text-color-regular);
    margin-bottom: 10px;

    .el-image {
      width: 22px;
      height: 22px;
      margin-right: 10px;
    }

    .num {
      font-weight: 500;
      color: var(--el-text-color-primary)
    }
  }

  .info-item:last-child {
    margin-bottom: 15px;
  }

  .creation-process {
    border-top: 1px dashed var(--el-border-color);
    border-bottom: 1px dashed var(--el-border-color);
    padding: 15px 0;

    .title {
      font-size: 14px;
      display: flex;
      align-items: center;

      .el-icon {
        margin-right: 10px;
      }
    }

    .content {
      margin: 10px 0;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      background-color: var(--el-fill-color-lighter);

      .content-item {
        display: flex;
        flex-direction: column;

        .num {
          cursor: pointer;
          font-size: 16px;
          color: var(--el-text-color-regular);
          margin-bottom: 5px;
        }

        .num:hover {
          color: var(--el-color-primary)
        }

        .year {
          font-size: 14px;
          color: var(--el-text-color-secondary);
        }
      }
    }
  }

  .arrow {
    cursor: pointer;
    text-align: center;
    margin-top: 10px;

    span {
      border-radius: 20px;
      background-color: var(--el-fill-color-light);
      padding: 0 15px;
    }
  }
}

.more {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
}
</style>