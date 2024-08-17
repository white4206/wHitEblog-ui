<template>
  <el-main>
    <div id="document-container">
      <div ref="toolbarRef" id="toolbar-container">
        <!-- This is where the document editor toolbar will be inserted. -->
      </div>
      <Sidebar :top="fixHeight" :toolbarRef="toolbarRef" :catalogue="catalogue" ref="sidebarRef"/>
      <div class="minimap-wrapper" v-loading="loading">
        <!-- 编辑器容器 -->
        <div class="editor-container">
          <div class="title">
            <el-form :model="titleForm" ref="titleRef" :rules="titleRules">
              <el-form-item prop="title">
                <el-input v-model="titleForm.title" type="textarea" placeholder="请输入文章标题（5~100个字）"
                          :autosize="{minRows: 1}" minlength="5" maxlength="100"
                          show-word-limit resize="none"/>
              </el-form-item>
            </el-form>
          </div>
          <!-- This is where the edited content will render (the page). -->
          <ckeditor
              id="editor-content"
              v-if="isLayoutReady"
              :editor="DecoupledEditor"
              v-model="editorData"
              :config="config"
              @ready="onReady"
          ></ckeditor>
          <div class="setting">
            <el-form :model="settingForm" label-width="auto" label-position="right" ref="settingRef"
                     :rules="settingRules">
              <el-form-item label="文章标签" prop="tagIds">
                <template #label>
                  <div class="label">
                    <span>文章标签</span>
                    <el-tooltip effect="dark" placement="top-start">
                      <template #content>
                        <b style="font-size: 14px">文章头部位置展示</b>
                        <ul style="list-style: square;padding:0 20px">
                          <li>设置合适的标签，能方便分类检索</li>
                          <li>推荐给需要的人，获取更多曝光</li>
                        </ul>
                      </template>
                      <el-icon>
                        <QuestionFilled/>
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
                <el-select v-model="settingForm.tagIds" placeholder="请选择文章标签" multiple collapse-tags
                           collapse-tags-tooltip
                           clearable :max-collapse-tags="3" tag-type="primary" style="width: 50%">
                  <el-option v-for="option in tagItems" :key="option.id" :label="option.name"
                             :value="option.id"/>
                </el-select>
              </el-form-item>
              <el-form-item label="添加封面" tag="cover">
                <template #label>
                  <div class="label">
                    <span>添加封面</span>
                    <el-tooltip effect="dark" placement="top-start">
                      <template #content>
                        <b style="font-size: 14px">设置封面图, 获取更多流量</b>
                        <ul style="list-style: square;padding:0 20px">
                          <li>本地上传: 支持上传JPG、JPEG、PNG、GIF格式，最大5M。</li>
                        </ul>
                      </template>
                      <el-icon>
                        <QuestionFilled/>
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
                <el-upload :disabled="uploadDisabled" class="cover-uploader" action="#" ref="uploadRef"
                           :show-file-list="false" list-type="picture-card" :on-change="handleChange"
                           :auto-upload="false" :file-list="uploadFiles" :limit="2" @mouseenter="showClose=true"
                           @mouseleave="showClose=false">
                  <div v-if="imageUrl && showClose" class="close" @click.stop="handleRemove">
                    <el-icon :size="18" color="var(--el-color-black)">
                      <Close/>
                    </el-icon>
                  </div>
                  <img v-if="imageUrl" :src="imageUrl" class="cover"/>
                  <el-icon v-else class="avatar-uploader-icon">
                    <Plus/>
                  </el-icon>
                </el-upload>
              </el-form-item>
              <el-form-item label="文章摘要" prop="abstractText">
                <template #label>
                  <div class="label">
                    <span>文章摘要</span>
                    <el-tooltip effect="dark" placement="top-start">
                      <template #content>
                        <b style="font-size: 14px">摘要描述, 帮助读者快速了解内容</b>
                        <ul style="list-style: square;padding:0 20px">
                          <li>一键提取: 提取正文前256字符</li>
                        </ul>
                      </template>
                      <el-icon>
                        <QuestionFilled/>
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
                <el-input v-model="settingForm.abstractText" type="textarea"
                          placeholder="摘要：会在推荐、列表等场景外露, 帮助读者快速了解内容, 支持一键将正文前256字符键入摘要文本框（将在后续版本推出）"
                          :autosize="{minRows: 2}" minlength="5" maxlength="256" resize="none"
                          show-word-limit/>
              </el-form-item>
              <el-form-item label="可见范围" prop="publicStatus">
                <template #label>
                  <div class="label">
                    <span>可见范围</span>
                    <el-tooltip effect="dark" placement="top-start">
                      <template #content>
                        <b style="font-size: 14px">设置可见范围</b>
                        <ul style="list-style: square;padding:0 20px">
                          <li>全部可见: 博文发布后, 所有人可见</li>
                          <li>仅我可见: 博文发布后, 仅自己可见</li>
                          <li>粉丝可见: 博文发布后, 仅你和关注你的人可见</li>
                        </ul>
                      </template>
                      <el-icon>
                        <QuestionFilled/>
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
                <el-radio-group v-model="settingForm.publicStatus">
                  <el-radio :value="1">全部可见</el-radio>
                  <el-radio :value="2">仅我可见</el-radio>
                  <el-radio :value="3">粉丝可见</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div ref="editorMinimap" class="minimap-container">
          <!-- This is where the minimap will be inserted. -->
        </div>
      </div>
    </div>
    <div class="footer">
      <!-- 操作条 -->
      <OperationBar :isEdit="isEdit" :settingForm="settingForm" :settingRef="settingRef"
                    :countData="countData" :content="editorData" :title="titleForm.title" :titleRef="titleRef"/>
    </div>
  </el-main>
