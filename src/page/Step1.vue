 
<template>
  <el-button type="primary" size="medium" @click="up">上传文件</el-button>
  <br />
  <div class="hint">跳过文件上传，直接编辑表格</div>
</template>

<script>
import { reactive, watch } from "vue";
import { useStore } from "vuex";
import { upload } from "../utils/upload";
import { readCsv } from "../utils/readCsv";
import { toArray } from "../utils/toArray";
import { key } from "../stores";

export default {
  name: "Step1",
  setup() {
    const state = reactive({
      uploaded: false,
      array: [[" "]],
    });

    const store = useStore(key);

    async function up() {
      const files = await upload();
      const csvString = files?.[0] ? await readCsv(files?.[0]) : "";
      const csv = toArray(csvString);
      state.array = csv;
      state.uploaded = true;
    }

    watch(
      () => state.array,
      (state) => {
        store.commit("syncSourceSheet", state);
      },
      {
        deep: true,
      }
    );

    function goEdit() {
      state.uploaded = true;
    }

    function log() {
      console.log(state.array);
    }

    return {
      state,
      up,
      goEdit,
      log,
      up,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";
 
 .hint { 
      border-bottom:1px solid rgb(197, 196, 196);
      color:rgb(197, 196, 196);
      width:210px;
      // background:red;
    }
</style>



