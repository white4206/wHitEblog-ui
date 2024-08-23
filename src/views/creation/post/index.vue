<template>
  <el-main>
    <el-row justify="center">
      <el-col :span="18">
        <el-card shadow="never" class="post-card">
          <el-tabs v-if="!uploadFiles.length" v-model="activeTab">
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
          <template #header v-if="uploadFiles.length">
            <div class="card-header">
              <span style="font-weight: bold">创作视频</span>
              <span><el-button size="large" style="font-weight: bold"
                               @click="batchEditor=true">批量操作</el-button></span>
            </div>
          </template>
          <template v-if="uploadFiles.length">
            <div class="quote-box">
              <div class="triangle"/>
              <div class="quote">
                <el-radio-group v-model="currentVideo">
                  <el-radio-button v-for="(item,index) in uploadFiles" :value="index">
                    <div class="upload-item">
                      <div class="title text-ellipsis-1">{{ item.file.name }}</div>
                      <div class="status">
                        <el-icon :size="14" color="var(--el-color-success)">
                          <SvgIcon icon-name="success"/>
                        </el-icon>
                        <span>上传完成</span>
                      </div>
                      <el-icon v-if="currentVideo===index" class="close">
                        <Close/>
                      </el-icon>
                    </div>
                  </el-radio-button>
                  <el-radio-button class="add-upload" disabled value="add">
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
                  <img src="@/assets/images/fileType/video.png"/>
                  <div class="info">
                    <div class="header">
                      <div class="left-part">
                        <div class="title text-ellipsis-1">{{ uploadFiles[currentVideo].file.name }}</div>
                        <div class="success-text">
                          <el-icon :size="16" color="var(--el-color-success)">
                            <SvgIcon icon-name="success"/>
                          </el-icon>
                          <span>上传完成</span>
                        </div>
                      </div>
                      <div class="right-part">
                        <el-button type="primary" size="large" link>
                          <el-icon :size="22">
                            <SvgIcon icon-name="refresh"/>
                          </el-icon>
                          <span>更换视频</span>
                        </el-button>
                      </div>
                    </div>
                    <el-progress :stroke-width="3" :percentage="100" status="success" :show-text="false"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="basic-setting">
              <el-form
                  :model="settingForm" ref="settingRef" :rules="settingRules"
                  size="large" label-width="120px" label-position="left"
                  style="width: 80%" require-asterisk-position="right">
                <el-form-item>
                  <template #label>
                    <span style="font-size:16px;font-weight: bold;color: var(--el-text-color-primary)">基本设置</span>
                  </template>
                  <el-button size="small" style="font-size: 12px;padding: 15px 20px" @click="onePressEditor=true">
                    一键填写
                  </el-button>
                </el-form-item>
                <el-form-item class="custom-cover-item" label="封面" prop="cover">
                  <div class="cover">
                    <img class="cover-viewer" src="./微信图片_20230614183118.png" alt="">
                    <div class="cover-upload-mask-btn">
                      <span @click="editCover=true">更改封面</span>
                      <el-divider direction="vertical"/>
                      <span @click="editCoverTemplate=true">封面模版</span>
                    </div>
                  </div>
                  <div class="cover-list">
                    <el-radio-group v-model="cover">
                      <el-radio-button v-for="item in 4" :value="item">
                        <img class="covers" src="./微信图片_20230614183118.png" alt="">
                        <div class="cover-mask">
                          <el-icon :size="20" color="var(--el-color-primary)">
                            <Check/>
                          </el-icon>
                        </div>
                      </el-radio-button>
                    </el-radio-group>
                  </div>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                  <el-input
                      v-model="settingForm.title" show-word-limit :maxlength="80"
                      placeholder="【作者名/节目名】+《游戏名》+主要标题+期号"/>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                  <el-radio-group v-model="settingForm.type">
                    <el-radio label="自制" value="self"/>
                    <el-radio label="转载" value="share"/>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="分区" prop="category">
                  <el-cascader v-model="settingForm.category" placeholder="请选择分区"></el-cascader>
                </el-form-item>
                <el-form-item label="标签" prop="tags">
                  <template #label>
                    <div class="flex-vertical">
                      <span style="margin-right: 5px">标签</span>
                      <el-icon color="var(--el-text-color-secondary)">
                        <InfoFilled/>
                      </el-icon>
                    </div>
                  </template>
                  <el-input
                      v-model="tagValue" placeholder="按回车键Enter创建标签" collapse-tags
                      filterable :allow-create="true" :max-collapse-tags="20" multiple
                      @keydown.enter="createTag" @blur="tagValue=null"
                  >
                    <template #prefix>
                      <el-tag
                          size="large" type="primary" effect="dark" closable v-for="(item,index) in settingForm.tags"
                          @close="(argument)=>removeTag(argument,index)" style="margin-right: 5px">
                        {{ item }}
                      </el-tag>
                    </template>
                    <template #suffix>还可以添加{{ 10 - settingForm.tags.length }}个标签</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="简介" prop="description">
                  <el-input
                      v-model="settingForm.description" maxlength="2000"
                      type="textarea" :rows="8" placeholder="填写更全面的相关信息，让更多的人能找到你的视频吧(:"/>
                </el-form-item>
                <el-form-item label="定时发布" prop="setTimeout">
                  <el-switch size="default" v-model="settingForm.setTimeout"/>
                  <span class="timeout-tips">
                  (可选择距离当前最早≥2小时/最晚≤15天的时间，距发布不足5分钟时不可修改/取消)
                </span>
                </el-form-item>
                <div class="more-setting">
              <span style="font-size:16px;font-weight: bold;color: var(--el-text-color-primary);margin-right: 5px">
                更多设置
              </span>
                  <span style="font-size:14px;font-weight: bold;color: var(--el-text-color-secondary)">
                （含声明与权益、视频元素、互动管理等）
              </span>
                  <el-icon :size="14" color="var(--el-text-color-placeholder)">
                    <ArrowDown/>
                  </el-icon>
                </div>
                <el-form-item prop="setTimeout">
                  <el-button style="padding:10px 40px">存草稿</el-button>
                  <el-button style="padding:10px 40px" type="primary">立即投稿</el-button>
                </el-form-item>
              </el-form>
            </div>
          </template>

          <el-dialog class="batch-dialog" v-model="batchEditor" width="650px" :show-close="false"
                     :close-on-click-modal="false" :close-on-press-escape="false">
            <div class="header">
              <span>批量操作</span>
              <el-icon>
                <InfoFilled/>
              </el-icon>
            </div>
            <el-form size="large">
              <el-form-item label="视频类型" prop="type">
                <el-radio-group v-model="settingForm.type">
                  <el-radio label="自制" value="self"/>
                  <el-radio label="转载" value="share"/>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="选择分区" prop="category">
                <el-cascader v-model="settingForm.category" placeholder="请选择分区"></el-cascader>
              </el-form-item>
              <el-form-item label="输入标签" prop="tags">
                <el-input
                    v-model="tagValue" placeholder="按回车键Enter创建标签" collapse-tags
                    filterable :allow-create="true" :max-collapse-tags="20" multiple
                    @keydown.enter="createTag" @blur="tagValue=null"
                >
                  <template #prefix>
                    <el-tag
                        size="large" type="primary" effect="dark" closable v-for="(item,index) in settingForm.tags"
                        @close="(argument)=>removeTag(argument,index)" style="margin-right: 5px">
                      {{ item }}
                    </el-tag>
                  </template>
                  <template #suffix>{{ settingForm.tags.length + "/" + 10 }}</template>
                </el-input>
              </el-form-item>
              <el-form-item class="operation-btn">
                <el-button size="default" type="primary">确定</el-button>
                <el-button size="default" @click="batchEditor=false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

          <el-dialog class="one-press-dialog" v-model="onePressEditor" width="800px" :close-on-press-escape="false"
                     :close-on-click-modal="false">
            <div class="header">
              <span>一键填写</span>
              <el-icon>
                <InfoFilled/>
              </el-icon>
            </div>
            <div style="padding: 20px">

            </div>
          </el-dialog>

          <el-dialog class="cover-dialog" v-model="editCover" width="800px" :close-on-press-escape="false"
                     :close-on-click-modal="false">
            <el-tabs v-model="activeCoverTab">
              <el-tab-pane label="截取封面" name="screenshot"></el-tab-pane>
              <el-tab-pane label="上传封面" name="upload"></el-tab-pane>
            </el-tabs>
            <template #footer>
              <el-button size="large" style="width: 130px">使用封面模板</el-button>
              <el-button size="large" style="width: 130px" type="primary">完成</el-button>
            </template>
          </el-dialog>

          <el-dialog class="cover-template-dialog" v-model="editCoverTemplate" width="800px"
                     :close-on-press-escape="false"
                     :close-on-click-modal="false">
            <div class="header">
              <span>封面制作</span>
            </div>
            <div style="padding: 20px">

            </div>
          </el-dialog>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script setup>
