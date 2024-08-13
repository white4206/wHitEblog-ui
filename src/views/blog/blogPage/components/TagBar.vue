<template>
  <div @mouseenter="isOpen = true" @mouseleave="isOpen = false">
    <div class="tagBar-box" @mouseover="overTagBar" @mouseout="outTagBar">
      <div class="tagBar" ref="tagBarRef" :style="{ height: tagBarHeight }">
        <div class="arrowDown" v-if="!isOpen">
          <el-icon :size="10">
            <ArrowDownBold/>
          </el-icon>
        </div>
        <ul ref="tagItemsRef">
          <li v-for="item in tagItems" :key="item.id" @click="selectTag(item.id,$event)" class="tagItem">
            {{ item.name }}
          </li>
        </ul>
        <div class="arrowUp" v-if="isOpen">
          <el-icon :size="10">
            <ArrowUpBold/>
          </el-icon>
        </div>
      </div>
    </div>
    <div v-if="tagId" class="querySelectForm">
      <el-radio-group v-model="childTagId" size="default" @change="querySelectChange">
        <el-radio-button label="全部" value="default"/>
        <el-radio-button label="javascript" value="latest"/>
        <el-radio-button label="css3" value="hot"/>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup>
import {ArrowDownBold, ArrowUpBold} from "@element-plus/icons-vue";
import {nextTick, onMounted, ref} from "vue";
import {getArticleTag} from "@/api/blog.js";
import {useRoute, useRouter} from "vue-router";

const emits = defineEmits(["update:tagId", "update:childTagId", "getData", "reset"])
const props = defineProps({
  tagId: {
    type: Number,
  },
  childTagId: {
    type: String,
  }
})
const tagId = ref(props.tagId)
const childTagId = ref(props.childTagId)
const route = useRoute()
const router = useRouter()
const tagBarRef = ref()
const isOpen = ref(false)
const tagItemsRef = ref()
const tagBarHeight = ref()
const lastTagTarget = ref()
const tagItems = ref([])

const overTagBar = () => {
  isOpen.value = true
  tagBarHeight.value = tagItemsRef.value.offsetHeight + "px"
}
const outTagBar = () => {
  isOpen.value = false
  tagBarHeight.value = "20px"
}
const querySelectChange = () => {
  emits("update:childTagId", childTagId.value)
}
const selectTag = (id, e) => {
  // 如果存在上一个选中的标签则移除其激活状态
  if (lastTagTarget.value) {
    // 如果上一个选中的标签是当前选中的标签则移除其激活状态并重置条件
    try {
      if (lastTagTarget.value === e.target) {
        lastTagTarget.value.classList.remove("isActive")
        // 重置上一个选中的标签
        lastTagTarget.value = undefined
        id = null
        router.push({query: {childTag: childTagId.value || undefined, tag: undefined}})
      }
      // 如果上一个选中的标签不是当前选中的标签则移除其激活状态并给当前选中的标签添加激活状态
      else {
        lastTagTarget.value.classList.remove("isActive")
        e.target.classList.add("isActive")
        // 存储当前选中的标签
        lastTagTarget.value = e.target;
        router.push({query: {childTag: childTagId.value || undefined, tag: id}})
      }
    } catch (e) {

    }
  } else {
    // 给当前选中的标签添加其激活状态
    e.target.classList.add("isActive")
    // 存储当前选中的标签
    lastTagTarget.value = e.target;
    router.push({query: {childTag: childTagId.value || undefined, tag: id}})
  }
  emits("reset")
  tagId.value = id;
  emits("update:tagId", tagId.value)
  emits("getData")
}

onMounted(() => {
  // 初始化参数(大部分根据当前路由状态初始化)
  tagId.value = route.query.tag || null
  if (route.query.childTag)
    childTagId.value = route.query.childTag;
  // 获取文章标签数据
  getArticleTag().then(res => {
    tagItems.value = res.data
    // 缓存标签的id为一个数组
    let tempIds = res.data.map(item => {
      return item.id
    })
    // 在下一次DOM更新后异步执行
    // (由于初始化挂载时异步请求的数据还未拿回, 标签栏需该数据动态渲染，故此时也无法获取到节点, 所以需要等待下一次DOM更新)
    nextTick(() => {
      if (route.query.tag) {
        tagId.value = route.query.tag
        // 根据id查询tagIds缓存获取刷新后激活标签的索引
        let index = tempIds.indexOf(Number(route.query.tag))
        tagItemsRef.value.children[index].classList.add("isActive")
        // 存储激活的标签
        lastTagTarget.value = tagItemsRef.value.children[index]
      }
    })
  })
})
</script>

<style scoped lang="scss">
.tagBar-box {
  //margin-top: 100px;
  margin-bottom: 10px;
  height: 70px;
}

.tagBar {
  //box-shadow: 0 4px 30px 0 var(--el-border-color-lighter);
  box-shadow: 0 0 6px var(--el-border-color-lighter);
  z-index: 100;
  background-color: var(--el-bg-color);
  padding: 25px;
  height: 20px;
  min-height: 20px;
  line-height: 1.5;
  overflow-y: hidden;
  transition: .4s;
  position: relative;

  ul {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;

    li {
      margin: 0 30px 20px 0;
    }
  }
}

.tagBar:hover {
  padding-bottom: 0;
  border-radius: 0 0 5px 5px;
  transition: .4s;
}

.tagItem {
  cursor: pointer;
  color: var(--el-text-color-regular);
}

.isActive {
  color: var(--el-color-primary);
  font-weight: 500;
}

.tagItem:hover {
  color: var(--el-text-color-primary);
}

.isActive:hover {
  color: var(--el-color-primary);
}

.arrowDown {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 30px;
  height: 10px;
  line-height: 10px;
  border-radius: 10px 10px 0 0;
  text-align: center;
  background-color: var(--el-bg-color-page);
}

.arrowUp {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 30px;
  height: 10px;
  line-height: 10px;
  border-radius: 10px 10px 0 0;
  text-align: center;
  background-color: var(--el-bg-color-page);
}

.querySelectForm {
  margin-bottom: 10px;

  :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
    border-radius: 20px;
    padding: 5px 15px;
    color: var(--el-text-color-primary);
    background-color: var(--el-color-info-light-7);
    border: none;
    box-shadow: none;
  }

  :deep(.el-radio-button__inner) {
    font-weight: normal;
    margin-top: 10px;
    margin-right: 15px;
    border-radius: 20px;
    padding: 5px 15px;
    background-color: var(--el-color-info-light-9);
    border: none;
  }

  :deep(.el-radio-button__inner:hover) {
    color: var(--el-text-color-primary);
  }
}
</style>