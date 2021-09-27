<template>
  <div class="settings-tab">
    <div class="city-form">
      <input v-model="searchCity" @input="clearError" placeholder="Input city name"/>
      <button @click="addCity()">Search</button>
    </div>
    <Loader v-show="loading"/>
    <div v-show="error" class="error">{{ error }}</div>

    <div v-for="(item, index) in cities" :key="item.name" class="options-city-row">
      <span class="options-city-name">{{ item.name }}</span>
      <span class="pointer" @click="removeCity(index)">🗑</span>
    </div>
    <button v-show="this.cities.length" @click="deleteAll">Clear all</button>
  </div>

</template>

<script>
import axios from "axios";
import Loader from "@/components/Loader";


export default {
  name: "Settings",
  components: {Loader},
  props: ['cities'],
  data() {
    return {
      loading: false,
      error: false,
      searchCity: '',
    }
  },
  methods: {
    deleteAll() {
      this.cities = [];
      this.saveCities();
    },
    clearError() {
      this.error = false;
    },
    addCity() {
      if (!this.cities.map(c => c.name.toLowerCase()).includes(this.searchCity.toLowerCase())) {
        this.loading = true;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.searchCity}&appid=b8475c6ee4917ca1020cbca524988ee6`
        console.log(url)
        axios
            .get(url)
            .then(res => {
              this.error = false;
              this.cities.push(res.data);
              this.searchCity = '';
              this.saveCities()
              console.log(res.data);
              this.loading = false;
            })
            .catch(err => {
              this.error = `${this.searchCity} - not found`;
              console.log(err)
              this.loading = false;
            })
      } else {
        this.error = `${this.searchCity} - already exists`;
      }
    },
    removeCity(index) {
      this.cities.splice(index, 1);
      this.saveCities()
    },
    saveCities() {
      localStorage.cities = JSON.stringify(this.cities);
    }
  }
}
</script>

<style scoped>

</style>