<template>
  <div class="main">
    <el-card class="head-info-card info-card" shadow="never">
      <div class="head-info">
        <div class="personal-avatar">
          <el-upload class="avatar-uploader" action="#" ref="uploadRef"
                     :show-file-list="false" list-type="picture-card" :on-change="handleChange"
                     :auto-upload="false" :file-list="uploadFiles" :limit="2">
            <el-avatar v-if="avatarUrl" :src="avatarUrl" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
            <div class="masking">
              <el-icon :size="32" color="var(--el-bg-color)">
                <Camera/>
              </el-icon>
            </div>
          </el-upload>
        </div>
        <div>
          <div class="personal-nickname">
            <span>wHitE_</span>
            <el-tag size="small" round>
              码龄100年
            </el-tag>
          </div>
          <div class="personal-homepage">
            <span><el-link style="font-weight: normal">查看</el-link></span>
            <el-divider direction="vertical"/>
            <el-button @click="router.push('/personal')" round>
              个人主页
              <el-icon>
                <ArrowRight/>
              </el-icon>
            </el-button>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="personal-info-card info-card" shadow="never">
      <template #header>
        <div class="card-head">
          <h3>基本信息</h3>
        </div>
      </template>
      <div class="personal-info">
        <el-form :model="userInfoDetailForm" :rules="userInfoDetailRules" ref="userInfoDetailFormRef"
                 label-width="120px" label-position="left" hide-required-asterisk>
          <el-form-item label="用户昵称" class="personalForm-item" prop="nickname">
            <el-input v-if="nicknameEdit" class="personalInfoInput" v-model="userInfoDetailForm.nickname"/>
            <div v-if="nicknameEdit" class="btn-box">
              <el-button type="primary" round size="small" @click="submitEditNickname">确认</el-button>
              <el-button round size="small" @click="cancelEditNickname">取消</el-button>
            </div>
            <span v-if="!nicknameEdit" class="text">{{ userInfoDetailForm.nickname }}</span>
            <span v-if="!nicknameEdit" class="edit-button" @click="nicknameEdit = true">
                            <el-icon>
                                <Edit/>
                            </el-icon>
                            编辑
                        </span>
          </el-form-item>
          <el-form-item label="用户名" class="personalForm-item" prop="username">
            <span class="text">{{ userInfoDetailForm.username }}</span>
          </el-form-item>
          <el-form-item label="性别" class="personalForm-item" prop="gender">
            <el-radio-group v-if="genderEdit" class="personalInfoInput" v-model="userInfoDetailForm.gender">
              <el-radio label="男" :value="1">男</el-radio>
              <el-radio label="女" :value="0">女</el-radio>
              <span class="btn-box">
                                <el-button type="primary" round size="small" @click="submitEditGender">确认</el-button>
                                <el-button round size="small" @click="cancelEditGender">取消</el-button>
                            </span>
            </el-radio-group>
            <span v-if="!genderEdit" class="text">{{ userInfoDetailForm.gender ? '男' : '女' }}</span>
            <span v-if="!genderEdit" class="edit-button" @click="genderEdit = true">
                            <el-icon>
                                <Edit/>
                            </el-icon>
                            编辑
                        </span>
          </el-form-item>
          <el-form-item label="个人简介" class="personalForm-item" prop="description">
            <div>
              <div class="personalFormTextArea-item">
                <el-input v-if="descriptionEdit" type="textarea" :rows="4" class="personalInfoInputTextArea"
                          v-model="userInfoDetailForm.description" resize="none" :maxlength="300"
                          :show-word-limit="true"/>
                <span v-if="!descriptionEdit" class="text">{{ userInfoDetailForm.description }}</span>
                <span v-if="!descriptionEdit" class="edit-button" @click="descriptionEdit = true">
                                    <el-icon>
                                        <Edit/>
                                    </el-icon>
                                    <span>编辑</span>
                                </span>
              </div>
              <div v-if="descriptionEdit" class="textarea-btn-box">
                <el-button type="primary" round size="small" @click="submitEditDescription">确认</el-button>
                <el-button round size="small" @click="cancelEditDescription">取消</el-button>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="所在地区" class="personalForm-item" prop="area">
            <el-cascader clearable v-if="areaEdit" class="personalInfoInput"
                         v-model="userInfoDetailForm.area"
                         :options="pcaTextArr"/>
            <div v-if="areaEdit" class="btn-box">
              <el-button type="primary" round size="small" @click="submitEditArea">确认</el-button>
              <el-button round size="small" @click="cancelEditArea">取消</el-button>
            </div>
            <span v-if="!areaEdit" class="text">{{ userInfoDetailForm.area }}</span>
            <span v-if="!areaEdit" class="edit-button" @click="editArea">
                            <el-icon>
                                <Edit/>
                            </el-icon>
                            <span>编辑</span>
                        </span>
          </el-form-item>
          <el-form-item label="出生日期" class="personalForm-item" prop="birthday">
            <el-date-picker v-if="birthdayEdit" class="personalInfoInput"
                            v-model="userInfoDetailForm.birthday"
                            value-format="YYYY-MM-DD"/>
            <div v-if="birthdayEdit" class="btn-box">
              <el-button type="primary" round size="small" @click="submitEditBirthday">确认</el-button>
              <el-button round size="small" @click="cancelEditBirthday">取消</el-button>
            </div>
            <span v-if="!birthdayEdit" class="text">{{ userInfoDetailForm.birthday }}</span>
            <span v-if="!birthdayEdit" class="edit-button" @click="birthdayEdit = true">
                            <el-icon>
                                <Edit/>
                            </el-icon>
                            <span>编辑</span>
                        </span>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="interest-tag-card info-card" shadow="never">
      <template #header>
        <div class="card-head">
          <h3>兴趣标签</h3>
        </div>
      </template>
      <div class="interest-tag">
        <el-form :model="interestTagForm" label-width="0px" label-position="left" @submit.prevent="handleSubmit">
          <el-form-item class="interested">
            <el-collapse v-model="activeNames" accordion>
              <el-collapse-item name="interested">
                <template #title>
                  <div class="tagLabel">
                    感兴趣
                  </div>
                  <span class="selected-tags">
                    <el-tag v-for="tag in selectedInterestedTags" @close="removeInterestedTag(tag)" closable>{{
                        tag.name
                      }}</el-tag>
                  </span>
                  <div class="addTag">
                    <el-button style="border: none" :icon="Plus" size="small" type="primary" plain/>
                  </div>
                  <span class="addTagText" v-if="!selectedInterestedTags.length>0">选择标签</span>
                </template>
                <div class="tag-box">
                  <el-button style="border: none" size="small" type="primary" :plain="!item.isSelected"
                             v-for="item in interestTagItems"
                             @click="selectInterestedTag(item)">{{ item.name }}
                  </el-button>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-form-item class="uninterested">
            <el-collapse v-model="activeNames" accordion>
              <el-collapse-item name="uninterested">
                <template #title>
                  <div class="tagLabel">
                    不感兴趣
                  </div>
                  <span class="selected-tags">
                    <el-tag v-for="tag in selectedUninterestedTags" @close="removeUninterestedTag(tag)" closable>
                      {{ tag.name }}
                    </el-tag>
                  </span>
                  <div class="addTag">
                    <el-button style="border: none" :icon="Plus" size="small" type="primary" plain/>
                  </div>
                  <span class="addTagText" v-if="!selectedUninterestedTags.length>0">选择标签</span>
                </template>
                <div class="tag-box">
                  <el-button style="border: none" size="small" type="primary" :plain="!item.isSelected"
                             v-for="item in unInterestTagItems"
                             @click="selectUninterestedTag(item)">{{ item.name }}
                  </el-button>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="identity-tag-card info-card" shadow="never">
      <template #header>
        <div class="card-head">
          <h3>身份标签</h3>
        </div>
      </template>
      <div class="identity-tag">
        <el-form :model="identityTagForm" ref="identityTagFormRef" :rules="identityTagRules" label-width="120px"
                 label-position="left" hide-required-asterisk>
          <el-form-item label="我的身份" class="identityTagItem" prop="identityTag">
            <el-select v-if="identityTagEdit" :multiple-limit="1" multiple filterable :allow-create="isFounder"
                       class="identityTagInput"
                       v-model="identityTagForm.identityTag">
              <el-option v-for="item in identityTagOption" :key="item.id" :label="item.name"
                         :value="item.name"/>
            </el-select>
            <div v-if="identityTagEdit" class="btn-box">
              <el-button type="primary" round size="small" @click="submitEditIdentityTag">确认</el-button>
              <el-button round size="small" @click="cancelEditIdentityTag">取消</el-button>
            </div>
            <span v-if="!identityTagEdit" class="text">{{ identityTagForm.identityTag }}</span>
            <span v-if="!identityTagEdit" class="edit-button" @click="editIdentityTag">
                            <el-icon>
                                <Edit/>
                            </el-icon>
                            <span>编辑</span>
                        </span>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import {ArrowRight, Edit, Plus} from '@element-plus/icons-vue'
