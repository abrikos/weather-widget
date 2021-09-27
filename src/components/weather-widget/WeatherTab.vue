<template>
  <div class="weather-tab">

      <div v-for="(city, idx) in cities" :key="idx" class="weather-row">
        <div class="name-temp">
          <span class="city-name">{{ city.name }}</span>
          <span class="city-temp">{{ (city.main.temp - 273.15).toFixed(1) }} °C</span>
        </div>
        <div class="city-desc">{{ city.weather[0].description }}</div>
        <div class="city-hum">
          <span>Humidity:</span>&nbsp;
          <strong>{{ city.main.humidity }}%</strong>
        </div>
        <div class="city-press">
          <span>Pressure:</span>&nbsp;
          <strong>{{ city.main.pressure }}mm</strong>
        </div>

      </div>
    <div v-show="!cities.length">Please select cities to display the weather. Use gear icon ⚙</div>


  </div>
</template>

<script>
export default {
  name: "WeatherTab",
  props: ['cities'],
}
</script>

<style scoped>

</style>