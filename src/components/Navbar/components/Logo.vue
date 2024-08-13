<template>
  <div class="logo-box" @click="clickLogo">
    <svg-icon icon-class="logo" icon-name="logo" size="45"/>
    <span>wHitE 博客</span>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';
import SvgIcon from "@/components/SvgIcon/index.vue";

const router = useRouter();

const clickLogo = () => {
  router.push("/home")
}
</script>

<style lang="scss" scoped>
.logo-box {
  display: flex;
  align-items: center;
  margin: 0 10px;
  cursor: pointer;
}

@keyframes loading_logo {
  from {
    transform: scale(1.05) rotate(-15deg);
  }
  to {
    transform: scale(1) rotate(0deg);
  }
}

.logo {
  margin-right: 5px;
  border-radius: 50%;
  box-shadow: 1px 2px 6px rgba(146, 134, 209, .2);
  animation: loading_logo 1s linear;
  transition: .4s;
}

.logo:hover {
  transform: scale(1.05) rotate(-15deg);
  transition: .4s;
}
</style>