<template>
  <div class="weather-tab">

      <div v-for="(city, idx) in cities" :key="idx" class="weather-row">
        <div class="name-temp">
          <strong class="city-name">{{ city.name }}</strong>
          <strong class="city-temp">{{ (city.main.temp - 273.15).toFixed(1) }} °C</strong>
        </div>
        <div class="city-desc">{{ city.weather[0].description }}</div>
        <table>
          <tr><td class="text-right">Humidity:</td><td class="text-left"><strong>{{ city.main.humidity }}</strong>%</td></tr>
          <tr><td class="text-right">Pressure:</td><td class="text-left"><strong>{{ city.main.pressure }}</strong>mm</td></tr>
        </table>

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