<template>
  <el-menu-item index="/message">
    <el-popover :hide-after="0" v-if="isLogin" :width="120"
                popper-style="padding: 10px 0 10px 0;min-width: auto;"
                :offset="-5" trigger="hover">
      <template #reference>
        <el-badge :hidden="false" is-dot :offset="[2, 18]">消息</el-badge>
      </template>
      <div class="message-option">
        <div class="message-option-item">
          <el-badge :hidden="true" is-dot>评论和@</el-badge>
        </div>
        <div class="message-option-item">
          <el-badge is-dot>新增粉丝</el-badge>
        </div>
        <div class="message-option-item">
          <el-badge is-dot>赞和收藏</el-badge>
        </div>
        <div class="message-option-item">
          <el-badge is-dot>私信</el-badge>
        </div>
        <div class="message-option-item">
          <el-badge :hidden="true" is-dot>系统通知</el-badge>
        </div>
        <div class="message-option-item">
          <el-badge :hidden="true" is-dot>消息设置</el-badge>
        </div>
      </div>
    </el-popover>
    <span v-else>消息</span>
  </el-menu-item>
</template>

<script setup>
const props = defineProps({
  isLogin: {
    type: Boolean
  }
})
</script>

<style scoped lang="scss">
.message-option {
  text-align: center;

  .message-option-item {
    padding: 10px 30px;
    cursor: pointer;
    text-align: left;
  }

  .message-option-item:hover {
    background-color: var(--el-color-primary-light-9);
  }
}
</style>