import {computed, ref} from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import {ElMessage} from "element-plus";

const onePressEditor = ref(false)
const batchEditor = ref(false)
const editCover = ref(false)
const editCoverTemplate = ref(false)
const cover = ref()
const tagValue = ref()
const settingRef = ref()
const settingForm = ref({
  cover: null,
  title: null,
  type: "self",
  category: null,
  tags: [],
  description: null,
  setTimeout: false
})
const settingRules = ref({
  cover: [{trigger: "blur", message: "请选择封面图片", required: true}],
  title: [{trigger: "blur", message: "请输入标题文字", required: true,}],
  type: [{trigger: "blur", message: "请选择视频类型", required: true,}],
  category: [{trigger: "blur", message: "请选择视频分区", required: true,}],
  tags: [{trigger: "blur", message: "请添加至少添加一个标签", required: true,}],
})
const uploadFiles = ref([])
const currentVideo = ref(0)
const activeTab = ref('video')
const activeCoverTab = ref('screenshot')

const createTag = () => {
  settingForm.value.tags.push(tagValue.value)
  tagValue.value = null
}
const removeTag = (argument, index) => {
  settingForm.value.tags.splice(index, 1)
}
const videoItemWidth = computed(() => {
  if (uploadFiles.value.length <= 4)
    return '200px'
  else if (uploadFiles.value.length < 9)
    return "calc(" + (100 / (uploadFiles.value.length + 1)) + "% - 10px)"
  else
    return "calc(" + (100 / uploadFiles.value.length) + "% - 10px)"
})
const uploadChange = (rawFile, rawFileList) => {
  if (rawFileList.length > 1) {
    rawFileList.splice(0, 1);
  }
  if (rawFile.raw.size / 1024 / 1024 / 1024 > 1) {
    ElMessage.warning(rawFile.raw.name)
    ElMessage.error("单个视频大小超出限制")
  } else {
    uploadFiles.value.push({file: rawFile})
  }
}
</script>

