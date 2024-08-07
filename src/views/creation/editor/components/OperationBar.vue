<template>
  <el-row justify="space-between" :gutter="20">
    <el-col :span="5"></el-col>
    <el-col :span="14">
      <div class="operation">
        <div id="word-count">
          共<span>{{ " " + countData.wordCount + " " }}</span>词,<span>{{ " " + countData.charCount + " " }}</span>字
        </div>
        <div>
          <el-dropdown>
            <el-button type="primary" round>
              保存草稿
              <el-icon class="el-icon--right">
                <arrow-down/>
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item disabled>保存并预览</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button round style="margin-left:12px" disabled>定时发布</el-button>
          <el-button type="primary" round @click="isEdit?editBlog():postBlog()">发布博客</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="5"></el-col>
  </el-row>
</template>
<script setup>
import {editArticle, publishArticle} from "@/api/blog.js";
import {ElMessage} from 'element-plus'
import {useRouter} from 'vue-router'

const router = useRouter()
const props = defineProps({
  isEdit: {
    type: Boolean
  },
  countData: {
    type: Object
  },
  settingForm: {
    type: Object,
  },
  settingRef: {
    type: Object
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  titleRef: {
    type: Object
  }
})

const editBlog = () => {
  let formData = new FormData()
  formData.append("id", props.settingForm.id)
  formData.append("tagIds", props.settingForm.tagIds)
  formData.append("categoryId", 1)
  formData.append("title", props.title)
  formData.append("file", props.settingForm.cover)
  formData.append("content", props.content)
  formData.append("abstractText", props.settingForm.abstractText)
  formData.append("publicStatus", props.settingForm.publicStatus)
  props.titleRef.validate(titleValid => {
    // 标题表单验证通过
    if (titleValid) {
      // 内容验证通过
      let isEmptyContent = props.content !== "<p>&nbsp;</p>" && props.content.trim() !== ""
      if (isEmptyContent) {
        // 文章设置信息验证通过
        props.settingRef.validate(settingValid => {
          if (settingValid) {
            editArticle(formData).then(res => {
              if (res.code === 200) {
                ElMessage.success("编辑成功")
                router.push(`/creation/success/${res.data}`)
              }
            })
          } else {
            ElMessage.error("请检查文章设置信息填写")
          }
        })
      } else {
        ElMessage.error("请输入文章内容")
      }
    } else {
      ElMessage.error("标题长度应在5~100个字之间")
    }
  })
}

const postBlog = () => {
  let formData = new FormData()
  formData.append("tagIds", props.settingForm.tagIds)
  formData.append("categoryId", 1)
  formData.append("title", props.title)
  formData.append("file", props.settingForm.cover)
  formData.append("content", props.content)
  formData.append("abstractText", props.settingForm.abstractText)
  formData.append("publicStatus", props.settingForm.publicStatus)
  props.titleRef.validate(titleValid => {
    // 标题表单验证通过
    if (titleValid) {
      // 内容验证通过
      let isEmptyContent = props.content !== "<p>&nbsp;</p>" && props.content.trim() !== ""
      if (isEmptyContent) {
        // 文章设置信息验证通过
        props.settingRef.validate(settingValid => {
          if (settingValid) {
            publishArticle(formData).then(res => {
              if (res.code === 200) {
                ElMessage.success("发布成功")
                router.push(`/creation/success/${res.data}`)
              }
            })
          } else {
            ElMessage.error("请检查文章设置信息填写")
          }
        })
      } else {
        ElMessage.error("请输入文章内容")
      }
    } else {
      ElMessage.error("标题长度应在5~100个字之间")
    }
  })


}
</script>
<style scoped lang="scss">
.operation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
</style>