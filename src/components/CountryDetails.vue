<template>
  <div v-if="!loading">
    <h1>{{ country.name && country.name.official }}</h1>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CountryDetails",
  filters: {
    formatLanguages(languages) {
      return Object.values(languages).join(", ");
    },
  },
  data() {
    return {
      country: {},
      loading: true,
    };
  },
  // created() {
  //   const name = this.$route.params.name;
  //   this.fetchCountry(this.$route.params.name);
  // },
  methods: {
    fetchCountry() {
      const name = this.$route.params.name;
      axios
        .get(`https://restcountries.com/v3.1/name/${name}`)
        .then((response) => {
          this.country = response.data[0];
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
