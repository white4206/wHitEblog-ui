<template>
  <el-card class="content-card" style="border: none;min-height: calc(100vh - 100px)" shadow="never">
    <el-tabs v-model="activeTab" @tab-change="tabChange" @tab-click="tabClick">
      <el-tab-pane label="博客设置" name="blogSetting">
        <el-form :model="blogSetting" ref="blogSettingRef" :rules="blogSettingRules" label-width="105px"
                 hide-required-asterisk>
          <el-form-item label="博客简介:" prop="intro">
            <el-input style="width: 500px;" placeholder="请输入博客简介" v-model="blogSetting.intro" clearable/>
          </el-form-item>
          <el-form-item label="博客描述:" prop="description">
            <el-input style="width: 500px;" placeholder="请输入博客描述" v-model="blogSetting.description" clearable/>
          </el-form-item>
          <el-form-item label="博客皮肤:" prop="blogSkin">
            <div style="width: 800px">
              <el-tabs v-model="blogSkinTab" class="custom-tabs">
                <el-tab-pane name="all">
                  <template #label>
                    全部(0)
                  </template>
                  <el-scrollbar max-height="300px" always>
                    <div style="height: 400px;"></div>
                  </el-scrollbar>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-form-item>
          <el-form-item label="默认编辑器:" prop="editor">
            <el-radio-group class="custom-radio-group" v-model="blogSetting.editor">
              <el-radio label="富文本编辑器" value="richTextEditor"/>
              <el-radio label="MarkDown编辑器" value="markdownEditor"/>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="图片水印:" prop="isAddWaterMark">
            <div>
              <el-switch v-model="blogSetting.isAddWaterMark"/>
              <span style="margin-left: 10px">作品配图自动添加水印</span>
              <div v-if="blogSetting.isAddWaterMark">
                <img style="width: 430px;height: 240px" src="@/assets/images/common/watermark.png" alt="">
              </div>
            </div>
          </el-form-item>
          <el-form-item label="评论通知设置:" prop="noticeSetting">
            <el-radio-group class="custom-radio-group" v-model="blogSetting.noticeSetting">
              <el-radio label="不通知" value="never"/>
              <el-radio label="及时通知" value="timely"/>
              <el-radio label="每天通知一次" value="daliy"/>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="代码片样式:" prop="codeStyle">
            <div>
              <el-select class="custom-select" style="width: 225px;" v-model="blogSetting.codeStyle"
                         placeholder="请选择代码片样式">
                <el-option/>
              </el-select>
              <div class="codeStyle-preview">
                <img src="@/views/creation/center/setting/blogSetting/atom-one-light.png" alt="">
              </div>
            </div>
          </el-form-item>
          <el-form-item label="版权声明:" prop="copyrightNotice">
            <div>
              <div style="display: flex;align-items: center">
                <el-select class="custom-select" style="width: 225px;" v-model="blogSetting.codeStyle"
                           placeholder="请选择版权声明方式">
                  <el-option/>
                </el-select>
                <img style="margin-left: 20px" src="@/assets/images/common/BY-SA.png" alt="">
                <el-icon style="margin-left: 5px" :size="16">
                  <QuestionFilled/>
                </el-icon>
              </div>
              <div>
                <el-input style="width: 500px;margin-top: 10px" placeholder="原创文章设置BY-SA标识可见" clearable
                          disabled/>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button style="padding: 0 30px" type="primary" size="large" round>保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";

const blogSkinTab = ref("all")
const route = useRoute()
const router = useRouter()
const activeTab = ref(route.query.tab || "blogSetting")
const blogSetting = ref({
  intro: null,
  description: null,
  blogSkin: "",
  editor: "richTextEditor",
  isAddWaterMark: true,
  noticeSetting: "never",
  codeStyle: "",
  copyrightNotice: ""
})
const blogSettingRules = ref({
  intro: [{required: true, trigger: "blur", message: "博客简介不能为空"}],
  description: [{}],
  blogSkin: [{required: true, trigger: "blur", message: "请选择博客皮肤"}],
  editor: [{required: true, trigger: "blur", message: "请选择默认编辑器"}],
  isAddWaterMark: [{required: true, trigger: "blur", message: "请选择是否添加水印"}],
  noticeSetting: [{required: true, trigger: "blur", message: "请选择通知设置"}],
  codeStyle: [{required: true, trigger: "blur", message: "请选择代码片样式"}],
  copyrightNotice: [{required: true, trigger: "blur", message: "请选择版权声明方式"}],
})
const blogSettingRef = ref()

const tabChange = () => {

}
const tabClick = (tab) => {
  router.push({query: {tab: tab.paneName}})
}
onMounted(() => {
  if (route.query.tab)
    activeTab.value = route.query.tab
})
</script>

<style scoped lang="scss">
.content-card {
  :deep(.el-card__body) {
    padding: 10px 20px 20px 20px;
  }
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
}

.custom-radio-group {
  :deep(.el-radio__input.is-checked .el-radio__inner) {
    background-color: inherit;
  }

  :deep(.el-radio__inner) {
    border-radius: 3px;
  }

  :deep(.el-radio__inner::after) {
    height: 8px;
    width: 8px;
    border-radius: 0;
    background-color: var(--el-color-primary);
  }
}

.custom-select {
  :deep(.el-select__wrapper) {
    background: var(--el-fill-color);
  }
}

.codeStyle-preview {
  border-radius: 5px;
  border: 1px solid var(--el-border-color-dark);
  margin-top: 15px;
  width: 760px;
  height: 330px;

  img {
    border-radius: 5px;
    width: 760px;
    height: 330px;
  }
}

.custom-tabs {
  :deep(.el-tabs__nav-wrap::after) {
    content: "";
  }

  :deep(.el-tabs__item) {
    color: var(--el-text-color-regular);
    font-size: 14px;
  }

  :deep(.el-tabs__item.is-active) {
    color: var(--el-color-primary);
  }
}
</style>