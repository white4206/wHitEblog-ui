<template>
  <div class="comment-card">
    <el-card shadow="never">
      <div class="content">
        <div class="left-part">
          <div class="info">
            <span class="num">{{ total }} 条评论</span>
            <el-icon>
              <ArrowRight/>
            </el-icon>
            <template v-if="userStore.isLogin">
              <el-avatar :src="articleComment[0] ? articleComment[0].avatar : '头像'"/>
              <span class="nickname">{{ articleComment[0] ? articleComment[0].nickname : '昵称' }}</span>
              <el-tag type="primary" size="small">热评</el-tag>
              <span class="text text-ellipsis-1">
              {{ articleComment[0] ? articleComment[0].content : '评论内容' }}
            </span>
            </template>
            <template v-else>
              <span class="unLogin-text">您还未登录，请先 <el-button @click="router.push('/login')">登录</el-button> 后发表或查看评论</span>
            </template>
          </div>
        </div>
        <div class="right-part" v-if="userStore.isLogin">
          <el-button type="primary" style="padding: 0 20px" round @click="showComment=true">写评论</el-button>
        </div>
      </div>
    </el-card>
    <el-drawer v-model="showComment" :size="500" :title="'评论 '+7">
      <div class="post-comment">
        <el-avatar/>
        <div class="textarea">
          <el-input v-model="commentValue" type="textarea" maxlength="1000" :rows="4"
                    resize="none" placeholder="欢迎高质量的评论">
          </el-input>
          <div class="operation-box">
            <div class="left-part">
              还能输入<span style="color: var(--el-text-color-primary)">{{ wordCount }}</span>个字符
            </div>
            <div class="right-part">
              <el-icon color="var(--el-text-color-secondary)" :size="22">
                <SvgIcon icon-name="emoji"/>
              </el-icon>
              <el-icon color="var(--el-text-color-secondary)" :size="22">
                <SvgIcon icon-name="code"/>
              </el-icon>
              <el-button size="small" style="padding:0 15px" type="primary" round>评论</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="all-comment">
        <div class="comment-item" v-for="(comment,index) in articleComment">
          <el-avatar :src="comment.avatar"/>
          <div class="content">
            <div class="title">
              <div class="left-part">
                <span class="nickname">{{ comment.nickname }}</span> <span
                  class="datetime">{{ timeAgo(comment.createTime) }}</span>
              </div>
              <div class="right-part">
                <span class="hidden">
                  <el-popover popper-style="min-width: auto;padding:5px 0;" trigger="hover" width="80px">
                  <template #reference>
                    <el-icon>
                      <More/>
                    </el-icon>
                  </template>
                  <div class="more-option">
                    <div class="option">删除</div>
                  </div>
                </el-popover>
                </span>
                <span class="hidden" @click="postComment(index)"><el-icon><ChatSquare/></el-icon>回复</span>
                <div class="flex-vertical">
                  <span>{{ comment.likeNum ? comment.likeNum : '' }}</span>
                  <el-icon style="margin-left: 5px">
                    <SvgIcon icon-name="like"/>
                  </el-icon>
                </div>
              </div>
            </div>
            <div class="description">{{ comment.content }}</div>
            <div class="sub">
              <div class="comment-item" v-for="(subComment,subIndex) in comment.subComments">
                <el-avatar :src="subComment.avatar"/>
                <div class="content">
                  <div class="title">
                    <div class="left-part">
                      <span class="nickname">{{ subComment.nickname }}</span> <span
                        class="datetime">{{ timeAgo(subComment.createTime) }}</span>
                    </div>
                    <div class="right-part">
                <span class="hidden">
                  <el-popover popper-style="min-width: auto;padding:5px 0;" trigger="hover" width="80px">
                  <template #reference>
                    <el-icon>
                      <More/>
                    </el-icon>
                  </template>
                  <div class="more-option">
                    <div class="option">删除</div>
                  </div>
                </el-popover>
                </span>
                      <span class="hidden" @click="postComment(index,subIndex)"><el-icon><ChatSquare/></el-icon>回复</span>
                      <div class="flex-vertical">
                        <span>{{ subComment.likeNum ? subComment.likeNum : '' }}</span>
                        <el-icon style="margin-left: 5px">
                          <SvgIcon icon-name="like"/>
                        </el-icon>
                      </div>
                    </div>
                  </div>
                  <div class="description">{{ subComment.content }}</div>
                  <el-collapse-transition>
                    <div v-show="subComment.isComment" class="textarea">
                      <el-input v-model="commentValue" type="textarea" maxlength="1000" :rows="3"
                                resize="none" :placeholder="'回复：'+subComment.nickname">
                      </el-input>
                      <div class="operation-box">
                        <div class="left-part">
                          还能输入<span style="color: var(--el-text-color-primary)">{{ wordCount }}</span>个字符
                        </div>
                        <div class="right-part">
                          <el-icon color="var(--el-text-color-secondary)" :size="22">
                            <SvgIcon icon-name="emoji"/>
                          </el-icon>
                          <el-icon color="var(--el-text-color-secondary)" :size="22">
                            <SvgIcon icon-name="code"/>
                          </el-icon>
                          <el-button size="small" style="padding:0 15px" type="primary" round>评论</el-button>
                        </div>
                      </div>
                    </div>
                  </el-collapse-transition>
                </div>
              </div>
            </div>
            <el-collapse-transition>
              <div v-show="comment.isComment" class="textarea">
                <el-input v-model="commentValue" type="textarea" maxlength="1000" :rows="3"
                          resize="none" :placeholder="'回复：'+comment.nickname">
                </el-input>
                <div class="operation-box">
                  <div class="left-part">
                    还能输入<span style="color: var(--el-text-color-primary)">{{ wordCount }}</span>个字符
                  </div>
                  <div class="right-part">
                    <el-icon color="var(--el-text-color-secondary)" :size="22">
                      <SvgIcon icon-name="emoji"/>
                    </el-icon>
                    <el-icon color="var(--el-text-color-secondary)" :size="22">
                      <SvgIcon icon-name="code"/>
                    </el-icon>
                    <el-button size="small" style="padding:0 15px" type="primary" round>评论</el-button>
                  </div>
                </div>
              </div>
            </el-collapse-transition>
          </div>
        </div>
      </div>
      <div class="viewMore">
        <span>查看更多评论</span>
        <el-icon :size="12">
          <ArrowDown/>
        </el-icon>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import useUserStore from '@/store/modules/user.js'
