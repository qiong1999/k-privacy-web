<template>
  <menu-tab>
    <step-1 />
  </menu-tab>
</template>

<script>
import MenuTab from '../components/Menu.vue'
import Step1 from './Step1.vue'
import Step2 from './step2.vue'

export default {
  name: 'Home',
  components: {
    MenuTab,
    Step1,
    Step2
  },
  setup() {
    
  },
}
</script>

<style scoped>

</style>