</template>

<script setup>
import {computed, nextTick, onMounted, ref, watch} from "vue";
import Sidebar from "@/views/creation/editor/components/Sidebar.vue";
import OperationBar from "@/views/creation/editor/components/OperationBar.vue";
import {ElMessage} from "element-plus";
import {getArticleTag, getEditArticleDetailById} from "@/api/blog.js";
import {DecoupledEditor} from 'ckeditor5'
import {config, countData, editorMinimap} from "@/ckeditor5/ckeditor5.js"
import 'ckeditor5/ckeditor5.css';
import {imageUpload} from "@/api/common.js";
import {useRoute} from "vue-router";
import cache from '@/plugins/cache.js'
import useGlobalStore from "@/store/modules/global.js";
import {deepTraverse} from "@/utils/deepTraverse.js";

const globalStore = useGlobalStore()
const loading = ref(true)
const isEdit = ref(false)
const route = useRoute()
const catalogue = ref([])
const editorData = ref()
const isLayoutReady = ref(false)
const toolbarRef = ref()
const fixHeight = ref()
const sidebarRef = ref()
const titleRef = ref()
const titleForm = ref({title: null})
const titleRules = ref({
  title: [{required: true, message: "", trigger: 'blur', min: 5, max: 100}],
})
const showClose = ref(false)
const imageUrl = ref()
const tagItems = ref([])
const uploadRef = ref()
const uploadFiles = ref([])
const settingRef = ref()
const settingForm = ref({
  tagIds: null,
  cover: null,
  abstractText: null,
  publicStatus: 1
})
const settingRules = ref({
  tagIds: [{trigger: "blur", message: "请至少选择一个文章标签", required: true}],
  abstractText: [{trigger: "blur", message: "请输入文章摘要内容", required: true}],
  publicStatus: [{trigger: "blur", message: "请选择文章可见范围", required: true}],
})

const uploadDisabled = computed(() => {
  return imageUrl.value != null
})
const onReady = (editor) => {
  toolbarRef.value.appendChild(editor.ui.view.toolbar.element);

  class MyUploadAdapter {
    constructor(loader) {
      // The file loader instance to use during the upload.
      this.loader = loader;
    }

    // Starts the upload process.
    upload() {
      // Return a promise that will be resolved when the file is uploaded.
      return this.loader.file
          .then(file => imageUpload(file).then(res => {
            return {
              "default": import.meta.env.VITE_APP_BASE_API + res.data
            };
          }))
    }
  }

  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };

  let iframe = document.querySelector("iframe")
  iframe.onload = function () {
    let iframeDoc = iframe.contentDocument || iframe.contentWindow.document
    if (cache.local.get("vueuse-color-scheme") === "dark")
      iframeDoc.querySelector("html").classList.add("dark");
    else
      iframeDoc.querySelector("html").classList.remove("dark");
  }
}
const handleChange = (rawFile, rawFileList) => {
  if (rawFileList.length > 1) {
    rawFileList.splice(0, 1);
  }
  if (rawFile.raw.type !== 'image/jpeg'
      && rawFile.raw.type !== 'image/png'
      && rawFile.raw.type !== 'image/jpg'
      && rawFile.raw.type !== 'image/gif'
  ) {
    ElMessage.error('封面图片只能是JPG、JPEG、PNG、GIF格式')
    uploadRef.value.clearFiles()
  } else if (rawFile.raw.size / 1024 / 1024 > 5) {
    ElMessage.error('图片大小不能超过5MB!')
    uploadRef.value.clearFiles()
  } else {
    settingForm.value.cover = rawFile.raw
    imageUrl.value = URL.createObjectURL(rawFile.raw)
  }
}
const handleRemove = () => {
  imageUrl.value = undefined
  uploadFiles.value.splice(0, 1)
}
const scanCatalogue = () => {
  // 获取并创建目录
  // 要获取的标题元素
  catalogue.value = []
  const titleElements = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
  const el = document.querySelector('#editor-content')
  if (el) {
    // 元素深度遍历查询目标元素
    deepTraverse(titleElements, el, (element, index) => {
      const id = 'header-' + index
      element.setAttribute('id', id)
      catalogue.value.push({
        id: id,
        title: element.innerText,
        level: Number(element.nodeName.substring(1, 2)) - 2,
        nodeName: element.nodeName,
        e: element,
        fold: false,
        read: false,
        index: index
      })
    })
  }
}
watch(editorData, scanCatalogue, {
  immediate: true,
})
watch(globalStore, () => {
  let iframe = document.querySelector("iframe")
  if (iframe) {
    setTimeout(() => {
      let iframeDoc = iframe.contentDocument || iframe.contentWindow.document
      iframeDoc.querySelector("html").classList.toggle("dark");
    }, 0)
  }
})
onMounted(() => {
  if (route.query.articleId) {
    isEdit.value = true
    getEditArticleDetailById(route.query.articleId).then(res => {
      titleForm.value.title = res.data.title
      editorData.value = res.data.content
      settingForm.value = res.data
      imageUrl.value = res.data.cover ? import.meta.env.VITE_APP_BASE_API + res.data.cover : null
      loading.value = false
      nextTick(scanCatalogue)
    })
  } else {
    isEdit.value = false
    loading.value = false
  }
  config.minimap = {
    container: editorMinimap.value,
    extraClasses: 'editor-container_include-minimap ck-minimap__iframe-content'
  }
  isLayoutReady.value = true;
  // 获取文章标签数据
  getArticleTag().then(res => {
    tagItems.value = res.data
  })
})
</script>
<style scoped lang="scss">

