<template>
  <div class="share-box">
    <el-popover :hide-after="0" popper-style="padding: 10px 0 10px 0;min-width: auto;" placement="top" :width="120"
                trigger="hover">
      <template #reference>
        <div class="share">
          <el-button circle>
            <template #icon>
              <el-icon :size="18">
                <SvgIcon icon-name="wechat"/>
              </el-icon>
            </template>
          </el-button>
          <span class="text">微信</span>
        </div>
      </template>
      <div class="wechat-share-box">
        <img src="@/assets/images/common/avatar.png"/>
        <div>微信扫码分享</div>
      </div>
    </el-popover>
    <div class="share">
      <el-button circle>
        <template #icon>
          <el-icon :size="18">
            <SvgIcon icon-name="qq"/>
          </el-icon>
        </template>
      </el-button>
      <span class="text">QQ</span>
    </div>
    <div class="share">
      <el-button circle color="#f2c83e">
        <template #icon>
          <el-icon :size="18">
            <SvgIcon icon-name="link"/>
          </el-icon>
        </template>
      </el-button>
      <span class="text">链接</span>
    </div>
    <el-popover :hide-after="0" popper-style="padding: 10px 0 10px 0;min-width: auto;" placement="top" :width="240"
                trigger="hover">
      <template #reference>
        <div class="share">
          <el-button circle color="#f95e5c">
            <template #icon>
              <el-icon :size="18">
                <SvgIcon icon-name="placard"/>
              </el-icon>
            </template>
          </el-button>
          <span class="text">海报</span>
        </div>
      </template>
      <div class="placard-share-box">
        <div>注: 截图获取海报</div>
        <img src=""/>
      </div>
    </el-popover>
    <el-popover :hide-after="0" popper-style="padding: 10px 0 10px 0;min-width: auto;" placement="top" :width="120"
                trigger="hover">
      <template #reference>
        <div class="share">
          <el-button circle color="#ccccd8">
            <template #icon>
              <el-icon :size="18">
                <SvgIcon icon-name="more"/>
              </el-icon>
            </template>
          </el-button>
          <span class="text">更多</span>
        </div>
      </template>
      <div class="more-option">
        <div class="more-option-item">
          <el-icon :size="16">
            <SvgIcon icon-name="fans"/>
          </el-icon>
          <span>分享给粉丝</span>
        </div>
        <div class="more-option-item">
          <el-icon :size="16">
            <SvgIcon icon-name="phone"/>
          </el-icon>
          <el-popover :hide-after="0" popper-style="padding: 10px 0 10px 0;min-width: auto;" placement="left"
                      :width="120"
                      trigger="hover">
            <template #reference>
              <span>APP分享</span>
            </template>
            <div class="app-share-box">
              <img src="@/assets/images/common/avatar.png"/>
              <div>APP扫码分享</div>
            </div>
          </el-popover>
        </div>
        <div class="more-option-item">
          <el-icon :size="16">
            <SvgIcon icon-name="microBlog"/>
          </el-icon>
          <span>微博分享</span>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.share-box {
  display: flex;
  justify-content: center;
}

.share {
  display: flex;
  flex-direction: column;
  margin: 0 15px;
  justify-content: center;
  align-items: center;
}

.text {
  font-size: 12px;
  line-height: 2;
}


.more-option {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;

  .more-option-item {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    cursor: pointer;

    span {
      margin-left: 5px;
    }
  }

  .more-option-item:hover {
    background-color: var(--el-color-primary-light-9);
  }
}

.wechat-share-box, .app-share-box {
  text-align: center;
}

.placard-share-box {
  padding: 0 10px;
}
</style>