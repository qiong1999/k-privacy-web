 
<template>
  <div class="container">
    <div class="header">
      <div class="titler">隐私保护系统</div>
    </div>
    <div class="aside">
      <el-row class="tac">
        <el-menu
          :uniqueOpened="true"
          default-active="2"
          class="el-menu-vertical-demo menu"
          @open="handleOpen"
          @close="handleClose"
          background-color="#16419c"
          text-color="#fff"
          active-text-color="rgba(244, 245, 247, 0.7)"
        >
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-menu"></i>
              <span>K-匿名算法</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">操作示例</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-2">算法配置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-row>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuTab',
  setup() {
    const handleOpen = () => {

    };
    const handleClose = () => {

    };
    return {
      handleOpen,
      handleClose
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  & .header {
    position: absolute;
    top: 0;
    left: 0px;
    right: 0;
    height: 60px;
    background: $themeHeader;
    & .titler {
      height: 60px;
      line-height: 60px;
      text-align: start;
      padding-left: 28px;
      font-size: 19px;
      font-weight: bolder;
      color: #fff;
    }
  }
  & .aside {
    position: absolute;
    top: 60px;
    left: 0;
    bottom: 0;
    width: 201px;
    background: $themeAside;
    & .menu {
      width: 200px;
      border-right: 1px solid $themeAside;
    }
  }
}
 .content {
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 60px;
    left: 201px;
    right: 0;
    bottom: 0;
 }
</style>