import {useRouter} from "vue-router";
import {getArticleComment} from "@/api/blog.js";
import {timeAgo} from "../../../../utils/datetimeUtil.js";

const props = defineProps({
  articleId: {
    type: Number
  }
})
const router = useRouter()
const userStore = useUserStore()
const showComment = ref(false)
const commentValue = ref("")
const wordCount = ref(1000)
const total = ref(0)
const queryParams = ref({
  pageNum: 1,
  pageCount: 10,
  articleId: props.articleId,
})
const articleComment = ref([])

const postComment = (index, subIndex) => {
  let currentStatus = subIndex === undefined ? articleComment.value[index].isComment
      : articleComment.value[index].subComments[subIndex].isComment
  articleComment.value = articleComment.value.map(item => {
    return {
      ...item,
      subComments: item.subComments.map(subItem => {
        return {
          ...subItem,
          isComment: false,
        }
      }),
      isComment: false
    }
  })
  if (subIndex === undefined) {
    articleComment.value[index].isComment = !currentStatus
  } else {
    articleComment.value[index].subComments[subIndex].isComment = !currentStatus
  }
}
watch(commentValue, () => {
  let maxLength = 1000
  wordCount.value = maxLength - commentValue.value.length
}, {
  immediate: true
})
onMounted(() => {
  getArticleComment(queryParams.value).then(res => {
    total.value = res.info.total
    articleComment.value = res.data.map(item => {
      return {
        ...item,
        avatar: item.avatar ? import.meta.env.VITE_APP_BASE_API + item.avatar : null,
        subComments: item.subComments.map(subItem => {
          return {
            ...subItem,
            avatar: subItem.avatar ? import.meta.env.VITE_APP_BASE_API + subItem.avatar : null,
            isComment: false,
          }
        }),
        isComment: false,
      }
    })
  })
})
</script>

