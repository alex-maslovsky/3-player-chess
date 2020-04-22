<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import './app.scss';
import './services/socket-service'

export default {
  name: 'App'
}
</script>
