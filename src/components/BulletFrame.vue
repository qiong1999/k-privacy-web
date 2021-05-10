<template>
  <div class="frame" >
    <div class="bullet">
      <div class="close" @click="handleClick"></div>
      <div>
         <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Sheet from './Sheet.vue'
export default defineComponent({
  name: 'BulletFrame',
  components: {
    Sheet,
  },
  setup(props, context) {
  //  console.log(props.visit, "props.display")
    const list = [
      ['age', 'name'],
      ['23', '薪弛']
    ]
    const handleClick = () => {
      context.emit('click-show',false)
    }
    return { list, handleClick }
  },
})
</script>

<style scoped lang="scss">
div{
  margin:0;
  padding:0;
}
.frame {
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  padding:100px;
  background-color:rgba(163, 162, 162, 0.1);
  z-index:10000;
  & .bullet{
    width:100%;
    height:100%;
    padding:21px;
    & .close {
      float:right;
      width:20px;
      height:20px;
      font-size:11px;
      cursor: pointer;
      background-image:url('../assets/close.png');
      background-size:cover;
    }
    background-color: #E1E7FD;
    & div {
      width:100%;
      height:100%;
       overflow:auto;
    }
  }
  
}
</style>