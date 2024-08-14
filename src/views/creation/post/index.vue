<template>
  <el-main>
    <el-row justify="center">
      <el-col :span="18">
        <el-card shadow="never" class="post-card">
          <template #header>
            <div class="card-header">
              <span style="font-weight: bold">创作视频</span>
              <span><el-button size="large" style="font-weight: bold">批量操作</el-button></span>
            </div>
          </template>
          <div class="quote-box">
            <div class="triangle"/>
            <div class="quote">
              <el-radio-group v-model="currentVideo">
                <el-radio-button v-for="item in uploadFiles" :value="item">
                  <div class="upload-item">
                    <div class="title">jojo</div>
                    <div class="status">
                      <el-icon :size="14" color="var(--el-color-success)">
                        <svg-icon icon-name="success"/>
                      </el-icon>
                      <span>上传完成</span>
                    </div>
                    <el-icon v-if="currentVideo===item" class="close">
                      <Close/>
                    </el-icon>
                  </div>
                </el-radio-button>
                <el-radio-button class="add-upload" disabled>
                  <el-upload
                      class="inner-uploader" action="#" :show-file-list="false"
                      :auto-upload="false" :on-change="uploadChange" multiple
                  >
                    <div class="upload-tips">
                      <el-icon>
                        <Plus/>
                      </el-icon>
                      <span>添加视频</span>
                    </div>
                  </el-upload>
                </el-radio-button>
              </el-radio-group>
              <div class="progress-info">
                <el-image src="/src/assets/images/fileType/video.png"/>
                <div class="info">
                  <div class="header">
                    <div class="left-part">
                      <div class="title">jojo</div>
                      <div class="success-text">
                        <el-icon :size="16" color="var(--el-color-success)">
                          <svg-icon icon-name="success"/>
                        </el-icon>
                        <span>上传完成</span>
                      </div>
                    </div>
                    <div class="right-part">
                      <el-button type="primary" size="large" link>
                        <el-icon :size="22">
                          <svg-icon icon-name="refresh"/>
                        </el-icon>
                        <span>更换视频</span>
                      </el-button>
                    </div>
                  </div>
                  <el-progress :percentage="100" status="success" :show-text="false"/>
                </div>
              </div>
            </div>
          </div>
          <div class="basic-setting">
            <h4>基本设置</h4>
            <el-form>
              <el-form-item label="封面" props="cover">
              </el-form-item>
              <el-form-item label="标题" props="cover">
              </el-form-item>
              <el-form-item label="类型" props="cover">
              </el-form-item>
              <el-form-item label="分区" props="cover">
              </el-form-item>
              <el-form-item label="标签" props="cover">
              </el-form-item>
              <el-form-item label="简介" props="cover">
              </el-form-item>
              <el-form-item label="定时发布" props="cover">
              </el-form-item>
              <el-form-item label="标签" props="cover">
              </el-form-item>
            </el-form>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="视频投稿" name="video">
              <el-upload
                  class="uploader" drag action="#" :show-file-list="false" :limit="100"
                  :auto-upload="false" :on-change="uploadChange" multiple
              >
                <div class="upload-tips">
                  <el-icon :size="40">
                    <Upload/>
                  </el-icon>
                  <span class="text">拖拽到此处也可上传</span>
                  <el-button style="padding:20px 65px;" type="primary" size="large">上传视频</el-button>
                </div>
              </el-upload>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script setup>
import {computed, ref} from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

const uploadFiles = ref(1)
const currentVideo = ref(1)
const activeTab = ref('video')

const videoItemWidth = computed(() => {
  if (uploadFiles.value <= 4)
    return '200px'
  else if (uploadFiles.value < 9)
    return "calc(" + (100 / (uploadFiles.value + 1)) + "% - 10px)"
  else
    return "calc(" + (100 / uploadFiles.value) + "% - 10px)"
})
const uploadChange = (rawFile, rawFileList) => {
  if (rawFileList.length > 1) {
    rawFileList.splice(0, 1);
  }
}
</script>

