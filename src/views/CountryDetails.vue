<template>
  <h1 class="header-">Where in the world?</h1>
  
  <button @click="goBack">
    <img src="../assets/arrow.svg"/>
    Go Back
  </button>
  
  <div v-if="loading" class="loading">
    <img class="loader" src="../assets/Spinner-1s-200px.svg" />
  </div>
  <div v-if="country">
    <img :src="country.flags.png" alt="Flag" />
    <p>{{ country.name.official }}</p>
    <p>Native name {{ `country.name.nativeName.${countryName}.common` &&  "Not Found" }}</p>
    <p>Population: 
      <span>
        {{
          (country.population / 1000).toLocaleString("en-US", {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          })
        }}
      </span>
    </p>
    <p>Region: {{ country.region }}</p>
    <p>Sub Region: {{ country.subregion }}</p>
    <p>Capital: {{ country.capital ? country.capital.join(", ") : "Not Found" }}</p>
    <p>Top Level Domain: {{ country.tld[0] }} </p>
    <p>Languages:
      <ul>
        <li v-for="language in country.languages" :key="language">
          {{ language }}
        </li>
      </ul>
    </p>
    <p>Border Countries: 
      <ul>
        <li v-for="border in country.borders" :key="border">
          {{ border }}
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
          console.log(response)
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.errorMessage = "Error loading data. Please try again later.";
      });
     
    },
    goBack() {
      this.$router.push('/');
    },

  }
};
</script>
<style scoped lang="scss">
h1 {
  font-weight: 800;
  font-size: 14px;
  line-height: 20px;
  color: #111517;
  padding: 16px 30px;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0562443);
  margin-bottom: 24px;
  @media (min-width: 960px) {
    font-size: 24px;
    padding: 23px 0 23px 81px;
  }
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
</style>