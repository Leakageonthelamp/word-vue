<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
#nav {
  padding: 30px;
}

#nav a {
  padding: 10px;
  font-weight: bold;
  color: #2c3e50;

  &:hover {
    background: #42b983;
  }
}

#nav a.router-link-exact-active {
  color: lightgray;
}
</style>
