<template>
<header class="header">
    <h2>Kitchen-Kanban</h2>
     <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/menu">Menu</router-link> |
      <router-link to="/about">About</router-link>
    </div>
</header>
</template>
<script>
export default {
    name:"Header"
}
</script>
<style scoped>
.header{
    background-color: black;
    color: blanchedalmond;
    text-align: center;
}
</style>