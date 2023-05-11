<template>
  <button @click="goBack">Go Back</button>
  <div v-if="loading" class="loading">
    <img class="loader" src="../assets/Spinner-1s-200px.svg" />
  </div>
  <div v-if="country">
    <p>Population: {{ country.population }}</p>
    <p>Region: {{ country.region }}</p>
    <p>Capital: {{ country.capital ? country.capital.join(", ") : "Not Found" }}</p>
    <p>Area: {{ country.area }} km²</p>
    <p>Languages: {{ formatLanguages(country.languages) }}</p>
    <p>Currencies:
      <ul>
        <li v-for="currency in country.currencies" :key="currency.name">
          {{ currency.name }} ({{ currency.symbol }})
        </li>
      </ul>
    </p>
  </div>
  <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      country: null,
      loading: true,
      errorMessage:''
    };
  },
  created() {
    this.fetchCountryDetails();
  },
  methods: {
    fetchCountryDetails() {
      const countryName = this.$route.params.name;
      axios
        .get(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((response) => {
          this.country = response.data[0];
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.errorMessage = "Error loading data. Please try again later.";
      });
     
    },
    formatLanguages(languages) {
      if (Array.isArray(languages)) {
        return languages.join(", ");
      }
      return "Not Found";
    },
    goBack() {
      this.$router.push('/');
    },

  }
};
</script>
<style scoped lang="scss">
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
</style>