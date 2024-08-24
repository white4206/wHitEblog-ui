<template>
  <el-main style="overflow: visible">
    <el-row justify="center">
      <el-col :span="22" :xs="19" :sm="20" :md="21" :lg="22" :xl="23">
        <el-row :gutter="10">
          <el-col :span="18" justify="center">
            <el-card class="resource-card">
              <template #header>
                <el-breadcrumb :separator-icon="ArrowRight">
                  <el-breadcrumb-item :to="{path: '/resource' }">
                    <el-link>下载资源</el-link>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item :to="{path:'/resource',query:{direction:3,category:1}}">
                    <el-link>后端</el-link>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item :to="{path:'/resource',query:{direction:3,category:5}}">
                    <el-link>C</el-link>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item>
                    JavaScript
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </template>
              <div class="resource-content">
                <div class="header-info">
                  <div class="left-part">
                    <div class="title"><h2>基于stm32f407的示波器+FFT频谱分析</h2></div>
                    <div class="tag">
                      <el-tag>stm32f407</el-tag>
                      <el-tag>emwin</el-tag>
                      <el-tag>FFT</el-tag>
                    </div>
                    <div class="info">
                      <span>{{ 5.5 + 'k' }} 浏览量</span>
                      <span>{{ '2022-06-01' }} 上传</span>
                      <span><el-link type="info">评论</el-link></span>
                      <span>
                      <el-link type="info">
                        {{ 45 }}
                        <el-icon :size="16">
                          <Star/>
                        </el-icon>
                        收藏
                      </el-link>
                    </span>
                      <span>{{ 20.32 }}MB</span>
                      <span>ZIP</span>
                    </div>
                    <div class="download">
                      <el-button type="primary" size="large" round>立即下载</el-button>
                    </div>
                  </div>
                  <div class="right-part">
                    <div class="info">
                      <span style="margin-bottom: 10px">共{{ 496 }}个文件</span>
                      <span>h: {{ 179 }}个</span>
                      <span>c: {{ 104 }}个</span>
                      <span>o: {{ 56 }}个</span>
                    </div>
                    <div class="bg">
                      <img class="logo" src="/public/favicon.ico" alt=""/>
                      <div class="bar-box">
                        <div style="width: 70%" class="bar"></div>
                      </div>
                      <div class="bar-box">
                        <div style="width: 40%" class="bar"></div>
                        <div style="width: 40%" class="bar"></div>
                      </div>
                      <div class="bar-box">
                        <div style="width: 70%" class="bar"></div>
                        <div style="width: 20%" class="bar"></div>
                      </div>
                      <div class="bar-box">
                        <div style="width: 30%" class="bar"></div>
                        <div style="width: 30%" class="bar"></div>
                        <div style="width: 30%" class="bar"></div>
                      </div>
                      <div class="bar-box">
                        <div style="width: 60%" class="bar"></div>
                      </div>
                      <div class="bar-box">
                        <div style="width: 20%" class="bar"></div>
                      </div>
                      <div class="bar-box">
                        <div style="width: 80%" class="bar"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="description">
                  <div class="box">
                    <div class="text" ref="descriptionTextRef">
                      STM32F407是一款高性能的ARM
                      Cortex-M4微控制器，由意法半导体公司（STMicroelectronics）生产。在本项目中，该芯片被用于构建一个具备示波器功能和FFT频谱分析的设备。以下是对这个项目的详细解读：

                      1.
                      **STM32F407核心特性**：这款MCU拥有32位浮点单元（FPU），能够快速执行数学运算，这对于FFT（快速傅里叶变换）等复杂算法至关重要。它还配备了高速的嵌入式闪存和SRAM，以及丰富的外设接口，如ADC（模拟数字转换器）、DMA（直接内存访问）和定时器。

                      2.
                      **DMA（直接内存访问）**：在这个设计中，DMA被用来无CPU干预地将ADC转换的数据传输到内存缓冲区。这样，CPU可以处理其他任务，提高了系统的效率和响应速度。STM32F407有多个DMA通道，每个通道可以独立配置以服务不同的外设。

                      3.
                      **ADC（模拟数字转换器）**：ADC负责将输入的模拟信号转换为数字值，以便于数字系统处理。通过配置定时器来触发ADC转换，可以实现可调的采样率。更高的采样率意味着更精细的时间分辨率，但也会增加系统负荷。

                      4. **定时器**：在这个应用中，定时器不仅用于触发ADC转换，还能控制采样率。通过调整定时器的预分频器和计数器值，可以灵活地设置采样周期，从而达到所需的最大2.8MHz采样率。

                      5.
                      **FFT（快速傅里叶变换）**：FFT是一种计算离散傅里叶变换的高效算法，它可以将时域信号转化为频域表示，便于分析信号的频率成分。在示波器和频谱分析中，FFT是不可或缺的部分。STM32F407的FPU加速了这一计算过程。

                      6.
                      **EMWIN图形库**：EMWIN是德国GUI（图形用户界面）库，用于在嵌入式系统上创建图形界面。在这个项目中，EMWIN被用来绘制时域和频域图像。它可以显示实时数据，帮助用户直观地理解信号的变化。

                      7.
                      **代码结构**：项目提供的"stm32f407示波器代码"可能包含了初始化设置、ADC采样、DMA传输、FFT计算以及EMWIN图形界面的相关函数和配置。代码可能包括了主循环、中断服务程序以及特定外设的配置代码。

                      这个项目展示了如何充分利用STM32F407的性能来实现一个功能强大的示波器和频谱分析仪，结合DMA、ADC、定时器、FFT和图形库，提供了一种高效且直观的信号分析工具。对于嵌入式系统开发者来说，这是一个很好的学习案例，涉及到的知识点涵盖了微控制器编程、实时数据处理和图形界面设计等多个方面
                    </div>
                  </div>
                  <div v-if="isFoldDescription" @click="foldDescription" class="fold-btn">
                    <span>展开</span>
                    <el-icon>
                      <ArrowDown/>
                    </el-icon>
                  </div>
                  <div v-else @click="foldDescription" class="fold-btn">
                    <span>收起</span>
                    <el-icon>
                      <ArrowUp/>
                    </el-icon>
                  </div>
                </div>
              </div>
            </el-card>
            <div class="affix-container">
              <Affix :offset="60" :z-index="99">
                <!-- <el-affix :offset="60" target=".affix-container" position="top" z-index="99">-->
                <el-card class="information-card">
                  <el-tabs v-model="activeTab" @tab-click="scrollTo">
                    <el-tab-pane name="detail" label="资源详情"/>
                    <el-tab-pane name="comment" label="资源评论"/>
                  </el-tabs>
                </el-card>
                <!-- </el-affix>-->
              </Affix>
              <el-card class="detail-card">
                <div id="detail" class="detail-content">

                </div>
              </el-card>
              <Affix position="bottom" :offset="0" :z-index="99">
                <!-- <el-affix :offset="0" target=".affix-container" position="bottom" z-index="99">-->
                <el-card class="bottom-card">
                  <div class="bottom-content">
                    <div class="operation">
                      <div class="item" @click="scrollTo({paneName:'comment'})">
                        <el-icon :size="20">
                          <ChatLineSquare/>
                        </el-icon>
                        <span>评论</span>
                      </div>
                      <div class="item">
                        <el-icon :size="20">
                          <Star/>
                        </el-icon>
                        <span>收藏</span>
                      </div>

                    </div>
                    <div class="download">
                      <el-button type="primary" size="large" round>立即下载</el-button>
                    </div>
                  </div>
                </el-card>
                <!-- </el-affix>-->
              </Affix>
            </div>
            <el-card class="comment-card">
              <template #header>
                <span style="font-size: 20px">资源评论</span>
              </template>
              <div id="comment" class="comment-content">
                <el-form>
                  <el-form-item>
                    <template #label>
                      <el-avatar></el-avatar>
                    </template>
                    <el-input type="textarea" resize="none"></el-input>
                  </el-form-item>
                  <div class="operation-btn">
                    <el-icon color="var(--el-text-color-secondary)" :size="22">
                      <SvgIcon icon-name="emoji"/>
                    </el-icon>
                    <el-button style="padding: 0 20px" type="primary" round>评论</el-button>
                  </div>
                </el-form>
                <div class="comment-item" v-for="item in 5">
                  <div class="avatar">
                    <el-avatar></el-avatar>
                  </div>
                  <div style="flex:1;">
                    <div class="info">
                      <span class="nickname">zlp3817</span>
                      <span class="date">2014-12-23</span>
                    </div>
                    <div class="content">对我很有帮助</div>
                  </div>
                </div>
              </div>
              <div style="margin-top: 30px">
                <el-pagination
                    v-if="total"
                    :total="total"
                    background
                    layout="->, total,sizes,prev, pager, next, jumper"
                    :page-sizes="[5,10, 20, 30, 40, 50, 100]"
                    v-model:current-page="currentPage"
                    v-model:page-size="currentSize"
                    @change="pageChange"
                />
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <RightCard :websiteInfoBarRef="websiteInfoBarRef"/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-main>
  <div ref="websiteInfoBarRef">
    <WebsiteInfoBar/>
  </div>
  <el-backtop :right="50" :bottom="120"/>
