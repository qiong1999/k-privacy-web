<template>
  <div class="container">
    <div class="step">
      <span class="circle"></span>
      <div>step1</div>
    </div>
    <div class="step2">
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<style scoped lang="scss">
.container {
  font-size: 12px;
  color: rgba(124, 124, 124, 0.5);
  & .step {
    display:inline-block;
    text-align: center;
    vertical-align: middle;
  }
  & .circle {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    
    background: rgba(124, 124, 124, 0.5);
  }
  & .step2{
    
  }
}
</style>