.el-main {
  padding: 0;
  overflow: visible;
  max-width: none;
  margin: 0;
}

.title {
  box-sizing: border-box;
  width: 850px;
  margin: 0 auto;
  padding-top: 20px;
  background-color: var(--el-bg-color);

  .el-form {
    margin: 0 75px;
    border-bottom: 1px solid var(--el-border-color-light);
  }

  :deep(.el-textarea__inner) {
    padding: 5px 0;
    box-shadow: none;
    border-radius: 0;
    line-height: 32px;
    font-size: 24px;
    font-weight: 600;
    word-break: break-all;
    white-space: pre-wrap;
  }

}

.ck-content {
  line-height: 2;
  min-height: 500px;
}

.ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable) {
  border: none;
  box-shadow: none;
  outline: none;
}

.ck.ck-editor__editable_inline {
  border: none;
}

:deep(.ck.ck-editor__editable > .ck-placeholder::before) {
  opacity: .8;
  color: var(--el-text-color-placeholder);
  white-space: pre;
  line-height: 2;
}

:deep(.ck.ck-toolbar) {
  padding: 10px;
  border: none;
  border-bottom: 1px solid var(--el-border-color-darker);
  background-color: var(--el-bg-color);
}

:deep(.ck-reset_all *:not(.ck-reset_all-excluded *)) {
  color: var(--el-text-color-primary);
}

:deep(.ck.ck-minimap) {
  background-color: var(--el-bg-color);
}

:deep(.ck.ck-toolbar>.ck-toolbar__items) {
  justify-content: center;
}

:deep(.ck.ck-word-count) {
  display: flex;
  align-items: center;
}

.setting {
  box-sizing: border-box;
  width: 850px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 20px 75px;
  background-color: var(--el-bg-color);

  .label {
    display: flex;
    align-items: center;

    span {
      margin-right: 5px;
    }
  }

  .cover-uploader {
    position: relative;

    :deep(.el-upload--picture-card) {
      border-radius: 4px;
      width: 175px;
      height: 100px;
    }

    .close {
      position: absolute;
      top: 0;
      right: 2px;
    }

    .cover {
      border-radius: 4px;
      width: 175px;
      height: 100px;
      cursor: default;
    }
  }
}

.footer {
  position: sticky;
  left: 0;
  bottom: 0;
  z-index: 999;
  overflow: hidden;
  border-top: 1px solid var(--el-border-color-light);
  background-color: var(--el-bg-color);
}

:deep(.ck.ck-minimap iframe) {
  outline: 1px solid var(--el-border-color);
}
</style>
<style lang="scss" scoped>
.ck.ck-placeholder::before, .ck .ck-placeholder::before {
  opacity: .8;
  color: var(--el-text-color-placeholder);
  white-space: pre;
  line-height: 2;
}

.document-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex-grow: 1;
  max-width: 1280px;
  margin: 0 auto;
}

.toolbar-container {
  width: 100%;
}

.minimap-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  max-height: calc(100vh - 180px);
  width: 100%;
  position: relative;
  top: -1px;
}

.editor-container {
  margin-top: 30px;
  width: 100%;
  border-right: 0;
  background: transparent;
  box-sizing: border-box;
  position: relative;
  overflow: auto;
}

.minimap-container {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  max-height: calc(100vh - 180px);
  width: 120px;
  flex: 0 0 auto;
  border: 1px solid var(--el-border-color-lighter);
  overflow: hidden;
}

#editor-content {
  width: 850px;
  min-height: calc(210mm + 2px);
  height: auto;
  padding: 20px 75px;
  box-sizing: border-box;
  background: var(--el-bg-color);
  margin: 0 auto;
  overflow: hidden;
}
</style>
<style>
.ck-content pre code {
  color: hsl(0, 0%, 20.8%)
}

.ck-content ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 40px;
  unicode-bidi: isolate;
}

.ck-content ol {
  display: block;
  list-style-type: decimal;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 40px;
  unicode-bidi: isolate;
}
</style>