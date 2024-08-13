<template>
  <div class="sidebar" ref="sidebarRef">
    <el-card shadow="always" v-if="!isFold"
             style="min-width: 280px;min-height: calc(100vh - 230px);box-sizing: border-box">
      <template #header>
        <div class="card-header fold">
          目录
          <el-icon :size="16" @click="isFold=true">
            <Fold/>
          </el-icon>
        </div>
      </template>
      <div v-if="!catalogue.length"
           style="display: flex;flex-direction: column;justify-content: center;align-items: center;color:var(--el-text-color-regular);">
        <div>为文章增加标题以生成目录</div>
      </div>
      <div v-else>
        <div class="catalogue-item" v-for="(item,index) in catalogue" @click="scrollToId(item.id)" :style="{
                        paddingLeft:cataloguePaddingList[item.level],color:item.read?'var(--el-color-primary)':''}">
          <el-icon v-if="item.level<4&&(catalogue[index+1] && item.level<catalogue[index+1].level)" :style="{marginTop: '2px', transform : item.fold?'rotate(-90deg)':'',
                        transition:item.fold?'.4s':''}" :size="14" @click.stop="foldChange(item)">
            <CaretBottom/>
          </el-icon>
          <el-icon v-else style="margin-top: -2px;"></el-icon>
          <span class="text text-ellipsis-2">{{ item.title }}
          </span>
        </div>
      </div>
    </el-card>
    <div class="expand" @click="isFold=false">
      <span class="expand-text">目录</span>
      <el-button :icon="Expand" circle type="primary" v-if="isFold"></el-button>
    </div>
  </div>
</template>
<script setup>
import {Expand} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";

const props = defineProps({
  catalogue: {
    type: Array
  }
})
const scrollElement = ref()
const isFold = ref(false)
const sidebarRef = ref()
// 目录padding值列表
const cataloguePaddingList = ref(['10px', '25px', '40px', '55px', '70px'])
// 当前滚动到的标题索引
const currentScrollIndex = ref()

const scrollToId = (id) => {
  let el = document.getElementById(id)
  scrollElement.value.scrollTo({top: el.offsetTop - 70, behavior: 'smooth'})
}
const foldChange = (currentItem) => {
  currentItem.fold = !currentItem.fold
  const els = document.querySelectorAll(".catalogue-item")
  let isContinue = true
  props.catalogue.forEach((item, index) => {
    // 点击目录项的折叠按钮后遍历目录
    // 仅当遍历的索引值大于等于当前点击目录项的索引值时执行
    if (index >= currentItem.index) {
      // 当遍历到的目录项等级小于当前点击目录项的等级 (level 值越小, 等级越大)
      // 并且当前折叠状态是折叠
      // 并且需要继续遍历时 (判断是否继续遍历的依据: 是否遍历到大于等于当前点击目录项等级的目录项)
      if (item.level > currentItem.level && currentItem.fold && isContinue) {
        // 折叠目录
        els[index].style.display = "none"
        // 当遍历到的目录项等级大于等于当前点击目录项的等级
        // 并且折叠状态是折叠
        // 并且遍历到的目录项并非当前点击的目录项时 (判断是否为当前点击的目录项的依据是: 索引值是否相等)
      } else if (item.level <= currentItem.level && currentItem.fold && index !== currentItem.index) {
        // 停止继续遍历
        isContinue = false
      } else {
        // 展开目录
        els[index].style.display = "flex"
      }
    }
  })
}
onMounted(() => {
  scrollElement.value = document.querySelector(".editor-container")
  scrollElement.value.addEventListener("scroll", () => {
    props.catalogue.forEach((item, index) => {
      item.read = false
      if (scrollElement.value.scrollTop + 75 > item.e.offsetTop) {
        currentScrollIndex.value = index
      }
    })
    if (currentScrollIndex.value !== undefined)
      props.catalogue[currentScrollIndex.value].read = true

  })
})
defineExpose({
  sidebarRef
})
</script>

<style scoped lang="scss">
.sidebar {
  z-index: 99;
  position: absolute;
  top: 149px;
  left: 0;
  max-width: 280px;
  margin-left: 20px;

  .el-card {
    padding: 0 20px;
    border: none;

    .catalogue-item {
      color: var(--el-text-color-regular);
      display: flex;
      box-sizing: border-box;
      cursor: pointer;
      margin-bottom: 10px;

      .text {
        font-size: 14px;
      }
    }

    .catalogue-item:hover {
      color: var(--el-color-primary);
    }

    :deep(.el-card__header) {
      padding: 18px 0;
    }

    :deep(.el-card__body) {
      padding: 20px 0;
    }

    .fold {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }
  }

  .expand {
    .expand-text {
      display: none;
      font-size: 14px;
      transition: .4s;
    }

    .el-button {
      transition: .4s;
    }

    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 48px;
    padding-left: 10px;
    width: 64px;
    transition: .4s;
  }

  .expand:hover {
    .el-button {
      transform: translateX(32px);
      transition: .4s;
    }

    .expand-text {
      position: absolute;
      display: inline-block;
      transition: .4s;
    }

    background-color: var(--el-bg-color);
    transition: .4s;
  }
}
</style>