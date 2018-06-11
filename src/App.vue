<template>
  <div id="aura-app">
    <!-- <img src="./assets/aura-full.png"> -->
    <Auragramma msg="Welcome to Auragramma"/>
  </div>
</template>

<script>
import Auragramma from './components/Auragramma.vue'

export default {
  name: 'aura-app',
  components: {
    Auragramma
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
