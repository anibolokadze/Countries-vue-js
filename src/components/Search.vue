<template>
  <input
    type="text"
    v-model="searchTerm"
    placeholder="Search for a country..."
    @input="searchItems"
  />
</template>
<script>
export default {
  name: "CountrySearch",
  props: {
    items: {
      type: Array,
    },
  },
  data() {
    return {
      searchTerm: "",
      filteredItems: [],
    };
  },
  methods: {
    searchItems() {
      if (!this.searchTerm) {
        this.filteredItems = [];
        this.$emit("update:search-term", "");
        return;
      }
      const term = this.searchTerm.toLowerCase();
      this.filteredItems = this.items.filter(
        (item) =>
          item.name.common.toLowerCase().indexOf(term) > -1 ||
          item.name.official.toLowerCase().indexOf(term) > -1
      );
      this.$emit("update:search-term", this.searchTerm);
    },
  },
};
</script>
