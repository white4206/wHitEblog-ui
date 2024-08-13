<template>
  <el-main style="overflow: visible">
    <el-row justify="center">
      <el-col :span="18" :xs="17" :sm="18" :md="19" :lg="20" :xl="21">
        <el-row :gutter="10" justify="center">
          <el-col :span="18">
            <el-card class="upload-card" body-style="padding:40px 75px;">
              <div class="top-right-tag">
                <span>FAQ</span>
              </div>
              <div class="header">
                <h4>上传资源</h4>
                <el-icon color="var(--el-text-color-placeholder)">
                  <QuestionFilled/>
                </el-icon>
              </div>
              <div class="upload-form">
                <el-form :model="uploadForm" ref="uploadRef" :rules="uploadRules" label-width="90px">
                  <el-upload
                      class="uploader" drag action="#" :show-file-list="false" :limit="2"
                      :auto-upload="false" :on-change="uploadChange"
                  >
                    <div v-if="!uploadForm.uploadFile" class="el-upload__text"
                         style="display: flex;align-items: center;justify-content: center">
                      <el-icon style="margin-right: 5px">
                        <FolderAdd/>
                      </el-icon>
                      <span>将文件拖到此处，或</span>
                      <el-link type="primary" :underline="false">点击上传</el-link>
                      <span>，小于10G</span>
                    </div>
                    <div v-else class="upload-file">
                      <el-image src="/src/assets/images/fileType/zip.png"/>
                      <span class="title text-ellipsis-1">{{ uploadForm.uploadFile.name }}</span>
                      <el-link type="primary" :underline="false">重新上传</el-link>
                    </div>
                  </el-upload>
                  <el-form-item label="资源名称" prop="name">
                    <el-input
                        style="flex:1;"
                        type="textarea" :rows="3" placeholder="推荐格式：知识领域+技术关键词+用途"
                        :maxlength="64" show-word-limit v-model="uploadForm.name"/>
                    <el-icon
                        style="position: absolute;bottom: 0;right: -25px;"
                        color="var(--el-text-color-placeholder)">
                      <QuestionFilled/>
                    </el-icon>
                  </el-form-item>
                  <el-form-item label="资源描述" prop="description">
                    <el-input
                        style="flex:1;"
                        type="textarea" :rows="10" placeholder="推荐格式：内容概要+适用人群+使用场景及目标+其他说明"
                        :maxlength="500" show-word-limit v-model="uploadForm.description"/>
                    <el-icon
                        style="position: absolute;bottom: 0;right: -25px;"
                        color="var(--el-text-color-placeholder)">
                      <QuestionFilled/>
                    </el-icon>
                  </el-form-item>
                  <el-form-item label="资源标签" prop="tag">
                    <div>
                      <div class="add-tag-select">
                        <el-tag style="margin-right: 10px" v-for="item in addTagList" size="large" type="info" closable>
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
                        <el-button style="font-size: 12px;margin-right:10px" v-if="!isAddTag && addTagList.length<5"
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
                  <el-form-item>
                    <div style="width: 100%;text-align: right">
                      <el-button type="primary" size="large" round style="padding: 0 50px;font-weight: bold">
                        提交
                      </el-button>
                    </div>
                  </el-form-item>
                </el-form>
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
import RightCard from "@/views/creation/upload/single/components/RightCard.vue";
import {ref} from "vue";
import {ElMessage} from "element-plus";

const addTagSelectRef = ref()
const isAddTag = ref(false)
const loading = ref(false)
const tagOptions = ref([])
const addTagList = ref([])
const uploadForm = ref({
  uploadFile: null,
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
    rawFileList.splice(0, 1)
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

  .upload-form {
    margin-top: 20px;

    .uploader {
      margin-bottom: 25px;

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

    .tips {
      font-size: 12px;
      color: var(--el-text-color-placeholder);
    }
  }
}
</style>