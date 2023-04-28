<template>
  <select
    id="continent"
    :value="selectedContinent"
    @input="updateSelectedContinent"
  >
    <option value="">Filter by Region</option>
    <option v-for="continent in continents" :value="continent" :key="continent">
      {{ continent }}
    </option>
  </select>
</template>

<script>
export default {
  name: "Filter",
  props: {
    continents: {
      type: Array,
      required: true,
    },
    selectedContinent: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateSelectedContinent(event) {
      this.$emit("update:selectedContinent", event.target.value);
    },
  },
};
</script>
