<template>
  <div class="options-city-row">
    <span class="options-city-name">{{city.name}}</span> <span @click="remove">🗑</span>
  </div>
</template>

<script>
export default {
  props: ['city'],
  name: "SettingsRow",
  methods: {
    remove() {
    this.$emit('remove')
    }
  }
}
</script>

<style scoped>
</style>