</template>

<script setup>
import {ArrowRight} from '@element-plus/icons-vue'
import WebsiteInfoBar from "@/components/WebsiteInfoBar/index.vue";
import {ref} from "vue";
import Affix from "@/components/Affix/index.vue";
import RightCard from "@/views/resource/details/components/RightCard.vue";


const descriptionTextRef = ref()
const websiteInfoBarRef = ref()
const currentPage = ref()
const currentSize = ref(5)
const total = ref(10)
const isFoldDescription = ref(true)
const descriptionHeight = ref("63px")
const activeTab = ref('detail')


const pageChange = () => {
  // document.documentElement.scrollTop = 0
  // queryParams.value.pageNum = currentPage.value
  // queryParams.value.pageCount = currentSize.value
  // loading.value = true
  // getData()
}
const foldDescription = () => {
  isFoldDescription.value = !isFoldDescription.value
  if (isFoldDescription.value)
    descriptionHeight.value = "63px"
  else
    descriptionHeight.value = descriptionTextRef.value.offsetHeight + 'px'
}
const scrollTo = (tab) => {
  let el = document.getElementById(tab.paneName)
  el.scrollIntoView({behavior: 'smooth', block: 'start'})
}
</script>

<style scoped lang="scss">
.el-card {
  border: none;
  box-shadow: none;
}

