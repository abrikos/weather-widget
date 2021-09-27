<template>
  <div class="weather-widget">
    <div class="widget-header">
      <span>{{ optionsEnabled ? `Settings` : `Weather` }}</span>
      <span class="gear pointer" @click.prevent="toggleOptions()">{{ optionsEnabled ? `✕` : `⚙` }}</span>
    </div>
    <hr/>
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


export default {
  name: "WeatherWidget",
  components: {Settings, WeatherTab},
  data() {
    return {
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