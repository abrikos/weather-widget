<template>
  <div class="settings-tab">
    <div class="city-form">
      <input v-model="searchCity" @input="clearError" placeholder="Input city name"/>
      <button @click="addCity()">Add</button>
    </div>
    <Loader v-show="loading"/>
    <div v-show="error" class="error">{{ error }}</div>

    <div v-for="(item) in cities" :key="item.name" class="options-city-row">
      <span class="options-city-name">{{ item.name }}</span>
      <span class="pointer" @click="removeCity(item)">🗑</span>
    </div>
    <button @click="deleteAll">Clear all</button>
  </div>

</template>

<script>
import Loader from "@/components/Loader";
import store from "./store";


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
      store.deleteAll();
    },
    clearError() {
      this.error = false;
    },
    async addCity() {
      this.loading = true;
      const res = await store.addCity(this.searchCity);
      this.error = res.error;
      this.loading = false;
    },
    removeCity(city) {
      store.deleteCity(city)
    }
  }
}
</script>

<style scoped>

</style>