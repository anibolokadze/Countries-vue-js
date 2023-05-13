<template>
  <div>
    <h1 class="header-">Where in the world?</h1>
    <header>
      <Search :items="items" @update:search-term="updateSearchTerm" />
      <Filter
        :continents="continents"
        @update:selected-continent="updateSelectedContinent"
      />
    </header>

    <main>
      <div v-if="loading" class="loading">
        <img class="loader" src="../assets/Spinner-1s-200px.svg" />
      </div>
      <div v-else>
        <ul>
          <li v-for="item in filteredItems" :key="item.name.common">
            <router-link
              :to="{
                name: 'country-detail',
                params: { name: item.name.common },
              }"
              class="router-link-active"
            >
              <img :src="item.flags.png" alt="Flag" />
              <div class="item-content">
                <h2>{{ item.name.common }}</h2>
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
            </router-link>
          </li>
        </ul>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="filteredItems.length === 0 && searchTerm" class="search-error">
        No results
      </p>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import Filter from "@/components/Filter.vue";
import Search from "@/components/Search.vue";

export default {
  name: "Home",
  components: {
    Filter,
    Search,
  },
  data() {
    return {
      items: [],
      errorMessage: "",
      selectedContinent: "",
      searchTerm: "",
      loading: true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("https://restcountries.com/v3.1/all")
        .then((response) => {
          this.items = response.data;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.errorMessage = "Error loading data. Please try again later.";
        });
    },
    updateSelectedContinent(continent) {
      this.selectedContinent = continent;
    },
    updateSearchTerm(term) {
      this.searchTerm = term;
    },
    toggleTheme(value) {
      this.light = value;
    },
  },
  computed: {
    filteredItems() {
      let items = this.selectedContinent
        ? this.items.filter((item) => item.region === this.selectedContinent)
        : this.items;

      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        items = items.filter(
          (item) =>
            item.name.common.toLowerCase().indexOf(term) > -1 ||
            item.name.official.toLowerCase().indexOf(term) > -1
        );
      }

      return items;
    },
    continents() {
      const regions = this.items.map((item) => item.region);
      return Array.from(new Set(regions));
    },
  },
};
</script>

<style lang="scss" scoped>
$main-color: #111517;
.router-link-active {
  text-decoration: none;
  color: $main-color;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}
header,
main {
  padding: 0 16px;
  @media (min-width: 960px) {
    padding: 0 81px;
  }
}
h1 {
  font-weight: 800;
  font-size: 14px;
  line-height: 20px;
  color: $main-color;
  padding: 16px 30px;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0562443);
  margin-bottom: 24px;
  @media (min-width: 960px) {
    font-size: 24px;
    padding: 23px 0 23px 81px;
  }
}
header {
  display: flex;
  flex-wrap: wrap;
  row-gap: 40px;
  column-gap: 20px;
  justify-content: space-between;
}
.error-message,
.search-error {
  color: red;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
}
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

    &:hover {
      transition: all 0.3s ease-in;
      -ms-transform: scale(1.1);
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
    .item-content {
      padding: 24px 0px 46px 24px;
    }
    img {
      width: 263px;
      height: 160px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    h2 {
      color: $main-color;
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
