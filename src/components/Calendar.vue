<template>
  <vue-cal
    :views="['day', 'week']"
    :time-from="7 * 60"
    :time-to="20 * 60"
    :special-hours="specialHours"
  />
</template>

<script setup lang="ts">
import { VueCal } from 'vue-cal'
import 'vue-cal/style'

const specialHours = {
  mon: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
  tue: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
  wed: [
    { from: 9 * 60, to: 12 * 60, class: 'business-hours' },
    { from: 14 * 60, to: 18 * 60, class: 'business-hours' }
  ],
  thu: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
  fri: { from: 9 * 60, to: 18 * 60, class: 'business-hours' }
}
</script>

<style scoped>
.business-hours {background-color: #00daff21;}
</style>
