<template>
  <div>
    <h1>Where in the world?</h1>
    <ul>
      <li v-for="item in items" :key="item.id">
        <img :src="item.flags.png" alt="Flag" />
        {{ item.name.official }}
        <p>
          Population:
          {{
            (item.population / 1000).toLocaleString("en-US", {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            })
          }}
        </p>
        <p>Region: {{ item.region }}</p>
        <p>
          Capital: {{ item.capital ? item.capital.join(", ") : "Not Found" }}
        </p>
      </li>
    </ul>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      items: [],
      errorMessage: "",
    };
  },
  mounted() {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        this.items = response.data;
      })
      .catch(() => {
        this.errorMessage = "Error loading data. Please try again later.";
      });
  },
};
</script>
<style>
body {
  font-family: "Nunito Sans", sans-serif;
}
ul li {
  list-style: none;
}
</style>
