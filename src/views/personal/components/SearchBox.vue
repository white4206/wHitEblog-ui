<template>
  <div class="search-box">
    <div class="search" v-if="!isSearch">
      <el-input suffix-icon="search" placeholder="搜索TA的内容" @click="showSearch"/>
    </div>
    <div class="search-input" v-else>
      <el-icon>
        <Search/>
      </el-icon>
      <el-input v-model="searchValue" @keyup.enter="searchArticle" placeholder="搜索TA的内容"
                style="width: 90%;" ref="searchInputRef"/>
      <span class="search-btn" @click="searchArticle">搜索</span>
      <el-divider direction="vertical"/>
      <span class="cancel-btn" @click="cancelSearch">取消</span>
    </div>
  </div>
</template>

<script setup>
import {ElMessage} from "element-plus";
import {ref} from "vue";

const emits = defineEmits(["update:showTabItem"])
const props = defineProps({
  authorId: {
    type: String
  }
})
const searchInputRef = ref()
const searchValue = ref()
const isSearch = ref(false)

const searchArticle = () => {
  if (searchValue.value)
    window.open(location.href.split("#")[0] +
        `#/searchPage?author=${props.authorId}&q=${searchValue.value}`)
  else
    ElMessage.info("请输入搜索内容")
}
const cancelSearch = () => {
  isSearch.value = false
  emits("update:showTabItem", "flex")
}
const showSearch = () => {
  isSearch.value = true
  setTimeout(() => {
    searchInputRef.value.focus()
  })
  emits("update:showTabItem", "none")
}
</script>

<style scoped lang="scss">
.search-box {
  position: relative;

  .search {
    position: absolute;
    z-index: 99;
    top: 10px;
    right: 20px;
    width: 240px;

    :deep(.el-input__wrapper) {
      border-radius: 50px;
      background-color: var(--el-fill-color-lighter);
    }

    :deep(.el-select__placeholder.is-transparent) {
      color: var(--el-text-color-regular);
    }

    :deep(.el-input__inner::placeholder) {
      color: var(--el-text-color-regular);
    }
  }

  .search-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    height: 49.8px;
    padding: 10px 20px 0 20px;

    :deep(.el-input__wrapper) {
      box-shadow: none;
      background-color: transparent;
    }

    :deep(.el-input__inner) {
      color: var(--el-text-color-primary);
    }

    .search-btn {
      cursor: pointer;
      font-size: 14px;
    }

    .search-btn:hover {
      color: var(--el-color-primary);
    }

    .cancel-btn {
      cursor: pointer;
      font-size: 14px;
      color: var(--el-text-color-regular);
    }
  }
}
</style>