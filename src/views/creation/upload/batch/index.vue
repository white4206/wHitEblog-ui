<template>
  <el-main style="overflow: visible">
    <el-row justify="center">
      <el-col :span="18" :xs="17" :sm="18" :md="19" :lg="20" :xl="21">
        <el-row :gutter="10" justify="center">
          <el-col :span="18">
            <el-card class="upload-card" body-style="padding:40px 75px;">
              <div class="header">
                <h4>上传资源</h4>
              </div>
              <el-upload
                  class="uploader" drag action="#" :show-file-list="false" :limit="100"
                  :auto-upload="false" :on-change="uploadChange" multiple v-if="!uploadForm.uploadFiles.length"
              >
                <div
                    class="el-upload__text"
                    style="display: flex;align-items: center;
                          justify-content: center;color:var(--el-text-color-primary);
                          margin-bottom: 10px;"
                >
                  <el-icon style="margin-right: 15px">
                    <FolderAdd/>
                  </el-icon>
                  <span><b style="margin-right: 5px">将文件拖到此处，或</b></span>
                  <el-link type="primary" :underline="false">点击上传</el-link>
                </div>
                <div class="upload-tips">
                  <span>支持单词批量上传100个文件，单个文件小于250MB</span>
                </div>
              </el-upload>

              <el-table
                  style="margin-top: 15px" ref="tableRef"
                  :data="uploadForm.uploadFiles" v-else
              >
                <el-table-column type="selection" width="30"/>
                <el-table-column>
                  <template #header>
                    <div style="display: flex;justify-content: space-between">
                      <span style="color: var(--el-text-color-primary);font-weight: normal">资源名称</span>
                      <el-button link type="primary" @click="tableRef.toggleAllSelection()">
                        {{ tableRef.getSelectionRows().length === uploadForm.uploadFiles.length ? '取消选中' : '全选' }}
                      </el-button>
                    </div>
                  </template>
                  <template #default="scope">
                    <div class="upload-item">
                      <div class="info">
                        <el-image src="/src/assets/images/fileType/image.png"/>
                        <div class="title text-ellipsis-1">{{ scope.row.file.name }}</div>
                      </div>
                      <div class="operation">
                        <el-button link style="margin-right: 10px" @click="scope.row.isEdit=!scope.row.isEdit">
                          {{ scope.row.isEdit ? '收起' : '编辑' }}
                        </el-button>
                        <el-icon :size="16" color="var(--el-text-color-secondary)">
                          <CircleCloseFilled/>
                        </el-icon>
                      </div>
                    </div>
                    <el-collapse-transition>
                      <div v-show="scope.row.isEdit" class="upload-form">
                        <el-form :model="uploadForm" ref="uploadRef" :rules="uploadRules" label-width="90px">
                          <el-form-item label="资源名称" prop="name">
                            <el-input
                                style="flex:1;"
                                type="textarea" :rows="1" placeholder="推荐格式：知识领域+技术关键词+用途"
                                :maxlength="64" show-word-limit v-model="uploadForm.name" resize="none"/>
                          </el-form-item>
                          <el-form-item label="资源描述" prop="description">
                            <el-input
                                style="flex:1;"
                                type="textarea" :rows="2"
                                placeholder="推荐格式：内容概要+适用人群+使用场景及目标+其他说明"
                                :maxlength="500" show-word-limit v-model="uploadForm.description"/>
                          </el-form-item>
                          <el-form-item label="资源标签" prop="tag">
                            <div>
                              <div class="add-tag-select">
                                <el-tag style="margin-right: 10px" v-for="item in addTagList" size="large" type="info"
                                        closable>
                                  {{ item.name }}
                                </el-tag>
                                <el-select
                                    v-model="uploadForm.tag" multiple :multiple-limit="1" ref="addTagSelectRef"
                                    filterable allow-create remote reserve-keyword placeholder=""
                                    v-show="isAddTag" :remote-method="remoteMethod" :loading="loading"
                                    style="width: 150px;margin-right: 10px" @blur="addTagBlur" @change="addTagChange"
                                >
                                  <el-option
                                      v-for="item in tagOptions" :key="item.value"
                                      :label="item.label" :value="item.value"
                                  />
                                </el-select>
                                <el-button style="font-size: 12px;margin-right:10px"
                                           v-if="!isAddTag && addTagList.length<5"
                                           @click="addTag">
                                  <el-icon>
                                    <Plus/>
                                  </el-icon>
                                  添加标签
                                </el-button>
                                <span class="tips" v-if="addTagList.length<5">按回车Enter创建标签</span>
                              </div>
                              <div style="margin-top: 5px">
                                <span class="tips">可修改或添加标签，最多可添加5个标签</span>
                              </div>
                            </div>
                          </el-form-item>
                          <el-form-item label="所属分类" prop="category" style="align-items: center">
                            <el-cascader style="width: 100%" size="large" v-model="uploadForm.category" clearable/>
                          </el-form-item>
                        </el-form>
                      </div>
                    </el-collapse-transition>
                  </template>
                </el-table-column>
              </el-table>

              <el-dialog v-model="isBatchEdit" width="750" :show-close="false">
                <template #header>
                  <div class="dialog-header">
                    <div><span style="font-weight: bold;font-size: 14px">批量修改</span></div>
                    <div>
                      <span>修改将应用于</span>
                      <span class="num">{{ uploadForm.uploadFiles.length }}</span>
                      <span>个已选文件</span>
                    </div>
                  </div>
                </template>
                <div class="upload-form">
                  <el-form :model="uploadForm" ref="uploadRef" :rules="uploadRules" label-width="90px">
                    <el-form-item label="资源描述" prop="description">
                      <el-input
                          style="flex:1;"
                          type="textarea" :rows="2"
                          placeholder="推荐格式：内容概要+适用人群+使用场景及目标+其他说明"
                          :maxlength="500" show-word-limit v-model="uploadForm.description"/>
                    </el-form-item>
                    <el-form-item label="资源标签" prop="tag">
                      <div>
                        <div class="add-tag-select">
                          <el-tag style="margin-right: 10px" v-for="item in addTagList" size="large" type="info"
                                  closable>
                            {{ item.name }}
                          </el-tag>
                          <el-select
                              v-model="uploadForm.tag" multiple :multiple-limit="1" ref="addTagSelectRef"
                              filterable allow-create remote reserve-keyword placeholder=""
                              v-show="isAddTag" :remote-method="remoteMethod" :loading="loading"
                              style="width: 150px;margin-right: 10px" @blur="addTagBlur" @change="addTagChange"
                          >
                            <el-option
                                v-for="item in tagOptions" :key="item.value"
                                :label="item.label" :value="item.value"
                            />
                          </el-select>
                          <el-button style="font-size: 12px;margin-right:10px"
                                     v-if="!isAddTag && addTagList.length<5"
                                     @click="addTag">
                            <el-icon>
                              <Plus/>
                            </el-icon>
                            添加标签
                          </el-button>
                          <span class="tips" v-if="addTagList.length<5">按回车Enter创建标签</span>
                        </div>
                        <div style="margin-top: 5px">
                          <span class="tips">可修改或添加标签，最多可添加5个标签</span>
                        </div>
                      </div>
                    </el-form-item>
                    <el-form-item label="所属分类" prop="category" style="align-items: center">
                      <el-cascader style="width: 100%" size="large" v-model="uploadForm.category" clearable/>
                    </el-form-item>
                  </el-form>
                </div>
                <template #footer>
                  <el-button size="large" round>取消</el-button>
                  <el-button type="primary" size="large" round>保存</el-button>
                </template>
              </el-dialog>

              <div v-if="uploadForm.uploadFiles.length" class="footer">
                <div class="info-text">
                  <span>已选择</span>
                  <span class="num">{{ uploadForm.uploadFiles.length }}</span>
                  <span>个（已完成上传3个）</span>
                </div>
                <div class="btn">
                  <el-button round size="large" @click="isBatchEdit=true">批量编辑</el-button>
                  <el-button type="primary" round size="large">确认提交</el-button>
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
</template>

