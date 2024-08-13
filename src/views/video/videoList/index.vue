<template>
  <div class="header-background">
    <el-image :src="headerBackground"/>
    <div class="header-cover"/>
  </div>
  <div style="background: var(--el-bg-color);">
    <el-main>
      <Affix :offset="60" :z-index="99">
        <div style="height: 110px">
          <el-row @mouseenter="unfoldChannelItem" @mouseleave="foldChannelItem"
                  :class="{'nav-bar-sticky-box':isNavBarSticky}" justify="center">
            <el-col :span="22" :xs="23" :sm="23" :md="23" :lg="22" :xl="21">
              <div ref="navBarRef">
                <div v-if="!isNavBarSticky" class="nav-bar">
                  <div class="channel-icon">
                    <div class="icon-box">
                      <el-button size="large" circle>
                        <el-icon :size="45">
                          <svg-icon icon-name="icon"/>
                        </el-icon>
                      </el-button>
                      <span>动态</span>
                    </div>
                    <div class="icon-box">
                      <el-button type="danger" size="large" circle>
                        <el-icon :size="24">
                          <svg-icon icon-name="heatA"/>
                        </el-icon>
                      </el-button>
                      <span>热门</span>
                    </div>
                  </div>
                  <div class="channel-item-left">
                    <div v-for="item in 22" class="item">{{ item }}</div>
                  </div>
                  <el-divider style="height: auto;margin: 0 20px" direction="vertical"/>
                  <div class="channel-item-right">
                    <div class="item" v-for="item in 6">
                      <el-icon :size="14">
                        <svg-icon icon-name="live"/>
                      </el-icon>
                      <span>直播</span>
                    </div>
                  </div>
                </div>
                <div v-else class="nav-bar-sticky">
                  <div class="channel-icon">
                    <div class="icon-box">
                      <el-button size="large" link>
                        <el-icon :size="22">
                          <svg-icon icon-name="icon"/>
                        </el-icon>
                        <span>动态</span>
                      </el-button>
                    </div>
                    <div class="icon-box">
                      <el-button size="large" link>
                        <el-icon :size="22" color="var(--el-text-color-secondary)">
                          <svg-icon icon-name="heatA"/>
                        </el-icon>
                        <span>热门</span>
                      </el-button>
                    </div>
                  </div>
                  <el-divider style="align-self: center" direction="vertical"/>
                  <div class="channel-item-box">
                    <div ref="channelItemRef" class="channel-item">
                      <div v-for="item in 33" class="item">{{ item }}</div>
                    </div>
                  </div>
                  <el-icon v-if="isFoldNavBarSticky" class="arrow" :size="10">
                    <ArrowDownBold/>
                  </el-icon>
                  <el-icon v-else class="arrow" :size="10">
                    <ArrowUpBold/>
                  </el-icon>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </Affix>
      <el-row justify="center">
        <el-col :span="22" :xs="23" :sm="23" :md="23" :lg="22" :xl="21">
          <div class="main-content">
            <div class="recommended-swiper">
              <img ref="swiperRef"
                        style="position: absolute;opacity: 0;z-index:-1;width: 100%;vertical-align: middle"
                        src="/src/assets/images/common/placeholder.png"
                        alt=""/>
              <el-carousel @change="carouselChange" ref="carouselRef" arrow="never" indicator-position="none"
                           :height="swiperHeight">
                <el-carousel-item v-for="item in carouselList" :key="item">
                  <div class="swiper-item" ref="swiperItemRef">
                    <el-image :src="item.src" alt=""/>
                  </div>
                </el-carousel-item>
              </el-carousel>
              <div class="item-info">
                <div class="mask"></div>
                <div class="info">
                  <div class="title">
                    <div class="text text-ellipsis-1">
                      人类与猿族的命运交织之战！人类与猿族的命运交织之战！人类与猿族的命运交织之战！人类与猿族的命运交织之战！
                    </div>
                    <div class="operation">
                      <el-icon :size="14" class="arrow" @click="goPrev">
                        <ArrowLeftBold/>
                      </el-icon>
                      <el-icon :size="14" class="arrow" @click="goNext">
                        <ArrowRightBold/>
                      </el-icon>
                    </div>
                  </div>
                  <div class="carousel-dots">
                    <ul class="dot-list" ref="dotList">
                      <li class="dot" v-for="(item,index) in carouselList.length" @click="switchTo(index)">
                        <div class="before"></div>
                        <div class="after"></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="item" v-for="item in 100">
              <div class="cover">
                <el-image src="/src/assets/images/common/watermark.png" alt=""/>
                <div class="mask">
                  <div class="left-part">
                  <span>
                    <el-icon :size="16" color="var(--el-bg-color)">
                      <svg-icon icon-name="videoA"/>
                    </el-icon>
                    298.1万
                  </span>
                    <span>
                    <el-icon :size="16" color="var(--el-bg-color)">
                      <svg-icon icon-name="danmu"/>
                    </el-icon>
                    2677
                  </span>
                  </div>
                  <div class="right-part">
                    <span>14:47</span>
                  </div>
                </div>
              </div>
              <div class="desc">
                <div class="title text-ellipsis-2">2024年后普通程序员千万不能碰的5种编程语言，马士兵一个视频给你讲透！
                </div>
                <div class="info">
                  <el-tag v-if="true" style="padding: 0 5px;margin-right: 5px" size="small" type="warning">已关注
                  </el-tag>
                  <el-icon :size="16" v-else>
                    <svg-icon icon-name="up"/>
                  </el-icon>
                  <span class="nickname">昵称</span>
                  <span> · </span>
                  <span class="date">8-3</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </div>
  <el-backtop :right="10" :bottom="120"/>
