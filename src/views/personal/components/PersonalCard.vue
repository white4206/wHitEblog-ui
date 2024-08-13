<template>
  <el-card shadow="always" class="personal-card">
    <div class="personal-card-box">
      <div class="avatar-box">
        <el-avatar :src="userData.avatar"/>
      </div>
      <div class="personal-info-box">
        <div class="nickname">{{ userData.nickname || '用户' }}</div>
        <div class="personal-info">
          <div class="personal-info-item">
            <span class="boldNum">{{ userData.pageView || 0 }}</span><span class="info-text">总访问量</span>
          </div>
          <el-divider direction="vertical"/>
          <div class="personal-info-item" @click="showArticle">
            <span class="boldNum">{{ originalTotal || '' }}</span>
            <span class="info-text">{{ originalTotal ? '' : '暂无' }} 原创</span>
          </div>
          <el-divider direction="vertical"/>
          <div class="personal-info-item">
            <span class="boldNum">{{ userData.rankData || '' }}</span>
            <span class="info-text">{{ userData.rankData ? '' : '暂无' }} 排名</span>
          </div>
          <el-divider direction="vertical"/>
          <div class="personal-info-item" @click="showFans">
            <span class="boldNum">{{ userData.fansNum || 0 }}</span><span
              class="info-text">粉丝</span>
          </div>
        </div>
        <div :class="{'text-ellipsis-1':!isShowMore,'personal-desc':true}">
          个人简介: {{ userData.description || "暂无简介" }}
        </div>
        <div class="ip-territory">
          IP 属地: {{ userData.lastLoginIpAddress }}
        </div>
        <div v-if="isShowMore" class="register-time">
          加入wHitE博客时间: {{ new Date(userData.registerTime).toLocaleDateString("sv-SE") }}
        </div>
        <div v-if="isShowMore" class="blog-desc">
          博客简介: {{ userData.nickname + '的博客' }}
        </div>
        <div v-if="isShowMore" class="blog-desc">
          博客描述: {{ userData.nickname + '的博客' }}
        </div>
        <div class="viewMore" @click="viewMore">
          <div v-if="!isShowMore">
            查看详细资料
            <el-icon>
              <ArrowDown/>
            </el-icon>
          </div>
          <div v-else>
            收起详细资料
            <el-icon>
              <ArrowUp/>
            </el-icon>
          </div>
        </div>
      </div>
      <div class="operation-btn-box" v-if="isSelf">
        <el-button style="width: 100px" :icon="EditPen" round @click="router.push('/user')">编辑资料
        </el-button>
        <el-button style="width: 100px" :icon="Setting" round
                   @click="ElMessage.info('编辑展示内容功能暂未支持')">设置
        </el-button>
        <el-button style="width: 100px" :icon="Document" round @click="router.push('/creation/content')">
          管理博文
        </el-button>
      </div>
      <div class="operation-btn-box" v-else>
        <el-button style="width: 100px" :icon="Plus" round @click="ElMessage.info('关注功能暂未实现')">关注
        </el-button>
        <el-popover :hide-after="0" popper-style="padding:0;min-width:0;" placement="bottom-end" :width="120"
                    trigger="hover">
          <template #reference>
            <el-icon size="18" style="transform: rotate(-90deg);margin-left: 20px;cursor: pointer">
              <MoreFilled/>
            </el-icon>
          </template>
          <div class="more-option">
            <div class="more-option-item">提问</div>
            <div class="more-option-item">私信</div>
          </div>
        </el-popover>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import {Document, EditPen, Plus, Setting} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {ref} from "vue";

const emits = defineEmits(["showFans", "showArticle"])
const props = defineProps({
  isSelf: {
    type: Boolean
  },
  userData: {
    type: Object
  },
  originalTotal: {
    type: Number
  }
})
const router = useRouter()
const isShowMore = ref(false)

const showArticle = () => {
  emits("showArticle")
}
const showFans = () => {
  emits("showFans")
}
const viewMore = () => {
  isShowMore.value = !isShowMore.value
}
</script>

<style scoped lang="scss">
.personal-card {
  position: relative;
  overflow: visible;
  border: none;
  margin-bottom: 10px;

  .personal-card-box {
    display: flex;

    .avatar-box {
      position: relative;
      top: -40px;
      border-radius: 50%;
      border: 5px solid var(--el-bg-color);
      width: 100px;
      height: 100px;
      margin-right: 20px;

      .el-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }

    .personal-info-box {
      .nickname {
        font-size: 22px;
        margin-bottom: 10px;
      }

      .personal-info {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .el-divider {
          margin: 0 15px;
        }

        .boldNum {
          font-size: 20px;
          font-weight: bold;
          margin-right: 5px;
        }

        .info-text {
          font-size: 14px;
          color: var(--el-text-color-regular);
        }

        .personal-info-item:hover {
          cursor: pointer;

          .boldNum {
            color: var(--el-color-primary);
          }

          .info-text {
            color: var(--el-color-primary);
          }
        }
      }

      .personal-desc {
        line-height: 1.5;
        margin-bottom: 10px;
        font-size: 14px;
        color: var(--el-text-color-regular);
      }

      .ip-territory {
        margin-bottom: 10px;
        font-size: 14px;
        color: var(--el-text-color-regular);
      }

      .register-time {
        margin-bottom: 10px;
        font-size: 14px;
        color: var(--el-text-color-regular);
      }

      .blog-desc {
        margin-bottom: 10px;
        font-size: 14px;
        color: var(--el-text-color-regular);
      }

      .viewMore {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 14px;
        color: var(--el-text-color-regular);
        cursor: pointer;
      }
    }

    .operation-btn-box {
      display: flex;
      align-items: center;
      position: absolute;
      top: 20px;
      right: 20px;
      color: var(--el-text-color-regular);
    }
  }
}

.more-option {
  padding: 10px 0;
  text-align: center;

  .more-option-item {
    padding: 10px 30px;
    cursor: pointer;
    text-align: center;
  }

  .more-option-item:hover {
    background-color: var(--el-color-primary-light-9);
  }
}
</style>