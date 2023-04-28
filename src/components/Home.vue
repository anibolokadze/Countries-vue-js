<template>
  <Filter
    :continents="continents"
    :selected-continent="selectedContinent"
    @update:selected-continent="updateSelectedContinent"
  />
  <main>
    <ul>
      <li v-for="item in filteredItems" :key="item.id">
        <img :src="item.flags.png" alt="Flag" />
        <div class="item-content">
          <h2>{{ item.name.official }}</h2>
          <h3>
            Population:
            <span>
              {{
                (item.population / 1000).toLocaleString("en-US", {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                })
              }}
            </span>
          </h3>
          <h3>
            Region: <span>{{ item.region }}</span>
          </h3>
          <h3>
            Capital:
            <span>{{
              item.capital ? item.capital.join(", ") : "Not Found"
            }}</span>
          </h3>
        </div>
      </li>
    </ul>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </main>
</template>

<script>
import axios from "axios";
import Filter from "@/components/Filter.vue";

export default {
  name: "Home",
  components: {
    Filter,
  },
  data() {
    return {
      items: [],
      errorMessage: "",
      selectedContinent: "",
    };
  },
  computed: {
    filteredItems() {
      return this.selectedContinent
        ? this.items.filter((item) => item.region === this.selectedContinent)
        : this.items;
    },
    continents() {
      const regions = this.items.map((item) => item.region);
      return Array.from(new Set(regions));
    },
  },
  methods: {
    updateSelectedContinent(continent) {
      this.selectedContinent = continent;
    },
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

<style lang="scss" scoped>
$country-name: #111517;
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 60px;
  column-gap: 70px;

  li {
    background: white;
    box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.0294384);
    border-radius: 5px;
    width: 264px;
    height: 336px;
    cursor: pointer;
    .item-content {
      padding: 24px 0px 46px 24px;
    }
    img {
      width: 263px;
      height: 160px;
    }
    h2 {
      color: $country-name;
      font-size: 18px;
      margin-bottom: 16px;
    }
    h3 {
      font-size: 14px;
      margin-bottom: 8px;
      span {
        font-weight: 400;
        font-size: 14px;
      }
    }
  }
}
</style>
