<template>
  <div :style="disabled?{}:{
  position: 'sticky',
  top: position === 'top' && offset ? offset + 'px' : 0,
  bottom: position === 'bottom' && offset ? offset + 'px' : 0,
  zIndex: zIndex
}">
    <slot></slot>
  </div>
</template>

<script setup>

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: Number,
    default: 999
  },
  position: {
    type: String,
    default: 'top',
    validator: (value) => {
      // 这个值必须匹配下列字符串中的一个
      return ['top', 'bottom'].indexOf(value) !== -1;
    }
  },
  offset: {
    type: Number,
  }
})
</script>