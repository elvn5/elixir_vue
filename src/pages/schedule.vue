<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth'
      }
    }
  }
}
</script>
<template>
  <v-container>
    <v-row
      class="pa-2 gap-2 justify-space-between align-center"
    >
      <p class="text-h2 pb-2">
        Расписание
      </p>
    </v-row>
    <FullCalendar :options="calendarOptions" />
  </v-container>
</template>