import {onMounted, ref} from 'vue'
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {pcaTextArr} from "element-china-area-data";
import {getArticleTag} from "@/api/blog.js";
import {getIdentityTag, getUserInfoDetail, updateAvatar, updateUserInfoDetail} from "@/api/user.js";
import useUserStore from "@/store/modules/user.js";
import {validNickname} from "@/utils/validate.js";

const isFounder = ref(false)
const userStore = useUserStore()
const selectedInterestedTags = ref([])
const selectedUninterestedTags = ref([])
const uploadRef = ref()
const uploadFiles = ref()
const router = useRouter()
const avatarUrl = ref(new URL("@/assets/images/avatar.png", import.meta.url).href)
const userInfoDetailForm = ref({
  nickname: null,
  username: null,
  gender: null,
  description: null,
  area: null,
  birthday: null,
})
const userInfoDetailRules = ref({
  nickname: [{trigger: blur, validator: validNickname, required: true}],
  gender: [{trigger: blur, message: "性别不可为空", required: true}],
  description: [{trigger: blur, message: "个人简介不可为空", required: true}],
  area: [{trigger: blur, message: "所在地区不可为空", required: true}],
  birthday: [{trigger: blur, message: "出生日期不可为空", required: true}]
})
const userInfoDetail = ref({
  nickname: null,
  username: null,
  gender: null,
  description: null,
  area: null,
  birthday: null,
})
const userInfoDetailFormRef = ref()
const nicknameEdit = ref(false)
const genderEdit = ref(false)
const descriptionEdit = ref(false)
const areaEdit = ref(false)
const birthdayEdit = ref(false)
const interestTagForm = ref({})
const activeNames = ref("interested")
const identityTagEdit = ref(false)
const identityTagForm = ref({
  identityTag: "本科",
})
const identityTag = ref({
  identityTag: "本科"
})
const identityTagOption = ref([])
const interestTagItems = ref([])
const unInterestTagItems = ref([])
const identityTagFormRef = ref()
const identityTagRules = ref({
  identityTag: [{required: true, trigger: "blur", message: "身份标签不可为空"}]
})