.resource-card {
  margin-bottom: 10px;

  :deep(.el-card__body) {
    padding: 0;
  }

  .resource-content {

    .header-info {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid var(--el-border-color-light);

      .left-part {
        .tag {
          margin-top: 10px;

          .el-tag {
            margin-right: 10px;
          }
        }

        .info {
          margin-top: 10px;
          font-size: 14px;
          color: var(--el-text-color-regular);

          span {
            margin-right: 20px;

            .el-icon {
              padding: 0 2px;
            }
          }
        }

        .download {
          margin-top: 25px;
        }
      }

      .right-part {
        position: relative;

        .info {
          display: flex;
          flex-direction: column;
          font-size: 12px;
          background-image: url("@/assets/images/common/document.png");
          background-repeat: no-repeat;
          background-size: contain;
          width: 120px;
          height: 160px;
          box-sizing: border-box;
          padding: 40px 20px;

          span {
            z-index: 2;
            margin-bottom: 5px;
          }
        }

        .bg {
          margin-top: 70px;
          box-sizing: border-box;
          padding: 30px 20px 0 20px;
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;

          .logo {
            transform: rotate(-30deg);
            width: 80px;
            opacity: .05;
            position: absolute;
            top: -50px;
            right: 20px
          }

          .bar-box {
            display: flex;

            .bar {
              margin: 2px 2px 2px 0;
              height: 3px;
              border-radius: 10px;
              width: 100%;
              background: #f5f7fa;
            }
          }
        }
      }
    }

    .description {
      padding: 20px 20px 50px 20px;
      height: v-bind(descriptionHeight);
      transition: .4s;

      .box {
        max-height: v-bind(descriptionHeight);
        overflow: hidden;
        transition: .4s;

        .text {
          font-size: 14px;
          color: var(--el-text-color-regular);
          line-height: 1.5;
          overflow: hidden;
        }
      }
    }

    .fold-btn {
      cursor: pointer;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: end;
      font-size: 14px;
      color: var(--el-text-color-regular)
    }
  }
}


.information-card {
  border-radius: 4px 4px 0 0;

  :deep(.el-card__body) {
    padding: 0;
  }

  :deep(.el-tab-pane) {
    padding: 0;
  }

  :deep(.el-tabs__header) {
    padding: 10px 20px 0 20px;
    margin-bottom: 0;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }


  :deep(.el-tabs__nav-wrap::after) {
    content: none;
  }

  :deep(.el-tabs__item) {
    color: var(--el-text-color-regular);
    font-size: 14px;
  }

  :deep(.el-tabs__item.is-active) {
    color: var(--el-color-primary);
  }
}

.detail-card {
  margin-bottom: 10px;
  border-radius: 0 0 4px 4px;

  .detail-content {
    min-height: 800px;
    background-color: var(--el-fill-color-light);
    border: 1px dashed var(--el-border-color-darker);
  }
}

.bottom-card {
  margin-bottom: 10px;
  box-shadow: var(--el-box-shadow);

  .bottom-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .operation {
      display: flex;
      align-items: center;

      .item {
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        margin-right: 25px;

        .el-icon {
          margin-right: 5px;
        }
      }
    }

    .download {
      display: flex;
      align-items: center;
    }
  }
}

.comment-card {

  .comment-content {
    .el-form {
      :deep(.el-textarea__inner) {
        background-color: var(--el-fill-color-lighter);
        border: 1px solid var(--el-border-color-lighter);
        box-shadow: none;
      }

      :deep(.el-textarea__inner:focus) {
        outline: none;
        box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset
      }

      .operation-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: end;
      }

      .el-icon {
        margin-right: 15px;
      }
    }

    .comment-item {
      padding: 20px 0;
      display: flex;
      border-bottom: 1px solid var(--el-border-color-lighter);

      .avatar {
        margin-right: 10px;
      }

      .info {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;

        .date {
          font-size: 12px;
          color: var(--el-text-color-secondary);
        }
      }

      .content {
        margin-top: 10px;
      }
    }

    .comment-item:last-child {
      border-bottom: none;
    }
  }
}
</style>