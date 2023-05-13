<template>
  <h1 class="header-">Where in the world?</h1>
  <main>
    <button @click="goBack">
      <img src="../assets/arrow.svg" />
      <p>Go Back</p>
    </button>

    <div v-if="loading" class="loading">
      <img class="loader" src="../assets/Spinner-1s-200px.svg" />
    </div>
    <div v-if="country" class="content">
      <div>
        <img :src="country.flags.png" alt="Flag" class="flag" />
      </div>
      <div class="info">
        <h2>{{ country.name.common }}</h2>
        <div class="columns">
          <div class="first-column">
            <h3>
              Native name:
              <span>
                {{
                  country.name.nativeName &&
                  country.name.nativeName[countryName]?.common
                    ? country.name.nativeName[countryName].common
                    : "Not Found"
                }}
              </span>
            </h3>
            <h3>
              Population:
              <span>
                {{
                  (country.population / 1000).toLocaleString("en-US", {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  })
                }}
              </span>
            </h3>
            <h3>
              Region:
              <span>
                {{ country.region }}
              </span>
            </h3>
            <h3>
              Sub Region:
              <span>
                {{ country.subregion }}
              </span>
            </h3>
            <h3>
              Capital:
              <span>
                {{
                  country.capital && country.capital.length
                    ? country.capital.join(", ")
                    : "Not Found"
                }}
              </span>
            </h3>
          </div>
          <div class="second-column">
            <h3>
              Top Level Domain:
              <span>
                {{
                  country.tld && country.tld.length
                    ? country.tld[0]
                    : "Not Found"
                }}
              </span>
            </h3>
            <h3>
              Languages:
              <div>
                <span v-for="language in country.languages" :key="language">
                  {{ language + "  " }}
                </span>
              </div>
            </h3>
          </div>
        </div>
        <div class="border-countries">
          <h3>
            Border Countries:
            <div>
              <template v-if="country.borders && country.borders.length">
                <span v-for="border in country.borders" :key="border">
                  {{ border }}
                </span>
              </template>
              <template v-else>
                <span>Not Found</span>
              </template>
            </div>
          </h3>
        </div>
      </div>
    </div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      country: null,
      loading: true,
      errorMessage: "",
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
    goBack() {
      this.$router.push("/");
    },
  },
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
  margin-bottom: 40px;
  @media (min-width: 960px) {
    font-size: 24px;
    padding: 23px 0 23px 81px;
    margin-bottom: 80px;
  }
}
h2 {
  font-size: 22px;
  margin-bottom: 16px;
  text-align: left;
  @media (min-width: 960px) {
    font-size: 32px;
    margin-bottom: 50px;
  }
}
h3 {
  font-size: 14px;
  margin-bottom: 10px;
  @media (min-width: 960px) {
    font-size: 18px;
  }
  span {
    font-weight: 400;
    font-size: 14px;
    @media (min-width: 960px) {
      font-size: 16px;
    }
  }
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
.columns {
  @media (min-width: 960px) {
    display: flex;
    -moz-column-gap: 20px;
    column-gap: 50px;
  }
}
button {
  all: unset;
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.293139);
  border-radius: 2px;
  font-size: 14px;
  width: 104px;

  display: flex;
  justify-content: space-evenly;
  margin-bottom: 64px;
  width: 104px;
  height: 32px;
  cursor: pointer;
  align-items: center;
  img {
    height: 12px;
  }
}
main {
  padding: 0 20px;
  @media (min-width: 960px) {
    padding: 0 81px;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    @media (min-width: 960px) {
      display: flex;
      flex-direction: row;
      -moz-column-gap: 20px;
      column-gap: 20px;
      justify-content: space-evenly;
    }
  }
  .flag {
    width: 319.84px;
    max-width: 100%;
    height: 229px;
    box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.0294384);
    border-radius: 5.71755px;
    margin-bottom: 44px;
    @media (min-width: 960px) {
      width: 560px;
      height: 401px;
    }
  }
  .first-column,
  .second-column {
    margin-bottom: 32px;
  }
  .border-countries div {
    margin-top: 16px;
    span {
      background: #ffffff;
      box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.104931);
      border-radius: 2px;
      padding: 6px 20px;
    }
  }
}
</style>