const cancelEditNickname = () => {
  userInfoDetailFormRef.value.clearValidate("nickname")
  userInfoDetailForm.value.nickname = userInfoDetail.value.nickname
  nicknameEdit.value = false
}
const submitEditNickname = () => {
  userInfoDetailFormRef.value.validateField("nickname", (valid) => {
    if (valid) {
      updateUserInfoDetail({nickname: userInfoDetailForm.value.nickname}).then(res => {
        nicknameEdit.value = false
        ElMessage.success(res.data)
      })
    }
  })

}
const cancelEditGender = () => {
  userInfoDetailFormRef.value.clearValidate("gender")
  userInfoDetailForm.value.gender = userInfoDetail.value.gender
  genderEdit.value = false
}
const submitEditGender = () => {
  userInfoDetailFormRef.value.validateField("gender", (valid) => {
    if (valid) {
      updateUserInfoDetail({gender: userInfoDetailForm.value.gender}).then(res => {
        genderEdit.value = false
        ElMessage.success(res.data)
      })
    }
  })
}
const cancelEditDescription = () => {
  userInfoDetailFormRef.value.clearValidate("description")
  userInfoDetailForm.value.description = userInfoDetail.value.description
  descriptionEdit.value = false
}
const submitEditDescription = () => {
  userInfoDetailFormRef.value.validateField("description", (valid) => {
    if (valid) {
      updateUserInfoDetail({description: userInfoDetailForm.value.description}).then(res => {
        descriptionEdit.value = false
        ElMessage.success(res.data)
      })
    }
  })
}
const cancelEditArea = () => {
  userInfoDetailFormRef.value.clearValidate("area")
  userInfoDetailForm.value.area = userInfoDetail.value.area
  areaEdit.value = false
}
const submitEditArea = () => {
  userInfoDetailFormRef.value.validateField("area", (valid) => {
    if (valid) {
      selectArea()
      updateUserInfoDetail({area: userInfoDetailForm.value.area}).then(res => {
        areaEdit.value = false
        ElMessage.success(res.data)
      })
    }
  })
}
const editArea = () => {
  areaEdit.value = true
  let temp = userInfoDetailForm.value.area.split("-")
  userInfoDetailForm.value.area = [temp[0], temp[1], temp[2]]
}
const selectArea = () => {
  userInfoDetailForm.value.area = userInfoDetailForm.value.area[0] + '-' + userInfoDetailForm.value.area[1] + '-'
      + userInfoDetailForm.value.area[2]
}
const cancelEditBirthday = () => {
  userInfoDetailFormRef.value.clearValidate("birthday")
  userInfoDetailForm.value.birthday = userInfoDetail.value.birthday
  birthdayEdit.value = false
}
const submitEditBirthday = () => {
  userInfoDetailFormRef.value.validateField("birthday", (valid) => {
    if (valid) {
      updateUserInfoDetail({birthday: userInfoDetailForm.value.birthday}).then(res => {
        birthdayEdit.value = false
        ElMessage.success(res.data)
      })
    }
  })
}
const cancelEditIdentityTag = () => {
  userInfoDetailFormRef.value.clearValidate("birthday")
  identityTagForm.value.identityTag = identityTag.value.identityTag
  identityTagEdit.value = false
}
const submitEditIdentityTag = () => {
  identityTagFormRef.value.validateField("identityTag", (valid) => {
    if (valid) {
      updateUserInfoDetail({identity: identityTagForm.value.identityTag[0]}).then(res => {
        identityTagForm.value.identityTag = identityTagForm.value.identityTag[0]
        identityTagEdit.value = false
        ElMessage.success(res.data)
      })
    }
  })
}
const editIdentityTag = () => {
  identityTagForm.value.identityTag = [identityTagForm.value.identityTag]
  identityTagEdit.value = true
}
const handleSubmit = () => {
  // 阻止默认表单提交行为
  // console.log("阻止默认表单提交行为")
}
const selectInterestedTag = (item) => {
  item.isSelected = !item.isSelected
  if (item.isSelected) {
    if (!selectedInterestedTags.value.includes(item))
      selectedInterestedTags.value.push(item)

  } else {
    selectedInterestedTags.value.forEach((tag, index) => {
      if (tag.id === item.id) {
        selectedInterestedTags.value.splice(index, 1)
      }
    })
  }
}
const selectUninterestedTag = (item) => {
  item.isSelected = !item.isSelected
  if (item.isSelected) {
    if (!selectedUninterestedTags.value.includes(item))
      selectedUninterestedTags.value.push(item)

  } else {
    selectedUninterestedTags.value.forEach((tag, index) => {
      if (tag.id === item.id) {
        selectedUninterestedTags.value.splice(index, 1)
      }
    })
  }
}
const removeInterestedTag = (tag) => {
  tag.isSelected = !tag.isSelected
  selectedInterestedTags.value.splice(selectedInterestedTags.value.indexOf(tag), 1)
}
const removeUninterestedTag = (tag) => {
  tag.isSelected = !tag.isSelected
  selectedUninterestedTags.value.splice(selectedUninterestedTags.value.indexOf(tag), 1)
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
    ElMessage.error('头像图片只能是JPG、JPEG、PNG、GIF格式')
    uploadRef.value.clearFiles()
  } else if (rawFile.raw.size / 1024 / 1024 > 5) {
    ElMessage.error('图片大小不能超过5MB!')
    uploadRef.value.clearFiles()
  } else {
    updateAvatar(rawFile.raw).then(res => {
      userStore.userGetInfo()
      ElMessage.success(res.data)
      avatarUrl.value = URL.createObjectURL(rawFile.raw)
    })
  }
}
onMounted(() => {
  getUserInfoDetail().then(res => {
    userInfoDetailForm.value = res.data
    userInfoDetail.value = {...userInfoDetailForm.value}
    identityTagForm.value.identityTag = res.data.identity
    identityTag.value = {...identityTagForm.value}
    isFounder.value = !!res.data.isFounder
    if (res.data.avatar)
      avatarUrl.value = import.meta.env.VITE_APP_BASE_API + res.data.avatar
  })
  // 获取身份标签数据
  getIdentityTag().then(res => {
    identityTagOption.value = res.data
  })
  // 获取文章标签数据
  getArticleTag().then(res => {
    interestTagItems.value = res.data.map(item => {
      return {
        isSelected: false,
        ...item
      }
    })
    unInterestTagItems.value = res.data.map(item => {
      return {
        isSelected: false,
        ...item
      }
    })
  })
})
</script>

