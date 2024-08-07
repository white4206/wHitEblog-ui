<template>
  <video id="player">
    <template v-for="video in videos">
      <source :src="video.src" type="video/mp4"
              :size="video.size||'1080'">
    </template>
  </video>
</template>

<script setup>
import {onMounted} from 'vue'
import "plyr/dist/plyr.css"
import Plyr from 'plyr';

const props = defineProps({
  options: {
    type: Object,
    default: []
  },
  videos: {
    type: Array,
  }
})
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
    ...props.options
  });
})
</script>

<style scoped lang="scss">

</style>