<script setup>
import RightCard from "@/views/creation/upload/batch/components/RightCard.vue";
import {ref} from "vue";
import {ElMessage} from "element-plus";

const isBatchEdit = ref(false)
const tableRef = ref()
const addTagSelectRef = ref()
const isAddTag = ref(false)
const loading = ref(false)
const tagOptions = ref([])
const addTagList = ref([])
const uploadForm = ref({
  uploadFiles: [],
  name: null,
  tag: null,
  category: null
})
const uploadRef = ref()
const uploadRules = ref({
  name: [{trigger: "blur", message: "请输入资源名称", required: true}],
  tag: [{trigger: "blur", message: "请输入资源名称", required: true}],
  category: [{trigger: "blur", message: "请输入资源名称", required: true}],
})

const addTag = () => {
  isAddTag.value = true
  setTimeout(() => {
    addTagSelectRef.value.focus()
  })
}
const addTagBlur = () => {
  isAddTag.value = false
}
const addTagChange = () => {
  if (uploadForm.value.tag) {
    addTagList.value.push({name: uploadForm.value.tag[0]})
    uploadForm.value.tag = null
    isAddTag.value = false
  }
}
const remoteMethod = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
}
const uploadChange = (rawFile, rawFileList) => {
  if (rawFileList.length > 1) {
    rawFileList.splice(0, 1);
  }
  if (rawFile.raw.size / 1024 / 1024 > 100) {
    ElMessage.warning(rawFile.raw.name)
    ElMessage.error("单个文件大小超出限制")
  } else {
    uploadForm.value.uploadFiles.push({file: rawFile, isEdit: false})
  }
}
</script>

