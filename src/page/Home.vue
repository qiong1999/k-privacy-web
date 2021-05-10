<template>
  <menu-tab>
    <div class="nav">
      <el-steps :active="active.active" >
        <el-step title="step1"></el-step>
        <el-step title="step2"></el-step>
        <el-step title="step3"></el-step>
      </el-steps>
      <el-button class="pre"  @click ="pre"> 上一步</el-button>
      <el-button class="next"  @click="next"
        >下一步</el-button
      >
    </div>
    <step-1 v-if="active.active === 0" />
    <step-2 v-else-if="active.active === 1" />
    <step-3 v-else-if="active.active === 2" />
    <step-4 v-else-if="active.active === 3" />
  </menu-tab>
</template>

<script>
import { reactive } from "vue";
import MenuTab from "../components/Menu.vue";
import Step1 from "./Step1.vue";
import Step2 from "./Step2.vue";
import Step3 from "./Step3.vue";
import Step4 from "./Step4.vue"
export default {
  name: "Home",
  components: {
    MenuTab,
    Step1,
    Step2,
    Step3,
    Step4
  },
  setup() {
    const active = reactive({
      active: 0,
    });
    const next = () => {
      if (active.active >2) {
        return;
      } else {
        active.active++;
      }
      
    };
    const pre = () => {
      if(active.active <= 0){
        return;
      }
      active.active--;
    }
    return {
      next,
      active,
      pre,
    };
  },
};
</script>

<style scoped>
.nav {
  width:500px;
  position: relative;
  margin: 40px 0 113px;
}
.next {
  position: absolute;
  top: 7px;
  right: -200px;
}
.pre{
  position:absolute;
  top:7px;
  left:-200px;
}
</style>