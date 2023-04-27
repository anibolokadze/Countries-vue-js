<template>
  <div>
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
  name: "App",
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
