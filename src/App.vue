<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
$body-background: #fafafa;
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Nunito Sans", sans-serif;
}
body {
  font-family: "Nunito Sans", sans-serif;
  background: $body-background;
}
body::-webkit-scrollbar {
  width: 10px;
}

body::-webkit-scrollbar-track {
  background-color: #ebebeb;
  -webkit-border-radius: 10px;
  border-radius: 10px;
}

body::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: #6d6d6d;
}

ul li {
  list-style: none;
}
</style>
