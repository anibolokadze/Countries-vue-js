<template>
  <div :class="{ light: light }" @click="toggleTheme">{{ modeText }}</div>
</template>

<script>
import { ref, computed, getCurrentInstance } from "vue";

export default {
  setup() {
    const light = ref(true);
    const instance = getCurrentInstance();
    const toggleTheme = () => {
      light.value = !light.value;
      instance.emit("toggle-theme", light.value);
    };
    const modeText = computed(() => (light.value ? "Light Mode" : "Dark Mode"));

    return {
      light,
      toggleTheme,
      modeText,
    };
  },
};
</script>
<style scoped>
div {
  background: blue;
}
div:not(.light) {
  background: red;
}
</style>