<style scoped lang="scss">
.post-card {
  min-height: calc(100vh - 110px);

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
    font-weight: 700;
  }

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
            line-height: 1.5;
            margin-right: 15px;
            text-align: left;
            font-size: 14px;
            margin-bottom: 5px;
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
          height: 64px;
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

        img {
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


    .custom-cover-item {
      :deep(.el-form-item__label) {
        align-self: center;
      }

      .cover-list {
        margin-left: 35px;
        flex: 1;

        .el-radio-group {
          display: flex;
          justify-content: space-between;

          .el-radio-button {
            width: 120px;
            height: 90px;

            :deep(.el-radio-button__inner) {
              border: 2px solid transparent;
              box-shadow: none;
              border-radius: 5px;
              width: 100%;
              height: 100%;
              position: relative;
              padding: 0;

              .covers {
                border-radius: 5px;
                width: 100%;
                height: 100%;
              }

              .cover-mask {
                border-radius: 5px;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, .5);
                display: none;
                align-items: center;
                justify-content: center;
              }
            }

            :deep(.el-radio-button__inner:hover) {
              border-color: var(--el-radio-button-checked-border-color, var(--el-color-primary));
            }
          }

          :deep(.el-radio-button.is-active .el-radio-button__original-radio:not(:disabled) + .el-radio-button__inner) {
            border-color: var(--el-radio-button-checked-border-color, var(--el-color-primary));

            .cover-mask {
              display: flex;
            }
          }
        }
      }

      .cover {
        border-radius: 5px;
        position: relative;
        height: 130px;
        width: 170px;

        .cover-viewer {
          border-radius: 5px;
          height: 130px;
          width: 170px;
        }

        .cover-upload-mask-btn {
          display: flex;
          opacity: .8;
          position: absolute;
          bottom: 0;
          align-items: center;
          font-size: 12px;
          color: var(--el-color-white);
          justify-content: center;
          text-align: center;
          width: 100%;
          border-radius: 0 0 5px 5px;
          z-index: 1;
          background: rgba(0, 0, 0, .7);
          cursor: pointer;
          padding: 5px 0;
          box-sizing: border-box;
          height: 30px;
        }
      }
    }

    .timeout-tips {
      font-size: 14px;
      margin-left: 10px;
      color: var(--el-text-color-regular);
    }

    .more-setting {
      margin-bottom: 60px;
    }
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

      img {
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

  :deep(.batch-dialog.el-dialog) {
    border-radius: 10px;
    padding: 25px 40px;

    .el-dialog__header {
      padding: 0;
    }

    .header {
      display: flex;
      align-items: center;
      font-size: 16px;
      margin-bottom: 10px;

      .el-icon {
        margin-left: 5px;
      }
    }

    .el-form {
      .el-form-item__label {
        font-weight: bold;
      }

      .operation-btn {
        margin-top: 40px;
        margin-bottom: 0;

        .el-form-item__content {
          justify-content: center;
        }
      }
    }
  }

  :deep(.one-press-dialog.el-dialog) {
    border-radius: 10px;
    padding: 0;

    .el-dialog__header {
      padding: 0;
    }

    .header {
      padding: 20px 30px;
      display: flex;
      align-items: center;
      font-size: 16px;
      margin-bottom: 10px;
      border-bottom: 1px solid var(--el-border-color-lighter);

      .el-icon {
        margin-left: 5px;
      }
    }
  }

  :deep(.cover-dialog.el-dialog) {
    border-radius: 10px;
    padding: 0;

    .el-dialog__header {
      padding: 0;

      .el-dialog__headerbtn {
        z-index: 1;
      }
    }

    .el-dialog__body {
      .el-tabs__item {
        color: var(--el-text-color-regular);
        font-size: 16px;
      }

      .el-tabs__item.is-active {
        color: var(--el-color-primary);
        font-weight: 500;
      }
    }

    .el-dialog__footer {
      padding: 20px;
      text-align: center;
    }
  }

  :deep(.cover-template-dialog.el-dialog) {
    border-radius: 10px;
    padding: 0;

    .el-dialog__header {
      padding: 0;
    }

    .header {
      padding: 20px;
      display: flex;
      align-items: center;
      font-size: 16px;
      margin-bottom: 10px;
      border-bottom: 1px solid var(--el-border-color-lighter);
    }
  }
}
</style>