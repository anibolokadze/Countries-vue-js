<template>
  <div class="custom-select">
    <div class="selected" @click="toggleOptions">
      {{ selectedContinent || "Filter by Region" }}
    </div>
    <ul class="options" :class="{ 'options-show': showOptions }">
      <li class="option" @click="updateSelectedContinent('')">All countries</li>
      <li
        v-for="continent in continents"
        :key="continent"
        class="option"
        @click="updateSelectedContinent(continent)"
      >
        {{ continent }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Filter",
  props: {
    continents: {
      type: Array,
    },
    selectedContinent: {
      type: String,
    },
  },
  data() {
    return {
      showOptions: false,
    };
  },
  methods: {
    updateSelectedContinent(continent) {
      this.$emit("update:selectedContinent", continent);
      this.showOptions = false;
    },
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  width: 400px;
}
.selected {
  background-color: white;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.0532439);
  border-radius: 5px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  font-size: 12px !important;
  cursor: pointer;
}

.options {
  position: absolute;
  top: 56px;
  left: 0;
  width: 250px;
  height: 144px;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: white;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.0532439);
  border-radius: 5px;
  z-index: 1;
  overflow-y: scroll;
  max-height: 200px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.options-show {
  opacity: 1;
}
.option {
  display: block;
  padding: 16px;
  font-size: 16px;
  color: #333333;
  cursor: pointer;
  font-size: 12px !important;
}
.option:hover {
  background-color: #f5f5f5;
}
</style>
