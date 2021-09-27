<template>
  <div class="weather-tab">
    <ul>
      <li v-for="(city, idx) in cities" :key="idx">
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

      </li>
    </ul>


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