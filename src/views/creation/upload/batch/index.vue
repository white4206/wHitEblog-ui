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
                  :auto-upload="false" :on-change="uploadChange" multiple
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

              <el-table ref="tableRef" :data="uploadForm.uploadFiles">
                <el-table-column type="selection" width="30"/>
                <el-table-column>
                  <template #header>
                    <div style="display: flex;justify-content: space-between">
                      <el-button link type="primary">资源名称</el-button>
                      <el-button link type="primary" @click="tableRef.toggleAllSelection()">全选</el-button>
                    </div>
                  </template>
                  <template #default="scope">
                    <div class="upload-item">
                      <div class="info">
                        <el-image src="/src/assets/images/fileType/image.png"/>
                        <div class="title text-ellipsis-1">{{ scope.row.name }}</div>
                      </div>
                      <div class="operation">
                        <el-button link>编辑</el-button>
                        <el-icon :size="16" color="var(--el-text-color-secondary)">
                          <CircleCloseFilled/>
                        </el-icon>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
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
    uploadForm.value.uploadFiles.push(rawFile)
  }
  if (uploadForm.value.uploadFiles.length) {

  }
  console.log(uploadForm.value.uploadFiles)
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

  .upload-form {

    .tips {
      font-size: 12px;
      color: var(--el-text-color-placeholder);
    }
  }

  .upload-item {
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
}
</style>