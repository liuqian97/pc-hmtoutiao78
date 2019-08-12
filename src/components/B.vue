<template>
    <div>com-B <button @click="fn()">给a组件传值</button></div>
</template>

<script>
import eventBus from '@/components/eventBus'
export default {
  name: 'com-B',
  data () {
    return {
      msg: 'b组件中的数据'
    }
  },
  methods: {
    fn () {
      eventBus.$emit('b2a', this.msg)
    }
  }
}
</script>

<style>

</style>