<style scoped lang="scss">
.comment-card {
  margin-top: 10px;

  .el-card {
    border: none;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left-part {
      display: flex;
      align-items: center;

      .info {
        display: flex;
        align-items: center;
        margin-right: 25px;

        .num {
          cursor: pointer;
        }

        .el-icon {
          cursor: pointer;
          margin-right: 25px;
        }

        .el-avatar {
          cursor: pointer;
          margin-right: 10px;
        }

        .nickname {
          cursor: pointer;
          font-size: 14px;
          color: var(--el-text-color-regular);
          margin-right: 10px;
        }

        .el-tag {
          margin-right: 5px;
        }

        .text {
          flex: 1;
          font-size: 14px;
        }

        .unLogin-text {
          font-size: 14px;
          color: var(--el-text-color-regular);
        }
      }
    }
  }

  :deep(.el-drawer__header) {
    color: var(--el-text-color-primary);
    margin-bottom: 0;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--el-border-color);
  }
}
:deep(.el-drawer__body){
  overflow: hidden;
}
.post-comment {
  display: flex;

  .el-avatar {
    width: 30px;
    height: 30px;
    padding-top: 10px;
    margin-right: 10px;
  }

  .textarea {
    flex: 1;
    background: var(--el-fill-color-light);
    padding: 15px 15px 0 15px;
    border-radius: 10px;

    :deep(.el-textarea__inner) {
      background: transparent;
      padding: 0;
      border-radius: 0;
      box-shadow: none;
    }

    ::-webkit-scrollbar {
      width: 2px;
    }

    .operation-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .left-part {
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }

      .right-part {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .el-icon {
          margin-right: 10px;
        }
      }
    }
  }
}

.all-comment {
  margin-top: 10px;

  .comment-item {
    display: flex;

    .el-avatar {
      margin-top: 15px;
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }

    .content {
      flex: 1;
      display: flex;
      align-items: start;
      flex-direction: column;
      padding: 15px 0;
      font-size: 14px;

      .title {
        color: var(--el-text-color-regular);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 5px;

        .left-part {
          .nickname {
            margin-right: 5px;
          }
        }

        .right-part {
          display: flex;
          align-items: center;

          .el-icon {
            cursor: pointer;
            margin-right: 15px;
          }

          .hidden {
            cursor: pointer;
            display: none;
            align-items: center;
            margin-right: 20px;

            .el-icon {
              margin-right: 0;
            }
          }
        }
      }


      .textarea {
        margin-top: 15px;
        box-sizing: border-box;
        width: 100%;
        background: var(--el-fill-color-light);
        padding: 15px 15px 0 15px;
        border-radius: 10px;

        :deep(.el-textarea__inner) {
          background: transparent;
          padding: 0;
          border-radius: 0;
          box-shadow: none;
        }

        ::-webkit-scrollbar {
          width: 2px;
        }

        .operation-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;

          .left-part {
            font-size: 12px;
            color: var(--el-text-color-secondary);
          }

          .right-part {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .el-icon {
              margin-right: 10px;
            }
          }
        }
      }
    }

    .content:hover {
      .title {
        .right-part {
          .hidden {
            display: flex;
          }
        }
      }
    }
  }

  .sub {
    width: 100%;

    .comment-item {
      display: flex;

      .el-avatar {
        margin-top: 15px;
        width: 25px;
        height: 25px;
        margin-right: 10px;
      }

      .content {
        flex: 1;
        display: flex;
        align-items: start;
        flex-direction: column;
        padding: 15px 0 0 0;
        font-size: 14px;

        .title {
          color: var(--el-text-color-regular);
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 5px;

          .left-part {
            .nickname {
              margin-right: 5px;
            }
          }

          .right-part {
            display: flex;
            align-items: center;

            .el-icon {
              cursor: pointer;
              margin-right: 15px;
            }

            .hidden {
              cursor: pointer;
              display: none;
              align-items: center;
              margin-right: 20px;

              .el-icon {
                margin-right: 0;
              }
            }
          }
        }


        .textarea {
          box-sizing: border-box;
          width: 100%;
          background: var(--el-fill-color-light);
          padding: 15px 15px 0 15px;
          border-radius: 10px;

          :deep(.el-textarea__inner) {
            background: transparent;
            padding: 0;
            border-radius: 0;
            box-shadow: none;
          }

          ::-webkit-scrollbar {
            width: 2px;
          }

          .operation-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;

            .left-part {
              font-size: 12px;
              color: var(--el-text-color-secondary);
            }

            .right-part {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .el-icon {
                margin-right: 10px;
              }
            }
          }
        }
      }

      .content:hover {
        .title {
          .right-part {
            .hidden {
              display: flex;
            }
          }
        }
      }
    }
  }
}

.more-option {
  .option {
    cursor: pointer;
    text-align: center;
    padding: 5px 10px;
    font-size: 12px;
  }

  .option:hover {
    background-color: var(--el-color-primary-light-9);
  }
}

.viewMore {
  cursor: pointer;
  margin: 0 auto 30px auto;
  width: 40%;
  color: var(--el-text-color-regular);
  font-size: 14px;
  border-radius: 20px;
  text-align: center;
  padding: 5px 20px;
  background: var(--el-fill-color-light);
}
</style>