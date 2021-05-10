<template>
  <config-table :config="head" @click-one="handleClick" />
  <teleport to="#content">
    <bullet-frame v-if="show.editFile" @click-show="handleShow">
      <sheet v-model="state.value.files" />
    </bullet-frame>
    <bullet-frame v-show="show.editConfig" @click-show="handleShow">
      <drop-down @click-config="handleEdit" :record="record.value" :list="configFile" />
    </bullet-frame>
  </teleport>
</template>

<script>
import { computed, defineComponent, reactive, watch } from "vue";
import ConfigTable from "../components/ConfigTable.vue";
import { useStore } from "vuex";
import { key } from "../stores";
import { upload } from "../utils/upload";
import { readCsv } from "../utils/readCsv";
import { toArray } from "../utils/toArray";
import BulletFrame from "../components/BulletFrame.vue";
import Sheet from "../components/Sheet.vue";
import DropDown from "../components/DropDown.vue";
import { toast } from "../utils/toast";
import {configFile} from '../configFile'
export default defineComponent({
  name: "Step2",
  components: {
    ConfigTable,
    BulletFrame,
    Sheet,
    DropDown,
  },
  setup() {
    const store = useStore(key);
    const show = reactive({ editFile: false, editConfig: false });
    const state = reactive({
      value: { name: "", files: [] },
    });
    const record = reactive({
      value: { name: "", files: {} },
    });
    const handleShow = (param) => {
      show.editFile = param;
      show.editConfig = param;
    };
    const handleEdit = (param) => {
      record.value.files = param.state;
      show.editConfig = param.isShow;
      store.commit("syncRecord", record.value);
    };
    const handleClick = async (param) => {
      state.value.name = param.name?.trim();
      record.value.name = param.name;
      switch (param.event) {
        case "uploadFile":
          const files = await upload();
          const csv = files?.[0] ? await readCsv(files?.[0]) : "";
          show.editFile = true;
          state.value.files = toArray(csv);
          store.commit("syncConfigFiles", state.value);
          break;
        case "editFile":
          state.value.files = store.state.configFiles[param.name];
          if (!state.value.files) {
            return toast("请先上传文件");
          }
          show.editFile = true;

          break;
        case "editConfig":
          record.value.files = store.state.recordConfig[param.name];
          show.editConfig = true;
      }
    };
    watch(
      () => state.value,
      (state) => {},
      { deep: true }
    );
    return {
      head: computed(() => store.state.sourceSheet[0] ?? []),
      handleClick,
      state,
      show,
      handleShow,
      handleEdit,
      record,
      configFile
    };
  },
});
</script>

<style scoped></style>
