<template>
  <div class="flipper">
    <div
      v-for="item in pageNumber"
      :key="item"
      class="cardItem"
      :style="`transform: translateX(-50%) translateZ(${
        item === curPage ? 10 : -10
      }px) rotateY(${item === curPage ? 0 : 180}deg)`"
    >
      <slot :name="item"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { reactive } from "vue";

export default defineComponent({
  name: "Flipper",
  props: {
    pageNumber: Number,
    curPage: Number,
  },
  setup() {
    // console.log("flipper");
  },
});
</script>

<style scoped>
.flipper {
  @apply relative;
  transform-style: preserve-3d;
}
.cardItem {
  @apply absolute left-2/4;

  backface-visibility: hidden;
  background: #e1e7fd;
  padding: 20px 0;
  transition: transform 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;
  box-shadow: 1px 1px 1px #b3b5b4;
}
</style>
