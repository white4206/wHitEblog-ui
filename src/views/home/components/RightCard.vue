<template>
  <Affix :offset="fixHeight" :z-index="99">
    <!-- <el-affix :offset="fixHeight" :z-index="99">-->
    <div ref="rightCardRef">
      <el-card class="todolist side-card" shadow="never">
        <template #header>
          <div class="card-header more">
            待办事项
            <div class="todolist-more">
              <span>ALL</span>
              <el-icon color="var(--el-color-primary)" :size="16">
                <ArrowRightBold/>
              </el-icon>
            </div>
          </div>
        </template>
        <div class="noMore" v-if="noData">
          您还没有添加
          <el-link>待办事项</el-link>
          呢(¬‿¬)...
        </div>
        <div class="todolist-item" v-for="item in todolistItems" :key="item.id">
          <div class="todolist-item-date">
            <p class="todolist-item-date-day">{{ item.finishDate.split("-")[2] }}</p>
            <p class="todolist-item-date-month">{{ item.finishDate.split("-")[1] + "月" }}</p>
          </div>
          <div class="todolist-item-content text-ellipsis-2">
            <el-tag size="small" :type="item.type">{{ item.status }}</el-tag>
            <span class="text-link">{{ item.content }}</span>
          </div>
          <div>
            <el-checkbox size="large" v-model="item.isChecked"></el-checkbox>
          </div>
        </div>
      </el-card>
      <el-card class="related-link side-card" shadow="never">
        <template #header>
          <div class="card-header">
            相关链接
          </div>
        </template>
        <div v-for="item in relatedLinkItems" :key="item.id" class="related-link-item"
             @click="jumpLink(item.linkUrl)">
          <div class="related-link-item-img-box">
            <el-image :src="item.icon" :alt="item.title"
                      class="related-link-item-img"/>
          </div>
          <span class="related-link-item-title">{{ item.title }}</span>
          <el-icon>
            <ArrowRight/>
          </el-icon>
        </div>
      </el-card>
      <WebsiteInfoCard/>
    </div>
    <!-- </el-affix>-->
  </Affix>
</template>

<script setup>
import Affix from "@/components/Affix/index.vue";
import WebsiteInfoCard from "@/components/WebsiteInfoCard/index.vue";
import {onMounted, ref} from "vue";
import {getLeaveMessage} from "@/api/leaveMessage.js";
import {getRelatedLink} from "@/api/common.js";
import {getToDoList} from "@/api/todolist.js";
import useUserStore from "@/store/modules/user.js";

const userStore = useUserStore()
const rightCardRef = ref()
const fixHeight = ref(0)
const todolistItems = ref([])
const messageItems = ref([])
const relatedLinkItems = ref([]);
const noData = ref(true)

const jumpLink = (link) => {
  if (link !== '#')
    window.open(link)
  else
    location.reload()
}
onMounted(() => {
  getLeaveMessage().then(res => {
    messageItems.value = res.data.map(item => {
      return {
        ...item,
        avatar: item.avatar ? import.meta.env.VITE_APP_BASE_API + item.avatar : null
      }
    })
  })
  getRelatedLink().then(res => {
    relatedLinkItems.value = res.data.map(item => {
      return {
        ...item,
        icon: import.meta.env.VITE_APP_BASE_ADMIN_API + item.icon
      }
    })
  })
  if (userStore.isLogin)
    getToDoList().then(res => {
      if (res.data.length > 0) noData.value = false
      todolistItems.value = res.data.map(item => {
        if (item.status === -1)
          return {
            ...item,
            type: "danger",
            status: "未完成"
          }
        else if (item.status === 0)
          return {
            ...item,
            type: "info",
            status: "待完成"
          }
        else if (item.status === 1)
          return {
            ...item,
            type: "primary",
            status: "已完成"
          }
      })
    })
  window.addEventListener("scroll", () => {
    let rightCardHeight
    if (rightCardRef.value)
      rightCardHeight = rightCardRef.value.offsetHeight + 20
    let windowHeight = window.innerHeight
    if (rightCardHeight >= windowHeight - 80)
      fixHeight.value = -(rightCardHeight - windowHeight)
    else
      fixHeight.value = 80
  })
})
</script>

<style scoped lang="scss">
.side-card {
  margin-bottom: 20px;
}

.card-header {
  font-size: 18px;
}

.todolist-more {
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.todolist-item {
  display: flex;
  align-items: center;
  margin-top: 30px;
}

.todolist-item:nth-child(1) {
  margin-top: 0;
}

.todolist-item-date {
  margin-right: 10px;
}

.todolist-item-date-day {
  color: var(--el-color-primary-light-3);
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  height: 26px;
  line-height: 26px;
}

.todolist-item-date-month {
  height: 22px;
  line-height: 20px;
  font-size: 14px;
  color: var(--el-color-primary-light-3);
  text-align: center;
}

.todolist-item-content {
  flex: 1;
  line-height: 1.5;
}

.todolist-item-content .text-link {
  margin-left: 5px;
}

.todolist-item-content .text-link:hover {
  text-decoration: underline;
}

.more {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.related-link-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
}


.related-link-item:nth-child(1) {
  margin-top: 0;
}

.related-link-item-img-box {
  width: 25px;
  height: 25px;

  .related-link-item-img {
    width: 25px;
    height: 25px;
    transition: .2s;
  }
}

.related-link-item-title {
  flex: 8;
  margin-left: 10px;
}

.message-item {
  margin-top: 20px;
}

.message-item:nth-child(1) {
  margin-top: 0;
}

.message-title {
  display: flex;
  align-items: center;
}

.message-author-avatar {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 10px;
}

.message-author-name {
  font-size: 14px;
  margin-right: 10px;
  cursor: pointer;
}

.message-author-name:hover {
  color: var(--el-text-color-regular);
}

.message-publication-time {
  font-size: 12px;
  color: var(--el-text-color-regular);
}

.message-content {
  margin-left: 35px;
}

.message-divider {
  margin: 10px 0;
}

.noMore {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  font-size: 14px;
  color: var(--el-text-color-placeholder);
}
</style>