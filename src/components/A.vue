<template>
    <div>com-A {{msg}}</div>
</template>

<script>
import eventBus from '@/components/eventBus'
export default {
  name: 'com-A',
  data () {
    return {
      msg: ''
    }
  },
  created () {
    eventBus.$on('b2a', (data) => {
      this.msg = data
    })
  }
}
</script>

<style>

</style>
