<!--<script setup>-->
<!--import {useDark, useToggle} from '@vueuse/core'-->

<!--const isDark = useDark()-->
<!--const toggleDark = useToggle(isDark)-->
<!--const scrollToId = (id) => {-->
<!--  let el = document.getElementById(id)-->
<!--  el.scrollIntoView({behavior: 'smooth', block: 'center'})-->
<!--}-->

<!--// 点击按钮时切换主题-->
<!--const changeTheme = (e) => {-->
<!--  // 获取到 transition API 实例-->
<!--  const transition = document.startViewTransition(() => {-->
<!--    toggleDark()-->
<!--  })-->

<!--  // 在 transition.ready 的 Promise 完成后，执行自定义动画-->
<!--  transition.ready.then(() => {-->
<!--    // 由于我们要从鼠标点击的位置开始做动画，所以我们需要先获取到鼠标的位置-->
<!--    const {clientX, clientY} = e-->

<!--    // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径-->
<!--    const radius = Math.hypot(-->
<!--        Math.max(clientX, innerWidth - clientX),-->
<!--        Math.max(clientY, innerHeight - clientY)-->
<!--    )-->
<!--    const clipPath = [-->
<!--      `circle(0% at ${clientX}px ${clientY}px)`,-->
<!--      `circle(${radius}px at ${clientX}px ${clientY}px)`-->
<!--    ]-->
<!--    const isDark = document.documentElement.classList.contains('dark')-->
<!--    // 自定义动画-->
<!--    document.documentElement.animate(-->
<!--        {-->
<!--          // 如果要切换到暗色主题，我们在过渡的时候从半径 100% 的圆开始，到 0% 的圆结束-->
<!--          clipPath: isDark ? clipPath.reverse() : clipPath-->
<!--        },-->
<!--        {-->
<!--          duration: 500,-->
<!--          // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容-->
<!--          pseudoElement: isDark-->
<!--              ? '::view-transition-old(root)'-->
<!--              : '::view-transition-new(root)'-->
<!--        }-->
<!--    )-->
<!--  })-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <el-button @click="changeTheme($event)">-->
<!--    切换主题色-->
<!--  </el-button>-->
<!--  <div style="position: fixed;">-->
<!--    <a @click="scrollToId('h1')">h1</a>-->
<!--    <a @click="scrollToId('h2')">h2</a>-->
<!--    <a @click="scrollToId('h3')">h3</a>-->
<!--  </div>-->
<!--  <div id="h2" style="height: 1000px;background-color: var(&#45;&#45;el-bg-color)"></div>-->
<!--</template>-->

<!--<style scoped lang="scss">-->
<!--.background {-->
<!--  background-color: var(&#45;&#45;el-main-bg-color);-->
<!--}-->
<!--</style>-->
<!--<style>-->
<!--/*主题切换动画*/-->
<!--::view-transition-new(root),-->
<!--::view-transition-old(root) {-->
<!--  /* 关闭默认动画，否则影响自定义动画的执行 */-->
<!--  animation: none;-->
<!--}-->

<!--.dark::view-transition-old(root) {-->
<!--  z-index: 100;-->
<!--}-->
<!--</style>-->
<template>
  <div ref="root">
    <el-button @click="onClick">弹框</el-button>
    <DragDialog
        v-model:dragDialog="dialogDrag"
        :dragArr="myArray"
        @submitDrag="submitDrag"
        @checkoutChange="checkoutChange"
        @onDragStart="onDragStart"
        @onDragEnd="onDragEnd"
    ></DragDialog>
  </div>
  <!--  <video id="player" >-->
  <!--    <source src="./jojo.mp4" type="video/mp4" size="576"/>-->
  <!--    <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4" type="video/mp4" size="1080">-->
  <!--  </video>-->
  <SvgIcon icon-name="demo" size="40px"/>
  <IconSelect style="width: 300px" @selected="selected"></IconSelect>

  <div class="box"></div>

</template>


<script setup>
import DragDialog from "@/views/demo/components/DragDialog.vue";
import {onMounted, ref} from 'vue'
import "plyr/dist/plyr.css"
import Plyr from 'plyr';
import {ElMessage} from "element-plus";
import IconSelect from '@/components/IconSelect/index.vue'

const root = ref()
const myArray = ref([
  {
    name: "张三",
    state: "0",
    id: 1,
  },
  {
    name: "李四",
    state: "0",
    id: 2,
  },
  {
    name: "王五",
    state: "0",
    id: 3,
  },
  {
    name: "赵六",
    state: "0",
    id: 4,
  },
  {
    name: "AK、dadada",
    state: "0",
    id: 5,
  },
]);
const dialogDrag = ref(false);

const selected = (name) => {
  ElMessage.success("你选中人家啦", name)
}
onMounted(() => {
  const player = new Plyr('#player', {
    controls: [
      'play-large', // The large play button in the center
      'restart', // Restart playback
      'rewind', // Rewind by the seek time (default 10 seconds)
      'play', // Play/pause playback
      'fast-forward', // Fast forward by the seek time (default 10 seconds)
      'progress', // The progress bar and scrubber for playback and buffering
      'current-time', // The current time of playback
      'duration', // The full duration of the media
      'mute', // Toggle mute
      'volume', // Volume control
      'captions', // Toggle captions
      'settings', // Settings menu
      'pip', // Picture-in-picture (currently Safari only)
      'airplay', // Airplay (currently Safari only)
      'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
      'fullscreen', // Toggle fullscreen
    ],
    tooltips: {controls: true, seek: true},
    i18n: {
      restart: '重播',
      rewind: '后退{seektime}s',
      play: '播放',
      pause: '暂停',
      fastForward: '前进{seektime}s',
      seek: '寻找',
      seekLabel: '{currentTime} 的 {duration}',
      played: '播放的',
      buffered: '缓冲的',
      currentTime: '当前时间',
      duration: '持续时间',
      volume: '音量',
      mute: '静音',
      unmute: '取消静音',
      enableCaptions: '启用字幕',
      disableCaptions: '禁用字幕',
      download: '下载',
      enterFullscreen: '进入全屏',
      exitFullscreen: '退出全屏',
      frameTitle: '{title}播放器',
      captions: '字幕列表',
      settings: '设置',
      pip: '画中画',
      menuBack: '回到上一级菜单',
      speed: '速度',
      normal: '正常',
      quality: '画质',
      loop: '循环',
      start: '开始',
      end: '结束',
      all: '全部',
      reset: '重置',
      disabled: '禁用',
      enabled: '启用',
      advertisement: '广告',
      qualityBadge: {
        2160: '超清',
        1440: '超清',
        1080: '高清',
        720: '高清',
        576: '标清',
        480: '标清',
      },
    },
  });
  let img = document.createElement('img')
  img.src = 'https://picsum.photos/400/400'
  img.onload = () => {
    ElMessage.success('成功了')
  }
})
const onClick = () => {
  dialogDrag.value = true;
};
// 提交
const submitDrag = () => {
  console.log("提交")
};
// 拖动前
const onDragStart = () => {
  console.log("拖动前")
};
// 拖动后
const onDragEnd = () => {
  console.log("拖动后")
};
// 复选框
const checkoutChange = (element, index) => {
};
</script>

<style lang="scss">
.box {
  width: 200px;
  height: 200px;
  background-color: var(--el-color-success);
}

.box:hover {
  border: 2px solid var(--el-color-primary);
}
</style>