</template>

<script setup>
import Affix from "@/components/Affix/index.vue";
import {onMounted, ref} from "vue";
import {getDominantColor} from "@/utils/themeColorUtil.js";

const carouselRef = ref()
const swiperRef = ref()
const swiperHeight = ref("305px")
const headerBackground = ref(new URL("@/assets/images/common/header_background.jpg", import.meta.url).href)
const channelItemHeight = ref("30px")
const channelItemRef = ref()
const isFoldNavBarSticky = ref(true)
const navBarRef = ref()
const isNavBarSticky = ref(false)
const dotList = ref()
const upRotate = ref("-45deg")
const downRotate = ref("45deg")
const swiperInfoBg = ref("#FFFFFF")
const swiperItemRef = ref()
const carouselList = ref([
  {id: 1, src: new URL("./60bcbf732f7a9b437dab216150cb0ab095c85924.jpg", import.meta.url).href},
  {id: 2, src: new URL("./66def6dee8ca65789ec75e136dc1637e2ecaa5f4.jpg", import.meta.url).href},
  {id: 3, src: new URL("./d5a24622740bc4205a29fb3f41ab364a24850016.png", import.meta.url).href},
  {id: 4, src: new URL("./e5b6945ccfc2ba1e58025d5cbee71185c462292b.png", import.meta.url).href},
])

const goPrev = () => {
  carouselRef.value.prev()
}
const goNext = () => {
  carouselRef.value.next()
}
const switchTo = (index) => {
  carouselRef.value.setActiveItem(index)
}
const carouselChange = (current, prev) => {
  getDominantColor(carouselList.value[current].src)
      .then(res => swiperInfoBg.value = res)
  if (current > prev) {
    upRotate.value = "-45deg"
    downRotate.value = "45deg"
    if (current === 9 && prev === 0) {
      upRotate.value = "45deg"
      downRotate.value = "-45deg"
    }
  } else {
    upRotate.value = "45deg"
    downRotate.value = "-45deg"
    if (current === 0 && prev === 9) {
      upRotate.value = "-45deg"
      downRotate.value = "45deg"
    }
  }
  dotList.value.children[prev].classList.remove('is-active')
  dotList.value.children[current].classList.add('is-active')
}
const unfoldChannelItem = () => {
  if (channelItemRef.value) {
    isFoldNavBarSticky.value = false
    channelItemHeight.value = channelItemRef.value.offsetHeight + 'px'
  }
}
const foldChannelItem = () => {
  if (channelItemRef.value) {
    isFoldNavBarSticky.value = true
    channelItemHeight.value = "30px"
  }
}
onMounted(() => {
  // 默认激活的轮播图为第一个
  dotList.value.children[0].classList.add('is-active')
  // 在图片加载完成后读取其高度设置给轮播图
  swiperRef.value.onload = () => {
    swiperHeight.value = swiperRef.value.offsetHeight + 'px'
  }
  // 对第一张轮播图的主题色进行提取并转为16进之后赋给背景
  getDominantColor(carouselList.value[0].src)
      .then(res => swiperInfoBg.value = res)

  window.addEventListener("resize", () => {
    if (swiperRef.value) {
      swiperHeight.value = swiperRef.value.offsetHeight + 'px'
    }
  })
  window.addEventListener('scroll', () => {
    if (navBarRef.value) {
      isNavBarSticky.value = navBarRef.value.getBoundingClientRect().top === 60
    }
  })

})
</script>

