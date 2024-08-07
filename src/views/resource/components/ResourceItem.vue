<template>
  <div class="resource-item-box">
    <div class="resource-item-cover">
      <span class="abstractText">植物大战僵尸杂交版v2.0.88安装程序..</span>
    </div>
    <img class="background" src="@/assets/images/common/document.png" alt="">
    <div class="content-box">
      <div class="content">
        <div class="tag">植物大战僵尸杂交版</div>
        <div class="size">大小: {{ 112 }}MB</div>
        <div class="title">植物大战僵尸杂交版v2.0.88安装程序</div>
        <img class="type" src="@/assets/images/fileType/exe.png" alt="">
      </div>
      <div class="bg">
        <img class="logo" src="/public/favicon.ico" alt="">
        <div class="bar-box">
          <div style="width: 70%" class="bar"></div>
        </div>
        <div class="bar-box">
          <div style="width: 40%" class="bar"></div>
          <div style="width: 40%" class="bar"></div>
        </div>
        <div class="bar-box">
          <div style="width: 70%" class="bar"></div>
          <div style="width: 20%" class="bar"></div>
        </div>
        <div class="bar-box">
          <div style="width: 30%" class="bar"></div>
          <div style="width: 30%" class="bar"></div>
          <div style="width: 30%" class="bar"></div>
        </div>
        <div class="bar-box">
          <div style="width: 60%" class="bar"></div>
        </div>
        <div class="bar-box">
          <div style="width: 20%" class="bar"></div>
        </div>
        <div class="bar-box">
          <div style="width: 80%" class="bar"></div>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="title">植物大战僵尸杂交版v2.0.88安装程序</div>
      <div class="num">
        <el-icon size="20" :color="'#ffcc76'">
          <StarFilled/>
        </el-icon>
        <span>{{ 5 }}</span>
        <el-divider style="margin:0 10px;" direction="vertical"/>
        <span>{{ 4255 }}浏览</span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.resource-item-box {
  position: relative;
  width: 135px;
  margin-bottom: 30px;

  .resource-item-cover {
    display: none;
    position: absolute;
    width: 135px;
    height: 185px;
    opacity: .9;
    background: var(--el-bg-color);
    box-shadow: 0 0 6px var(--el-border-color-lighter);
    z-index: 3;

    .abstractText {
      position: absolute;
      padding: 20px 10px;
      font-size: 14px;
      color: var(--el-text-color-regular);
      box-sizing: border-box;
    }
  }

  .background {
    background-color: var(--el-bg-color);
    position: absolute;
    width: 135px;
    height: 185px;
    z-index: 1;
  }

  .content-box {
    position: relative;
    width: 135px;
    height: 185px;
    box-sizing: border-box;
    padding: 20px 10px;
    z-index: 2;

    .content {
      color: #303133;
      box-sizing: border-box;
      padding: 30px 10px 0 10px;

      .tag {
        line-height: 1.5;
        font-size: 12px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .size {
        line-height: 1.5;
        font-size: 12px;
      }

      .title {
        margin-top: 10px;
        color: #909399;
        font-size: 12px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .type {
        position: absolute;
        right: 5px;
        bottom: 5px;
        width: 25px;
        height: 25px;
      }
    }

    .bg {
      margin-top: 70px;
      box-sizing: border-box;
      padding: 30px 20px 0 20px;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;

      .logo {
        transform: rotate(-30deg);
        width: 80px;
        opacity: .05;
        position: absolute;
        top: -50px;
        right: 20px
      }

      .bar-box {
        display: flex;

        .bar {
          margin: 2px 2px 2px 0;
          height: 3px;
          border-radius: 10px;
          width: 100%;
          background: #f5f7fa;
        }
      }
    }
  }

  .info {
    color: var(--el-text-color-primary);
    font-weight: 500;

    .title {
      margin-top: 10px;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .num {
      margin-top: 5px;
      display: flex;
      align-items: center;
      color: var(--el-text-color-secondary);
      font-size: 12px;
    }
  }
}
.resource-item-box:nth-child(6n){
  margin-right: 0;
}
.resource-item-box:hover {
  .resource-item-cover {
    display: block;
  }
}
</style>