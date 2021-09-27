<template>
  <div>
    <div v-show="!optionsEnabled" class="widget-header">
      <span >&nbsp;</span>
      <span class="gear" @click.prevent="toggleOptions()">⚙</span>
    </div>
    <div v-show="optionsEnabled" class="widget-header">
      <span>Settings</span>
      <span class="gear" @click.prevent="toggleOptions()">✕</span>
    </div>
    <hr/>
    <div v-show="optionsEnabled" class="options-tab">
      <div class="city-form">
        <input v-model="searchCity" @input="clearError" placeholder="Add city"/>
        <button @click="addCity()">Send</button>
      </div>
      <Loader v-show="loading"/>
      <div v-show="error" class="error">City <strong>{{ searchCity }}</strong> not found</div>
      <SettingsRow v-for="(row,index) in cities" :city="row" v-on:remove="removeCity(index)" :key="`options`+index"/>
      <button v-show="this.cities.length" @click="deleteAll">Clear all</button>
    </div>

    <CityWeather  v-show="!optionsEnabled" :cities="cities" />

  </div>

</template>

<script>
import axios from "axios";
import "./weather-widget.sass"
import SettingsRow from "@/components/weather-widget/SettingsRow";
import Loader from "@/components/Loader";
import CityWeather from "@/components/weather-widget/WeatherTab";


export default {
  name: "WeatherWidget",
  components: {SettingsRow, CityWeather, Loader},
  data() {
    return {
      loading: false,
      error: false,
      searchCity: '',
      optionsEnabled: false,
      cities: []
    }
  },
  mounted() {
    try {
      this.cities = JSON.parse(localStorage.cities);
    } catch (e) {
      console.log('Parsing error: ',e.message)
    }
    if(!this.cities.length){
      this.optionsEnabled = true;
    }
  },
  methods: {
    deleteAll(){
      this.cities = [];
      localStorage.cities = [];
    },
    clearError() {
      this.error = false;
    },
    addCity() {
      this.loading = true;
      if (!this.cities.includes(this.searchCity)) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.searchCity}&appid=b8475c6ee4917ca1020cbca524988ee6`
        console.log(url)
        axios
            .get(url)
            .then(res => {
              this.error = false;
              this.cities.push(res.data);
              this.searchCity = '';
              localStorage.cities = JSON.stringify(this.cities);
              console.log(res.data);
              this.loading = false;
            })
            .catch(err => {
              this.error = true;
              console.log(err)
              this.loading = false;
            })
      }
    },
    removeCity(index) {
      this.cities.splice(index, 1);
      localStorage.cities = JSON.stringify(this.cities);
    },
    toggleOptions() {
      this.optionsEnabled = !this.optionsEnabled;
    }
  }
}
</script>

<style scoped>

</style>