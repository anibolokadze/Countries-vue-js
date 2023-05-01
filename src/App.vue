<template>
  <Home />
</template>

<script>
import Home from "./components/Home";
export default {
  name: "App",
  components: {
    Home,
  },
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
ul li {
  list-style: none;
}
</style>