<style scoped lang="scss">
.header-background {
  min-width: 1500px;
  max-width: 2040px;
  margin: 0 auto;

  .el-image {
    vertical-align: middle;
    height: 100%;
    width: 100%;
  }
}

.header-cover {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(rgba(0, 0, 0, .4), transparent);
  pointer-events: none;
}

.el-main {
  overflow: visible;
  padding: 0 0 20px 0;
  max-width: 2040px;
  margin: 0 auto;

  .nav-bar-sticky-box {
    background-color: var(--el-bg-color);
    box-shadow: var(--el-box-shadow-lighter);
  }

  .nav-bar {
    display: flex;
    padding: 20px 0;
    background-color: var(--el-bg-color);

    .channel-icon {
      display: flex;
      margin-right: 20px;

      .icon-box {
        margin-right: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .el-button {
          width: 45px;
          height: 45px;
        }

        span {
          margin-top: 5px;
          font-size: 14px;
        }
      }
    }

    .channel-item-left {
      flex: 1;
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      grid-template-columns: repeat(11, 1fr);
      gap: 10px;

      .item {
        cursor: pointer;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 5px 0;
        text-align: center;
        width: 100%;
        color: var(--el-text-color-regular);
        background-color: var(--el-fill-color-light);
        transition: .2s;
      }

      .item:hover {
        color: var(--el-text-color-primary);
        background-color: var(--el-fill-color-dark);
        transition: .2s;
      }
    }

    .channel-item-right {
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 20px;
      grid-row-gap: 10px;

      .item {
        display: flex;
        align-items: center;
        font-size: 14px;

        .el-icon {
          margin-right: 5px;
        }
      }
    }
  }

  .nav-bar-sticky {
    box-sizing: border-box;
    display: flex;
    padding: 20px 0;
    position: relative;

    .channel-icon {
      display: flex;

      .icon-box {
        color: var(--el-text-color-primary);
        font-size: 14px;
        margin-right: 5px;
      }
    }

    .channel-item-box {
      flex: 1;
      height: v-bind(channelItemHeight);
      overflow: hidden;
      transition: .2s;

      .channel-item {
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        grid-template-columns: repeat(13, 1fr);
        gap: 15px 10px;

        .item {
          cursor: pointer;
          box-sizing: border-box;
          border-radius: 5px;
          padding: 5px 0;
          text-align: center;
          width: 100%;
          color: var(--el-text-color-regular);
          background-color: var(--el-fill-color-light);
          transition: .2s;
        }

        .item:hover {
          color: var(--el-text-color-primary);
          background-color: var(--el-fill-color-dark);
          transition: .2s;
        }
      }
    }

    .arrow {
      position: absolute;
      right: -40px;
      margin-left: 10px;
      padding: 10px
    }

    .arrow:hover {
      border-radius: 5px;
      background-color: var(--el-fill-color-dark);
    }
  }

  .main-content {
    display: grid;
    grid-template-columns:repeat(5, 1fr);
    gap: 20px;

    .recommended-swiper {
      position: relative;
      grid-column: 1/3;
      grid-row: 1/3;

      :deep(.el-carousel.el-carousel--horizontal) {
        border-radius: 5px 5px 0 0;
      }

      :deep(.el-carousel__item) {
        border-radius: 5px 5px 0 0;
      }

      .swiper-item {
        .el-image {
          border-radius: 5px 5px 0 0;
          width: 100%;
        }
      }

      .item-info {
        position: relative;

        .mask {
          border-radius: 0 0 5px 5px;
          z-index: 1;
          width: 100%;
          height: 950px;
          position: absolute;
          left: 0;
          bottom: 0;
          background-image: linear-gradient(0, v-bind(swiperInfoBg) 11%, transparent 20%);
        }

        .info {
          box-sizing: border-box;
          border-radius: 0 0 5px 5px;
          padding: 20px 10px 20px 10px;
          position: relative;
          z-index: 2;

          .title {
            position: relative;
            color: var(--el-color-white);
            display: flex;
            align-items: center;
            justify-content: space-between;


            .text {
              font-size: 18px;
              font-weight: 500;
            }

            .operation {
              min-width: 90px;

              .arrow {
                cursor: pointer;
                margin-right: 15px;
                border-radius: 10px;
                width: 30px;
                height: 30px;
                background-color: rgba(255, 255, 255, .1);
              }

              .arrow:hover {
                background-color: rgba(255, 255, 255, .2);
              }
            }
          }

          .carousel-dots {
            margin-top: 8px;
            position: relative;

            .dot-list {
              display: flex;
              align-items: center;
              @keyframes eat-haha-up {
                0% {
                  transform: rotate(0)
                }

                25% {
                  transform: rotate(v-bind(upRotate))
                }

                50% {
                  transform: rotate(0)
                }

                75% {
                  transform: rotate(v-bind(upRotate))
                }

                to {
                  transform: rotate(0)
                }
              }

              @keyframes eat-haha-down {
                0% {
                  transform: rotate(0)
                }

                25% {
                  transform: rotate(v-bind(downRotate))
                }

                50% {
                  transform: rotate(0)
                }

                75% {
                  transform: rotate(v-bind(downRotate))
                }

                to {
                  transform: rotate(0)
                }
              }

              .dot {
                position: relative;
                display: inline-block;
                width: 10px;
                height: 10px;
                margin: 5px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, .4);
                overflow: hidden;
                cursor: pointer
              }

              .dot.is-active {
                width: 15px;
                height: 15px;
                margin: 2px;
                background-color: transparent;

                .before {
                  position: absolute;
                  top: 0;
                  width: 15px;
                  height: 8px;
                  background-color: var(--el-color-white);
                  border-radius: 8px 8px 0 0;
                  animation: eat-haha-up .8s;
                  transform-origin: center bottom
                }

                .before:after {
                  content: "";
                  position: absolute;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  width: 100%;
                  height: 2px;
                  background-color: var(--el-color-white);
                }

                .after {
                  position: absolute;
                  bottom: 0;
                  width: 15px;
                  height: 8px;
                  background-color: var(--el-color-white);
                  border-radius: 0 0 8px 8px;
                  animation: eat-haha-down .8s;
                  transform-origin: center top
                }

                .after:before {
                  content: "";
                  position: absolute;
                  left: 0;
                  right: 0;
                  top: 0;
                  width: 100%;
                  height: 2px;
                  background-color: var(--el-color-white);
                }

              }
            }
          }

        }

      }
    }

    .item {
      border-radius: 5px;
      position: relative;

      .cover {
        position: relative;

        .el-image {
          width: 100%;
          height: 100%;
          min-height: 145px;
          min-width: 260px;
          border-radius: 5px;
        }

        .mask {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: absolute;
          bottom: 0;
          left: 0;
          box-sizing: border-box;
          padding: 15px 10px 5px;
          width: 100%;
          border-bottom-right-radius: 5px;
          border-bottom-left-radius: 5px;
          background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .8) 100%);
          font-size: 12px;
          line-height: 1.5;
          color: var(--el-bg-color);

          .left-part {
            display: flex;
            align-items: center;

            span {
              display: flex;
              align-items: center;
              margin-right: 10px;

              .el-icon {
                margin-right: 5px;
              }
            }
          }
        }
      }

      .desc {
        margin-top: 10px;

        .title {
          line-height: 1.5;
          font-size: 16px;
          font-weight: 500;
          padding-right: 30px;
        }

        .info {
          display: flex;
          align-items: center;
          margin-top: 5px;
          font-size: 14px;
          color: var(--el-text-color-secondary);

          .el-icon {
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>