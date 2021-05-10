<template>
  <div>
    <dropdown
      :list="globalConfig"
      :record="record.value"
      @click-config="handleClick"
    />
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import Dropdown from "../components/DropDown.vue";
import { useStore } from "vuex";

import { configFile } from "../configFile";
import { globalConfig } from "../globalConfig";
import { key } from "../stores";

export default defineComponent({
  name: "step3",
  components: {
    Dropdown,
  },
  setup() {
    const store = useStore(key);
    const record = reactive({
      value: { name: "", files: store.state.globalConfig??{} },
    });
   

    const handleClick = (param) => {
      //console.log(param.state);
      store.commit('syncGlobalConfig', param.state)
      alert("修改成功")
      console.log(store.state)
      
    };
    return { globalConfig, record, configFile, handleClick };
  },
});
</script>

<style scoped>
</style>