<style scoped lang="scss">
.post-card {
  min-height: calc(100vh - 110px);

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .quote-box {
    position: relative;

    .triangle {
      position: absolute;
      top: -10px;
      left: 50px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 10px 10px 10px;
      border-color: transparent transparent var(--el-fill-color-light) transparent;
    }

    .quote {
      border-radius: 10px;
      margin: 25px 30px;
      padding: 20px 10px;
      background-color: var(--el-fill-color-light);


      .el-radio-group {
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        .upload-item {
          position: relative;

          .title {
            text-align: left;
            font-size: 14px;
            margin-bottom: 10px;
          }

          .status {
            display: flex;
            align-items: center;
            font-size: 10px;

            .el-icon {
              margin-right: 2px;
            }
          }

          .close {
            position: absolute;
            top: 0;
            right: 0;
          }
        }

        .el-radio-button {
          height: 60px;
          width: v-bind(videoItemWidth);
          margin-right: 10px;
          margin-bottom: 10px;

          :deep(.el-radio-button__inner) {
            background-color: var(--el-bg-color);
            color: var(--el-text-color-primary);
            border: none;
            height: 100%;
            width: 100%;
            min-width: 100px;
            max-width: 200px;
            border-radius: 10px;
            padding: 10px;
          }

          .inner-uploader {
            width: 100%;

            .upload-tips {
              display: flex;
              align-items: center;
              flex-direction: column;

              .el-icon {
                margin-bottom: 10px;
              }
            }
          }
        }

        .add-upload {
          width: 100px;

          :deep(.el-radio-button__inner) {
            padding: 0;
            cursor: pointer;
          }

          .inner-uploader {
            width: 100%;
            height: 100%;

            :deep(.el-upload) {
              width: 100%;
              height: 100%;

              .upload-tips {
                color: var(--el-text-color-regular);
                font-size: 12px;
              }
            }
          }
        }

        :deep(.el-radio-button__inner:hover) {
          color: var(--el-text-color-primary);
        }

        :deep(.el-radio-button.is-active .el-radio-button__original-radio:not(:disabled) + .el-radio-button__inner) {
          color: var(--el-bg-color);
          background-color: var(--el-color-primary);

          .status {
            .el-icon {
              color: var(--el-color-primary-light-7);
            }
          }
        }
      }

      .progress-info {
        display: flex;
        align-items: center;
        margin-top: 10px;
        width: 80%;

        .el-image {
          height: 40px;
          width: 40px;
          margin-right: 10px;
        }

        .info {
          flex: 1;

          .header {
            display: flex;
            align-items: end;
            margin-bottom: 5px;

            .left-part {
              flex: 1;

              .title {
                font-size: 14px;
                margin-bottom: 5px;
              }

              .success-text {
                display: flex;
                align-items: center;
                font-size: 10px;
                color: var(--el-text-color-placeholder);

                .el-icon {
                  margin-right: 5px;
                }
              }
            }

            .right-part {
              margin-bottom: 5px;
            }
          }
        }
      }
    }
  }

  .basic-setting {
    padding: 20px;
  }

  :deep(.el-card__body) {
    padding: 0;
  }

  :deep(.el-tab-pane) {
    padding: 0 20px 20px 20px;
  }

  :deep(.el-tabs__header) {
    padding: 10px 20px 0 20px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  :deep(.el-tabs__nav-wrap::after) {
    content: none;
  }

  :deep(.el-tabs__item) {
    color: var(--el-text-color-regular);
    font-size: 16px;
  }

  :deep(.el-tabs__item.is-active) {
    color: var(--el-color-primary);
    font-weight: bold;
  }

  .uploader {
    margin: 0 135px;

    :deep(.el-upload-dragger) {
      border: 2px dashed var(--el-border-color-darker);
    }

    //:deep(.el-upload-dragger:hover) {
    //  border-color: var(--el-color-primary);
    //}

    .upload-tips {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 12px;
      color: var(--el-text-color-placeholder);

      .text {
        margin: 20px 0;
      }
    }

    .upload-file {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;

      .el-image {
        width: 40px;
        height: 40px;
      }

      .title {
        color: var(--el-text-color-primary);
        margin-right: 10px;
        margin-left: 5px;
        max-width: 200px;
      }
    }
  }

}
</style>