<style scoped lang="scss">
.el-card {
  border: none;
  box-shadow: none;
}

.upload-card {
  position: relative;

  .top-right-tag {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: end;
    background-color: var(--el-color-danger);
    background-image: linear-gradient(120deg, var(--el-bg-color) 0%, var(--el-color-danger) 100%);
    color: var(--el-bg-color);
    font-weight: bold;
    width: 80px;
    height: 80px;
    position: absolute;
    right: -40px;
    top: -40px;
    transform: rotate(45deg);
  }

  .header {
    display: flex;
    align-items: center;

    .el-icon {
      margin-left: 5px;
    }
  }

  :deep(.el-upload-dragger) {
    padding: 15px;
  }

  .uploader {
    margin: 100px 0;

    .upload-tips {
      font-size: 12px;
      color: var(--el-text-color-placeholder)
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

  .upload-item {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-image {
      width: 45px;
      height: 45px;
      margin-right: 20px;
    }

    .info, .operation {
      display: flex;
      align-items: center;
    }

    .info {
      .title {
        color: var(--el-text-color-regular)
      }
    }
  }

  .upload-form {
    margin-top: 20px;

    .tips {
      font-size: 12px;
      color: var(--el-text-color-placeholder);
    }
  }

  :deep(.el-table-column--selection.el-table__cell) {
    vertical-align: top;
  }

  :deep(.el-table__row .el-table-column--selection) {
    .cell {
      margin-top: 20px;
    }
  }

  :deep(.el-table tbody tr:hover>td) {
    background-color: #FFFFFF !important;
  }

  .el-dialog {
    .dialog-header {
      font-size: 14px;
      display: flex;
      justify-content: space-between;

      .num {
        color: var(--el-color-primary)
      }
    }

    .upload-form {
      padding: 0 20px;
    }
  }

  .footer {
    margin-top: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .info-text {
      font-size: 14px;

      .num {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>