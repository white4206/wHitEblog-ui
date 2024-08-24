<template>
  <div class="favorite-box">
    <el-card style="border: none" shadow="never">
      <div class="left-tab">
        <el-menu @select="handleSelect" :default-active="defaultActive">
          <el-menu-item @click="showNewFolderDialog=true">
            <div class="center">
              <el-icon>
                <FolderAdd/>
              </el-icon>
              新建收藏夹
            </div>
          </el-menu-item>
          <el-menu-item :index="item.id+''" v-for="item in favoriteFolders">
            <draggable
                ghost-class="ghost"
                style="position:absolute;width: 100%;height: 100%;left: 0;top: 0;"
                :group="{name:'favorite',put:true,pull:false}"
                v-model="moveFavorites"
                @start="drag=true"
                @end="drag=false"
                @change="(argument)=>changeFavoriteFolder(argument,item)"
                handle=".drag"
                item-key="id">
              <template #item="{element}">
                {{ element ? '' : '' }}
              </template>
            </draggable>
            <div class="menu-item-left">
              <div class="center">
                <div v-if="item.isDefault">
                  <el-icon>
                    <Folder/>
                  </el-icon>
                  <el-icon style="position: absolute;top:22px;left: 20px" :size="6">
                    <Lock/>
                  </el-icon>
                </div>
                <el-icon v-else>
                  <Folder/>
                </el-icon>
                {{ item.name }}
              </div>
            </div>
            <div class="menu-item-right">
              <div class="center">
                <el-icon size="small">
                  <Document/>
                </el-icon>
                {{ item.total }}
              </div>
            </div>
          </el-menu-item>
        </el-menu>
      </div>
      <el-dialog style="padding:30px 50px 20px 50px" v-model="showNewFolderDialog" width="450" :show-close="false">
        <template #header>
          <div style="display: flex;align-items: center;">
            <el-icon size="24" color="var(--el-color-warning)">
              <QuestionFilled/>
            </el-icon>
            <span style="margin-left: 15px;">新建收藏夹</span>
          </div>
        </template>
        <el-form :model="newFolderForm" ref="newFolderRef" :rules="newFolderRules" label-position="top"
                 hide-required-asterisk>
          <el-form-item label="标题" prop="name">
            <el-input style="width: 280px" v-model="newFolderForm.name" placeholder="请填写收藏夹的名称" clearable/>
          </el-form-item>
          <el-form-item label="描述（选填） " prop="description">
            <el-input style="width: 280px" v-model="newFolderForm.description" :rows="4" resize="none" type="textarea"
                      placeholder="请输入描述内容" clearable/>
          </el-form-item>
          <el-form-item label="私密" prop="isPrivate">
            <el-radio-group v-model="newFolderForm.isPrivate">
              <el-radio :value="1" size="large">
                <span style="font-weight: normal;color:var(--el-text-color-regular)">
                  <b style="color: var(--el-text-color-primary)">公开 </b>
                  所有人可见
                </span>
              </el-radio>
              <el-radio :value="0" size="large">
                <div style="font-weight: normal;color:var(--el-text-color-regular)">
                  <b style="color: var(--el-text-color-primary)">私密 </b>
                  只有你可以查看这个收藏夹
                </div>
                <div v-if="newFolderForm.isPrivate===0"
                     style="color:var(--el-text-color-regular);position:absolute;left:0;">
                  <p style="line-height: 1.5;color:var(--el-color-primary);font-size: 12px">
                    转为私密收藏夹，关注者将被取消收藏与<br/>
                    查看权限，请谨慎操作
                  </p>
                </div>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button round @click="cancelNewFolder">取消</el-button>
            <el-button round type="primary" @click="newFolder">确认</el-button>
          </div>
        </template>
      </el-dialog>
      <el-dialog style="padding:30px 50px 20px 50px" v-model="showDelFolderDialog" width="450" :show-close="false">
        <template #header>
          <div style="display: flex;align-items: center;">
            <el-icon size="24" color="var(--el-color-warning)">
              <QuestionFilled/>
            </el-icon>
            <span style="margin-left: 15px;">删除收藏夹</span>
          </div>
        </template>
        <el-form :model="delFolderForm" ref="delFolderRef" :rules="delFolderRules" label-position="top"
                 hide-required-asterisk>
          <el-form-item label="收藏夹的内容" prop="operation">
            <el-radio-group v-model="delFolderForm.operation">
              <el-radio :value="0" size="large">
                <el-select v-model="delFolderForm.moveFolderTo" style="width: 280px;" clearable
                           placeholder="移动到其他收藏夹">
                  <el-option v-for="item in favoriteFolders" :label="item.name" :value="item.id"/>
                </el-select>
              </el-radio>
              <el-radio :value="1" size="large">
                <span style="font-weight: normal;color:var(--el-text-color-regular)">
                  一并删除（删除操作不可恢复！）
                </span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button round @click="cancelDelFolder">取消</el-button>
            <el-button round type="primary" @click="delFolder">确认</el-button>
          </div>
        </template>
      </el-dialog>
      <el-dialog style="padding:30px 50px 20px 50px" v-model="showSetPrivateDialog" width="450" :show-close="false">
        <template #header>
          <div style="display: flex;align-items: center;">
            <el-icon size="24" color="var(--el-color-warning)">
              <QuestionFilled/>
            </el-icon>
            <span style="margin-left: 15px;">设置私密</span>
          </div>
        </template>
        <el-form :model="setPrivateForm" ref="setPrivateRef" :rules="setPrivateRules" label-position="top"
                 hide-required-asterisk>
          <el-form-item prop="isPrivate">
            <el-radio-group v-model="setPrivateForm.isPrivate">
              <el-radio :value="1" size="large">
                <span style="font-weight: normal;color:var(--el-text-color-regular)">
                 公开 所有人可见
                </span>
              </el-radio>
              <el-radio :value="0" size="large">
                <div style="font-weight: normal;color:var(--el-text-color-regular)">
                  私密 只有你可以查看这个收藏夹
                </div>
                <div v-if="setPrivateForm.isPrivate===0"
                     style="color:var(--el-text-color-regular);position:absolute;left:0;">
                  <p style="line-height: 1.5;color:var(--el-color-primary);font-size: 12px">
                    转为私密收藏夹，关注者将被取消收藏与查<br/>
                    看权限，请谨慎操作
                  </p>
                </div>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button round @click="cancelSetPrivate">取消</el-button>
            <el-button round type="primary" @click="setPrivate">确认</el-button>
          </div>
        </template>
      </el-dialog>
      <el-dialog style="padding:30px 50px 20px 50px" v-model="showMoveFolderDialog" width="450" :show-close="false">
        <template #header>
          <div style="display: flex;align-items: center;">
            <el-icon size="24" color="var(--el-color-warning)">
              <QuestionFilled/>
            </el-icon>
            <span style="margin-left: 15px;">移动至其他收藏夹</span>
          </div>
        </template>
        <el-form :model="moveFolderForm" ref="moveFolderRef" :rules="moveFolderRules" label-position="top"
                 hide-required-asterisk>
          <el-form-item label="移动到" prop="moveFolderTo">
            <el-select v-model="moveFolderForm.moveFolderTo" style="width: 280px;" clearable
                       placeholder="请选择移动的文件夹">
              <el-option v-for="item in favoriteFolders" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button round @click="cancelMoveFolder">取消</el-button>
            <el-button round type="primary" @click="moveFolder">确认</el-button>
          </div>
        </template>
      </el-dialog>
      <div class="right-content">
        <div class="title-form">
          <el-form>
            <el-form-item>
              <div v-if="!isEditName" class="form-item">
                <div style="display: flex;align-items: center;">
                  <span class="content">我的收藏夹</span>
                  <el-icon style="cursor:pointer" @click="isEditName=true">
                    <Edit/>
                  </el-icon>
                </div>
                <el-tag effect="plain">
                  <el-icon>
                    <Rank/>
                  </el-icon>
                  可拖拽博文至其他收藏夹进行分类修改
                </el-tag>
              </div>
              <div class="form-input" v-else>
                <el-input style="width: 300px;margin-right: 10px;"/>
                <el-button type="danger" :icon="CloseBold" size="small" circle @click="isEditName=false"/>
                <el-button type="success" :icon="Select" size="small" circle/>
              </div>
            </el-form-item>
            <el-form-item>
              <div style="display: flex;justify-content: space-between;width: 100%">
                <div v-if="!isEditDesc" class="form-item">
                  <div style="display: flex;align-items: center;">
                    <span class="content">我的收藏夹的描述</span>
                    <el-icon style="cursor:pointer;" @click="isEditDesc=true">
                      <Edit/>
                    </el-icon>
                  </div>
                </div>
                <div class="form-input" v-else>
                  <el-input style="width: 300px;margin-right: 10px;"/>
                  <el-button type="danger" :icon="CloseBold" size="small" circle @click="isEditDesc=false"/>
                  <el-button type="success" :icon="Select" size="small" circle/>
                </div>
                <div v-if="!isBatchOpt" class="operation">
                  <el-button type="primary" link @click="delFolderOperation">删除收藏夹</el-button>
                  <el-divider direction="vertical"/>
                  <el-button type="primary" link @click="isBatchOpt=true">批量移动</el-button>
                  <el-divider direction="vertical"/>
                  <el-button type="primary" link @click="showSetPrivateDialog=true">设为公开</el-button>
                  <el-tooltip effect="light" placement="top-start">
                    <template #content>
                      <div style="padding: 10px;font-size: 14px;color: var(--el-text-color-regular)">
                        当前文件夹为私密状态
                      </div>
                    </template>
                    <template #default>
                      <el-icon style="margin-left: 5px" size="large" color="var(--el-text-color-placeholder)">
                        <QuestionFilled/>
                      </el-icon>
                    </template>
                  </el-tooltip>
                </div>
                <div v-else class="operation">
                  <el-button type="primary" link @click="ElMessage.success('取消这些收藏成功')">取消收藏</el-button>
                  <el-divider direction="vertical"/>
                  <el-button type="primary" link @click="showMoveFolderDialog=true">移至其他收藏夹</el-button>
                  <el-divider direction="vertical"/>
                  <el-button type="primary" link @click="isBatchOpt=false">退出</el-button>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="favorite-content">
          <el-tabs v-model="activeTab" @tab-change="tabChange" @tab-click="tabClick">
            <el-tab-pane label="全部" name="total">
              <el-card v-if="isBatchOpt" class="drag"
                       style="border: none;margin: 10px"
                       shadow="hover">
                <div style="display: flex;align-items: center;">
                  <el-checkbox v-model="isCheckedAll" :indeterminate="isIndeterminate"
                               @change="checkAll" style="margin-left: 5px" size="large">全选
                  </el-checkbox>
                  <span style="font-size: 12px;margin-left: 20px;color:var(--el-text-color-secondary)">
                    已选择 {{ selectNum }}
                  </span>
                </div>
              </el-card>
              <draggable
                  ghost-class="ghost"
                  v-model="favorites"
                  :group="{name:'favorite',put:false,pull:true}"
                  @start="drag=true"
                  @end="drag=false"
                  handle=".drag"
                  item-key="id">
                <template #item="{element}">
                  <el-card class="drag" style="border: 1px solid var(--el-border-color-lighter);margin: 10px"
                           shadow="hover">
                    <div class="favorite-content-item">
                      <div class="title">
                        <el-checkbox v-if="isBatchOpt" v-model="element.isChecked" @change="check"
                                     style="position:absolute;left:-20px;" size="large"></el-checkbox>
                        <span style="margin-right: 5px">
                          <el-tag type="info" size="small" effect="plain">
                          {{ element.type ? 'DOWNLOAD' : 'BLOG' }}
                          </el-tag>
                        </span>
                        <span style="cursor: pointer;" @click="toDetails(`/blog/details/${element.id}`)">
                          {{ element.contentTitle }}
                        </span>
                      </div>
                      <span style="cursor: pointer;" @click="cancelFavorite(element)">
                    <el-icon v-if="!isBatchOpt" :size="24"
                             :color="element.isFavorite?'#ffcc76':'var(--el-text-color-disabled)'">
                      <StarFilled/>
                    </el-icon>
                  </span>
                    </div>
                  </el-card>
                </template>
              </draggable>
            </el-tab-pane>
            <el-tab-pane label="博客" name="blog"></el-tab-pane>
            <el-tab-pane label="下载" name="download"></el-tab-pane>
          </el-tabs>
          <div class="search-box">
            <el-input
                v-model="searchValue"
                style="width: 250px"
                placeholder="输入关键词"
            >
              <template #prefix>
                <el-select v-model="searchArea" style="width: 50px">
                  <el-option label="当前" value="1">
                    当前文件夹
                  </el-option>
                  <el-option label="全部" value="2">
                    全部文件夹
                  </el-option>
                </el-select>
                <el-divider direction="vertical"/>
              </template>
              <template #suffix>
                <el-button link :icon="Search"/>
              </template>
            </el-input>
          </div>
          <div style="margin-top: 50px">
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
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import {CloseBold, Search, Select} from '@element-plus/icons-vue'
import {onMounted, ref} from 'vue'
import {getFavorite, getFavoriteFolder} from "@/api/favorite.js";
import {useRoute, useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import draggable from 'vuedraggable'
import {validFolderName} from "@/utils/validate.js";
import toDetails from "@/utils/toDetails.js";

const selectNum = ref(0)
const isBatchOpt = ref(false)
const newFolderForm = ref({
  name: null,
  description: null,
  isPrivate: 1
})
const newFolderRef = ref()
const newFolderRules = ref({
  name: [{required: true, trigger: "blur", validator: validFolderName}],
  description: [{required: false, trigger: "blur"}],
  isPrivate: [{required: true, trigger: "blur", message: "请选择收藏夹私密状态"}]
})
const delFolderForm = ref({
  operation: 0,
  moveFolderTo: null
})
const delFolderRef = ref()
const delFolderRules = ref({
  operation: [{required: true, trigger: "blur", message: "请选择对收藏夹内容的操作"}],
})
const setPrivateForm = ref({
  isPrivate: null,
})
const setPrivateRef = ref()
const setPrivateRules = ref({
  isPrivate: [{required: true, trigger: "blur", message: "请选择收藏夹私密状态"}],
})
const moveFolderForm = ref({
  moveFolderTo: null,
})
const moveFolderRef = ref()
const moveFolderRules = ref({
  moveFolderTo: [{required: true, trigger: "blur", message: "请选择要移动到的文件夹"}],
})
const showDelFolderDialog = ref(false)
const showSetPrivateDialog = ref(false)
const showNewFolderDialog = ref(false)
const showMoveFolderDialog = ref(false)
const currentPage = ref()
const currentSize = ref(5)
const total = ref(10)
const drag = ref(false)
const router = useRouter()
const route = useRoute()
const activeTab = ref("total")
const isEditName = ref(false)
const isEditDesc = ref(false)
const searchArea = ref("1")
const searchValue = ref()
const favoriteFolders = ref([])
const favorites = ref([])
const moveFavorites = ref([])
const defaultActive = ref()
const isCheckedAll = ref(false)
const isIndeterminate = ref(false)

const checkAll = () => {
  if (isCheckedAll.value) {
    favorites.value.forEach((item, index) => {
      favorites.value[index].isChecked = true
      isIndeterminate.value = false
      selectNum.value = favorites.value.length
    })
  } else {
    favorites.value.forEach((item, index) => {
      favorites.value[index].isChecked = false
      selectNum.value = 0
    })
  }
}
const check = () => {
  isIndeterminate.value = false
  selectNum.value = 0
  let flag = false
  favorites.value.forEach(item => {
    if (!item.isChecked)
      flag = true
    else {
      selectNum.value++
      isIndeterminate.value = true
    }
  })
  isCheckedAll.value = !flag;
}
const delFolderOperation = () => {
  if (favorites.value.length)
    showDelFolderDialog.value = true
  else
    ElMessage.success("删除成功")
}
const cancelDelFolder = () => {
  ElMessage.info("取消新建")
  delFolderRef.value.resetFields()
  showDelFolderDialog.value = false
}
const delFolder = () => {
  delFolderRef.value.validate(valid => {
    if (valid) {
      ElMessage.success("新建")
      showDelFolderDialog.value = false
    }
  })
}
const cancelSetPrivate = () => {
  ElMessage.info("取消新建")
  setPrivateRef.value.resetFields()
  showSetPrivateDialog.value = false
}
const setPrivate = () => {
  setPrivateRef.value.validate(valid => {
    if (valid) {
      ElMessage.success("新建")
      showSetPrivateDialog.value = false
    }
  })
}
const cancelNewFolder = () => {
  ElMessage.info("取消新建")
  newFolderRef.value.resetFields()
  showNewFolderDialog.value = false
}
const newFolder = () => {
  newFolderRef.value.validate(valid => {
    if (valid) {
      ElMessage.success("新建")
      showNewFolderDialog.value = false
    }
  })
}
const cancelMoveFolder = () => {
  ElMessage.info("取消新建")
  moveFolderRef.value.resetFields()
  showMoveFolderDialog.value = false
}
const moveFolder = () => {
  moveFolderRef.value.validate(valid => {
    if (valid) {
      ElMessage.success("新建")
      showMoveFolderDialog.value = false
    }
  })
}
const getFavoriteData = (id) => {
  getFavorite(id).then((res) => {
    favorites.value = res.data.map(item => {
      return {
        ...item,
        isChecked: false,
        isFavorite: true
      }
    })
  })
}
const handleSelect = (index) => {
  router.push({query: {folder: index}})
  activeTab.value = "total"
  getFavoriteData(index)
}
const cancelFavorite = (item) => {
  item.isFavorite = false
  ElMessage.success("取消收藏")
}
const changeFavoriteFolder = (argument, item) => {
  console.log(argument.added.element)
  console.log(item)
  console.log(favorites.value)
  console.log(moveFavorites.value)
  ElMessage.success("切换至收藏夹 - " + item.name + " - 成功")
}
const pageChange = () => {
  // document.documentElement.scrollTop = 0
  // queryParams.value.pageNum = currentPage.value
  // queryParams.value.pageCount = currentSize.value
  // loading.value = true
  // getData()
}
const tabChange = () => {

}
const tabClick = (tab) => {
  router.push({query: {folder: defaultActive.value, tab: tab.paneName}})
}
onMounted(() => {
  if (route.query.tab)
    activeTab.value = route.query.tab
  getFavoriteFolder().then(res => {
    favoriteFolders.value = res.data
    if (route.query.folder)
      defaultActive.value = route.query.folder
    else
      defaultActive.value = res.data[0].id + ""
    getFavoriteData(res.data[0].id)
  })
})
</script>
<style scoped lang="scss">
.favorite-box {

  :deep(.el-card__body) {
    display: flex;
    padding: 0;
  }

  .left-tab {
    .el-menu {
      width: 200px;
      min-height: 100vh;
      border-right: 1px solid var(--el-border-color-lighter);
    }

    .el-menu-item {
      border-bottom: 1px solid var(--el-border-color-lighter);
      padding: 15px 20px;
      height: 65px;
      color: var(--el-text-color-regular);
      line-height: initial;
      justify-content: space-between;

      .menu-item-left {
        display: flex;
        align-items: start;
        height: 100%;
      }

      .menu-item-right {
        display: flex;
        height: 100%;
        align-items: end;
      }

      .center {
        display: flex;
        align-items: center;
      }
    }

    .el-menu-item.is-active {
      color: var(--el-color-primary);
      background-color: var(--el-color-primary-light-9);
    }
  }

  .right-content {
    width: 100%;

    .title-form {
      padding: 20px 20px 0 20px;
      border-bottom: 1px solid var(--el-border-color-lighter);

      .form-item {
        width: 100%;
        color: var(--el-text-color-regular);
        display: flex;
        justify-content: space-between;
        align-items: center;

        :deep(.el-tag__content) {
          display: flex;
          align-items: center;
        }

        .content {
          margin-right: 10px;
        }
      }

      .form-input {
        display: flex;
        align-items: center;
      }

      .operation {
        display: flex;
        align-items: center;
      }
    }

    .favorite-content {
      position: relative;
      padding: 20px;

      .favorite-content-item {
        width: 100%;
        padding: 15px 25px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title {
          position: relative;
          color: var(--el-text-color-regular);
          font-size: 14px;
          display: flex;
          align-items: center;
        }
      }

      .favorite-content-item:hover {
        .title {
          color: var(--el-color-primary);
        }
      }

      .search-box {
        position: absolute;
        top: 20px;
        right: 20px;

        :deep(.el-input-group__prepend) {
          width: 35px;
        }

        :deep(.el-input-group__append), :deep(.el-input-group__prepend) {
          background-color: transparent;
        }

        :deep(.el-select__placeholder) {
          color: var(--el-text-color-secondary);
        }

        :deep(.el-select__wrapper) {
          box-shadow: none;
          padding: 0;
        }
      }
    }
  }
}

.ghost {
  opacity: 0.01 !important;
}
</style>