<template>
  <div class="weather-widget">
    <div class="widget-header">
      <span>{{ optionsEnabled ? `Settings` : `Weather` }}</span>
      <span class="gear pointer" @click.prevent="toggleOptions()">
        <font-awesome-icon :icon="faCog" v-show="!optionsEnabled"/>
        <font-awesome-icon :icon="faTimes" v-show="optionsEnabled"/>
      </span>
    </div>
    <div class="weather-content">
      <Settings v-show="optionsEnabled" :cities="cities"/>
      <WeatherTab v-show="!optionsEnabled" :cities="cities"/>
    </div>
  </div>

</template>

<script>
import "./weather-widget.sass"
import WeatherTab from "@/components/weather-widget/WeatherTab";
import Settings from "./Settings";
import store from "./store";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"
import { faSpinner,  faCog, faTimes} from '@fortawesome/free-solid-svg-icons'

export default {
  name: "WeatherWidget",
  components: {Settings, WeatherTab, FontAwesomeIcon},
  data() {
    return {
      faSpinner, faCog, faTimes,
      optionsEnabled: false,
      cities: store.cities
    }
  },
  mounted() {
  },
  methods: {
    toggleOptions() {
      this.optionsEnabled = !this.optionsEnabled;
    }
  }
}
</script>

<style scoped>

</style>