<template>
  <div class="dropDown">
    <form @submit="handleCommit">
      <div
        class="row"
        v-for="i in list.values"
        :key="i"
        v-show="handleClick(i)"
      >
        <span>{{ i.name }}:</span>
        <span>
          <select
            v-if="i.property === 'select'"
            v-model.lazy="state.values[i.name]"
            :disabled="!handleClick(i)"
            required="required"
          >
            <option v-for="item in i.value" :key="item">{{ item }}</option>
          </select>
          <input
            :id="i.name"
            v-else-if="i.property === 'input'"
            v-model.lazy="state.values[i.name]"
            type="number"
            :min="i?.min"
            :max="i?.max"
            :step="i.min=='0.0'?'0.01':i.min"
            v-on:input="limit(i.limit, $event)"
            :placeholder="i.prompt"
             :disabled="!handleClick(i)"
              required
          />
          <div
            class="checkSpan"
            v-else-if="i.property === 'checkbox'"
            v-for="checkItem in i.value"
            :key="checkItem"
          >
            <input
              :disabled="!handleClick(i)"
              :required="req.value"
              :name="i.name"
              type="checkbox"
              :value="checkItem"
              v-on:input="limit(i.limit, $event)"
            />{{ checkItem }}
          </div>
        </span>
      </div>
      <input class="btn" value="确认修改" type="submit" />
    </form>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from "vue";
export default defineComponent({
  name: "dropdown",
  props: ["record", "list"],
  setup(props, context) {
    const inputValue = ref(null);
    let state = reactive({ values: props?.record?.files ?? {} });
    const list = reactive({ values: props.list });
    const req = reactive({value:true})

    // console.log(checkbox);
    const handleClick = (i) => {
      let target;

      if (i.dependence) {
        target = i.dependence.split("===");
        return (
          state.values[target[0]] == target[1] ||
          state.values[target[0]]?.indexOf(target[1]) >= 0
        );
      }
      return true;
    };
    const limit = (param, e) => {
      if (e.target.type === "checkbox" && e.target.checked) {
        state.values[e.target.name]
          ? state.values[e.target.name].push(e.target.value)
          : (state.values[e.target.name] = [e.target.value]);
          req.value = false
        //console.log(e.target.name, e.target.value)
      } else if (e.target.type === "checkbox" && !e.target.checked) {
        state.values[e.target.name] = state.values[e.target.name]?.filter(
          (item) => item !== e.target.value
        );
      }
      if( e.target.type==="checkbox"&&state.values[e.target.name].length<=0 ){
        req.value = true
      }
      e.target.value = e.target.value?.replace(new RegExp(param, "g"), "");
    };
    const handleCommit = (e) => {
      context.emit("click-config", { state: state.values, isShow: false });
      e.preventDefault();
    };

    //生命周期函数
    watch(
      () => props.record,
      () => {
        state.values = props.record?.files ?? {};
      },
      {
        deep: true,
      }
    );
    watch(
      () => props.list,
      () => {
        
        list.values = props.list;
      }
    );

    return {
      state,
      inputValue,
      handleClick,
      handleCommit,
      limit,
      list,
      req
    };
  },
});
</script>

<style scoped lang="scss">
@import '../styles/variable.scss';
input {
  outline: none;
  padding: 5px 0;
  padding-left: 10px;
  font-size: 12px;
  font-weight: bold;
  width:150px;
}
.dropDown {
  position: relative;
  font-size: 17px;
  font-weight: bolder;
  margin:0 72px;
  & div {
    display:inline-block;
    padding: 5px;
    & span {
      vertical-align: top;
      display: inline-block;
      text-align: end;
      padding-right: 21px;
    }
    & span:nth-child(2) {
      text-align: start;
    }
    & select {
      outline: none;
      padding: 5px 0;
      font-size: 12px;
      font-weight: bold;
      & option {
        font-size: 12px;
        font-weight: bold;
      }
    }
  }
}

.btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 15px;
  font-weight: bold;
  width: 177px;
  margin-top: 100px;
  border-radius: 5px;
  background: $themeAside;
  color: #fff;
}

.checkSpan {
  vertical-align: bottom;
  display:inline-block;
  & input {
    width:25px;
    margin-right: 5px;
  }
  font-size: 12px;
  font-weight: bold;
}
</style>