<style lang="scss" scoped>
.info-card {
  margin-bottom: 10px;
}

.head-info {
  display: flex;

  .personal-nickname {
    font-size: 20px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    span {
      margin-right: 10px;
    }
  }

  .personal-homepage {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: var(--el-text-color-regular);

    .el-link:hover {
      color: var(--el-text-color-regular);
    }
  }
}

.avatar-uploader {
  position: relative;
  margin-right: 20px;

  :deep(.el-upload--picture-card) {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }

  .masking {
    display: none;
  }

  .avatar {
    box-shadow: 0 0 6px rgba(0, 0, 0, .12);
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }
}

.avatar-uploader:hover {
  .masking {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.personalInfoInput {
  width: 40%;
}

.personalForm-item {
  margin-bottom: 30px;
}

// 个人简介文本域
.personalForm-item:nth-child(4) div {
  width: 100%;

  div:nth-child(2) {
    width: 80%;
    text-align: right;
  }

  .personalFormTextArea-item {
    display: flex;

    .personalInfoInputTextArea {
      width: 80%;
    }

    span:nth-child(1) {
      max-width: 85%;
      //flex: 1;
    }
  }
}

.personalForm-item:hover .edit-button {
  display: flex;
}

.btn-box {
  margin-left: 20px;
}

.textarea-btn-box {
  margin-left: 0;
}

.edit-button {
  display: flex;
  align-items: center;
  color: var(--el-color-primary);
  cursor: pointer;
  display: none;
  margin-left: 20px;

  .el-icon {
    margin-right: 5px;
  }
}

.interested,
.uninterested {
  display: flex;
  align-items: center;
}

.el-collapse {
  width: 100%;
  border: none;
}

:deep(.el-collapse-item__wrap),
:deep(.el-collapse-item__header) {
  border: none
}

:deep(.el-collapse-item__arrow) {
  display: none;
}

.tagLabel {
  color: var(--el-text-color-regular);
  font-size: 14px;
  width: 120px;
  text-align: left;
}

.addTag {
  margin-right: 10px;
}

.addTagText {
  color: var(--el-color-primary);
  font-size: 14px;
}

.tag-box {
  margin-left: 120px;
  padding: 20px;
  border: 1px dotted var(--el-border-color);
  background-color: var(--el-fill-color-lighter);

  .el-button {
    margin: 0 0 15px 15px;
  }
}

.selected-tags {
  .el-tag {
    margin-right: 5px;
  }
}

.identityTagInput {
  width: 25%;
}

.identityTagItem:hover .edit-button {
  display: flex;
}
</style>