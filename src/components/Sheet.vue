<template>
  <div class="table" ref="table" >
    <div
      class="table_item"
      v-for="(item, row) in state.list"
      :key="row"
     
    >
      <input
        v-for="(ittem, column) in item"
        :key="ittem"
        :id="`${row}, ${column}`"
        :style="`min-width:${state.width * 20}px`"
        v-model.lazy="item[column]"
         @contextmenu="handleMenu"
      />
    </div>
    <div class="menu" ref="contextmenu">
      <div id="addRow" @click="handleClick">添加行</div>
      <div id="addCol" @click="handleClick">添加列</div>
      <div id="deleteRow" @click="handleClick">删除行</div>
      <div id="deleteCol" @click="handleClick">删除列</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onUpdated, ref } from "vue";

export default defineComponent({
  name: "Sheet",
  props: ["modelValue"],
  setup(props) {
    const data = props.modelValue || [];
    // console.log("data", data, props.modelValue);
    let listIndex = {};
    const contextmenu = ref(null);
    const table = ref(null)
    const state = reactive({
      list: data,
      width:
        data.length <= 0
          ? 0
          : data.flat(2).reduce(function (prev, cur) {
              return prev.length > cur.length ? prev : cur;
            }).length,
    });
    window.addEventListener("click", () => {
      if (contextmenu.value) {
        contextmenu.value.style.display = "none";
      }
    });
    //自定义函数
    const handleMenu = (event) => {
      // console.log(event.x,event.y,"event", event.target.getClientRects()[0])
      event.preventDefault();
      // console.log(event.target.id);
      listIndex = event.target.id;
      contextmenu.value.style.display = "block";
      contextmenu.value.style.top = event.y - table.value.getClientRects()[0].y + "px";
      contextmenu.value.style.left = event.x - table.value.getClientRects()[0].x + "px";
    };
    const handleClick = (event) => {
      const [row, column] = listIndex.split(",").map((item) => Number(item));
      // console.log(row, column);
      switch (event.target.id) {
        case "addRow":
          state.list.splice(row + 1, 0, new Array(state.list[0].length));
          break;
        case "addCol":
          state.list.map((item) => item.splice(column + 1, 0, ""));
          break;
        case "deleteRow":
          state.list.splice(row, 1);
          break;
        case "deleteCol":
          state.list.map((item) => item.splice(column, 1));
      }
      contextmenu.value.style.display = "none";
    };

    //vue生命周期
    onUpdated(() => {
      state.list = props.modelValue;
      state.data =
        props.modelValue?.length <= 0
          ? 0
          : props.modelValue?.flat(2)?.reduce(function (prev, cur) {
              return prev.length > cur.length ? prev : cur;
            }).length;
      if (state.list?.length <= 0 || state.list?.[0].length <= 0) {
        return;
      }
      state.width = state.list.flat(2).reduce(function (prev, cur) {
        return prev.length > cur.length ? prev : cur;
      }).length;
    });
    return { state, handleMenu, contextmenu, handleClick, table };
  },
});
</script>

<style scoped>
input {
  outline: none;
  width: 0;
}
.table {
  position: relative;
}
.table_item {
  white-space: nowrap;
  margin: 8px 0;
}
.table input {
  @apply inline-block  bg-white;
  text-align: center;
  font-size: 26px;
  padding: 6px 0;
  margin: 0 4px;
  border-radius: 5px;
  box-shadow: inset 0px 4px 10px -5px rgba(0, 0, 0, 0.25);
}
.menu {
  display: none;
  position: absolute;
  width: 191px;
  padding: 11px 0;
  border-radius: 3px;
  border: 2px solid rgb(245, 245, 245);
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  text-align: start;
  font-size: 11px;
  user-select: none;
  background: #fff;
}
.menu div:nth-child(2) {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom: 2px solid rgb(245, 245, 245);
}
.menu div:nth-child(3) {
  padding-top: 5px;
}
.menu div {
  padding-left: 13px;
  padding-bottom: 5px;
}
</style>
