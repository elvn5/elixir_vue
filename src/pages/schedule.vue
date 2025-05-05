<script lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        slotMinTime: '08:00:00',
        slotMaxTime: '20:00:00',
        slotDuration: '00:30:00',
        events: [],
        eventClick: this.handleEventClick,
        dateClick: this.handleDateClick,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        businessHours: {
          daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
          startTime: '08:00',
          endTime: '20:00'
        }
      },
      doctors: [
        { id: 1, name: 'Dr. Smith', specialty: 'Cardiology' },
        { id: 2, name: 'Dr. Johnson', specialty: 'Pediatrics' },
        { id: 3, name: 'Dr. Brown', specialty: 'Neurology' }
      ],
      selectedDoctor: null
    }
  },
  methods: {
    handleDateClick(arg) {
      if (!this.selectedDoctor) {
        alert('Please select a doctor first')
        return
      }

      const patientName = prompt('Enter patient name:')
      if (patientName) {
        this.calendarOptions.events.push({
          title: `${patientName} - ${this.selectedDoctor.name}`,
          start: arg.date,
          end: new Date(arg.date.getTime() + 30 * 60 * 1000), // 30 minute appointment
          doctorId: this.selectedDoctor.id,
          patient: patientName
        })
      }
    },
    handleEventClick(arg) {
      if (confirm(`Appointment: ${arg.event.title}\nTime: ${arg.event.start.toLocaleString()}\nRemove this appointment?`)) {
        arg.event.remove()
      }
    },
    filterEventsByDoctor(doctorId) {
      this.selectedDoctor = this.doctors.find(d => d.id === doctorId)
      this.calendarOptions.events = this.calendarOptions.events.filter(
        event => event.doctorId === doctorId || !doctorId
      )
    }
  }
}
</script>

<template>
  <v-container>
    <v-row class="pa-2 gap-2 justify-space-between align-center">
      <p class="text-h2 pb-2">
        Расписание врачей
      </p>
    </v-row>

    <v-row class="mb-4">
      <v-col
        cols="12"
        sm="6"
      >
        <v-select
          v-model="selectedDoctor"
          :items="doctors"
          item-title="name"
          item-value="id"
          label="Select Doctor"
          return-object
          @update:model-value="filterEventsByDoctor"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <FullCalendar :options="calendarOptions" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
:deep(.fc-event) {
  cursor: pointer;
  background-color: #1976d2;
  border-color: #1565c0;
}

:deep(.fc-daygrid-day) {
  height: 100px;
}
</style>
