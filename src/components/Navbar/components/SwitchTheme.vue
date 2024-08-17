<template>
  <div style="display: flex;align-items: center;margin-left: 10px">
    <el-switch
        v-model="globalStore.openDarkTheme"
        @click="changeTheme($event)"
        :before-change="beforeChange"
    >
      <template #active-action>
        <SvgIcon icon-class="dark-icon" icon-name="moon"/>
      </template>
      <template #inactive-action>
        <SvgIcon icon-class="light-icon" icon-name="sun"/>
      </template>
    </el-switch>
  </div>
</template>

<script setup>
import useGlobalStore from "@/store/modules/global.js";
import {useDark, useToggle} from "@vueuse/core";
import {onMounted} from "vue";

const isDark = useDark()
const toggleDark = useToggle(isDark)
const globalStore = useGlobalStore()
const beforeChange = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(true)
    }, 0)
  })
}
const changeTheme = (e) => {
  if (!document.startViewTransition) {
    toggleDark()
  } else {
    // 获取到 transition API 实例
    const transition = document.startViewTransition(() => {
      toggleDark()
    })
    // 在 transition.ready 的 Promise 完成后，执行自定义动画
    transition.ready.then(() => {
      // 由于我们要从鼠标点击的位置开始做动画，所以我们需要先获取到鼠标的位置
      const {clientX, clientY} = e

      // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
      const radius = Math.hypot(
          Math.max(clientX, innerWidth - clientX),
          Math.max(clientY, innerHeight - clientY)
      )
      const clipPath = [
        `circle(0% at ${clientX}px ${clientY}px)`,
        `circle(${radius}px at ${clientX}px ${clientY}px)`
      ]
      const isDark = globalStore.openDarkTheme
      // 自定义动画
      document.documentElement.animate(
          {
            // 如果要切换到暗色主题，我们在过度的时候从半径 100% 的圆开始，到 0% 的圆结束
            clipPath: isDark ? clipPath.reverse() : clipPath
          },
          {
            duration: 500,
            // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容
            pseudoElement: isDark
                ? '::view-transition-old(root)'
                : '::view-transition-new(root)'
          }
      )
    })
  }
}
onMounted(()=>{
  if (isDark.value) {
    globalStore.openDarkTheme = true
  }
})
</script>

<style scoped lang="scss">
.dark-icon {
  border-radius: 50%;
  color: #cfd3dc;
  background-color: #141414;
}

.light-icon {
  color: var(--el-text-color-regular);
}
</style>