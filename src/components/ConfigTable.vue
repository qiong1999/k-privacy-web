<template>
  <div class="configTable">
    <div v-for="item in config" :key="item" @click="handleClick" :id="item">
      {{ item }}
      <span id="editConfig"> 修改配置 </span>
      <span id="editFile"> 修改文件 </span>
      <span id="uploadFile"> 上传文件 </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ConfigTable",
  props: {
    config: Array,
  },
  setup(props, context) {
    const handleClick = (event) => {
      context.emit('click-one',{name: event.target.parentNode.id, event: event.target.id})
    };
    return { handleClick };
  },
});
</script>

<style scoped lang="scss">
@import '../styles/variable';
.configTable {

  width:900px;
  user-select: none;
  & div {
    height: 64px;
    line-height: 64px;
    text-align: start;
    padding: 0 19px;
    font-size: 21px;
    color: #6c727f;
    border-bottom:1px solid rgb(185, 184, 184);
    & span {
      float: right;
      margin: 0 8px;
       cursor:pointer;
      font-size: 16px;
      color: $themeHeader;
    }
  }
 
}
</style>