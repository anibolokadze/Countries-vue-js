<template>
  <div>
    <img src="../assets/icons8-search-30.png" />
    <input
      type="text"
      v-model="searchTerm"
      placeholder="Search for a country..."
      @input="searchItems"
    />
  </div>
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
<style lang="scss" scoped>
div {
  background: white;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.0532439);
  border-radius: 5px;
  width: 700px;
  height: 48px;
  display: flex;
  align-items: center;
  padding: 16px 32px;

  input {
    border: none;
    outline: none;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    width: 100%;
    @media (min-width: 960px) {
      height: 56px;
      font-size: 14px;
    }
  }
}
.no-results {
  color: red;

  font-size: 14px;
  display: flex;
}
img {
  margin-right: 26px !important;
  width: 15px;
}
</style>
