<template>
  <div class="about">
    <el-dialog
        class="notice-dialog1"
        :model-value="dragDialog"
        :before-close="confirm"
        title="配置列表展示字段"
        width="50%"
        :append-to-body="true"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :show-close="false"
    >
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">
            <span>配置列表展示字段 </span>
            <span class="spanTip"> (用户可拖动排序)</span>
          </h4>
          <el-icon @click="close" class="el-icon--left">
            <CircleClose/>
          </el-icon>
        </div>
      </template>
      <draggable
          :list="dragArr"
          ghost-class="ghost"
          :force-fallback="true"
          chosen-class="chosenClass"
          animation="300"
          @start="onDragStart"
          @end="onDragEnd"
          :sort="true"
          handle=".drag"
          item-key="id"
      >
        <template #item="{ element, index }">
          <div :class="element.state == 1 ? 'item1 item' : 'item'">
            <i>
              <el-checkbox
                  @change="checkoutChange(element, index)"
                  v-model="element.state"
                  size="large"
                  :label="element.name"
                  :true-label="1"
                  :false-label="0"
              />
            </i>
            <i class="drag">拖动</i>
          </div>
        </template>
      </draggable>
      <template #footer>
        <span class="dialog-footer">
          <el-button
              class="dialogCancelBtn"
              @click="confirm"
              style="min-width: 80px"
          >取 消</el-button
          >
          <el-button
              class="dialogOkBtn"
              type="primary"
              @click="submitDrag"
              style="min-width: 80px"
          >
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import draggable from "vuedraggable";

const props = defineProps({
  dragDialog: {
    type: Boolean,
    required: true,
  },
  dragArr: {
    type: Array,
  },
});

const emits = defineEmits([
  "update:dragDialog",
  "submitDrag",
  "checkoutChange",
  "onDragStart",
  "onDragEnd",
]);

// 关闭
const confirm = () => {
  emits("update:dragDialog", false);
};
// 提交
const submitDrag = () => {
  emits("submitDrag");
};
// 复选框勾选
const checkoutChange = (element, index) => {
  emits("checkoutChange", element, index);
};
// 拖动前
const onDragStart = () => {
  emits("onDragStart");
};
// 拖动后
const onDragEnd = (added, removed, moved) => {
  console.log(added)
  console.log(removed)
  console.log(moved)
  emits("onDragEnd");
};
</script>
<style lang="scss">
.notice-dialog1 {
  padding: 0 12px;
  border-radius: 15px;

  .my-header {
    position: relative;

    h4 {
      text-align: center;
      height: 30px;
    }

    .el-icon {
      position: absolute;
      top: 2px;
      right: -10px;
      cursor: pointer;
    }

    .spanTip {
      font-size: 14px;
      color: #999;
    }
  }

  .item {
    padding: 6px 10px;
    width: 46%;
    display: inline-flex;
    justify-content: space-between;
    margin: 0 0.5%;
    background-color: #f6f8fa;
    border-radius: 5px;
    line-height: 42px;

    i:nth-child(1) {
      width: 70%;
      height: 42px;
      line-height: 46px;
    }

    i:nth-child(2) {
      width: 12%;
      height: 16px;
      line-height: 16px;
      margin: auto 0;
      text-align: center;
      text-decoration: underline;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }

    i:nth-child(3) {
      width: 8%;
      height: 42px;
      line-height: 42px;
      text-decoration: underline;
      padding-left: 20px;

      .el-image {
        width: 15px;
        height: 20px;
        margin-top: 10px;
      }
    }

    .el-checkbox.el-checkbox--large {
      height: 7%;
    }

    .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #114ed9;
      border-color: #114ed9;
    }

    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #114ed9;
    }
  }

  .item1 {
    background-color: #ffffff;
    box-shadow: 0 0 10px #0000001a;
    border-left: solid 2px #114ed9;
    width: 45.8%;
    line-height: 40px;
  }

  .drag {
    cursor: pointer;
  }

  .item + .item {
    margin-top: 20px;
  }

  .ghost {
    opacity: 0.05 !important;
    border: solid 1px rgb(19, 41, 239) !important;
  }

  .chosenClass {
    background-color: #eee;
    opacity: 1;
    border: solid 1px red;
  }
}

.notice-dialog1 .el-dialog__header {
  border-bottom: 1px solid #f6f6f6;
  margin-right: 0;
}

.notice-dialog1 .el-dialog__body {
  height: 300px;
  overflow: auto;
}

.notice-dialog1 .el-dialog__body::-webkit-scrollbar {
  display: none;
}

.notice-dialog1 .el-dialog__footer {
  border-top: 1px solid #f6f6f6;
  text-align: center;
  padding-top: 20px;
}
</style>