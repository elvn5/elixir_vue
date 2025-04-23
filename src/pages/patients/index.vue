<template>
  <v-container>
    <v-row
      class="pa-2 gap-2 justify-space-between align-center"
    >
      <p class="text-h2 pb-2">
        Пациенты
      </p>
      <v-btn variant="outlined">
        Добавить
      </v-btn>
    </v-row>

    <v-tabs
      v-model="tab"
      class="mb-2"
    >
      <v-tab value="patients">
        Пациенты
      </v-tab>
      <v-tab value="history">
        История посещений
      </v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="patients">
        <div class="patients-wrapper">
          <patients-profile @click="onClickPatient" />
          <patients-profile @click="onClickPatient" />
          <patients-profile @click="onClickPatient" />
          <patients-profile @click="onClickPatient" />
        </div>
      </v-tabs-window-item>

      <v-tabs-window-item value="history">
        <v-text-field
          placeholder="Поиск..."
          class="mb-2"
        />
        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Calories
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in desserts"
              :key="item.name"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.calories }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>
<script setup lang="ts">

import router from "@/router";

function onClickPatient() {
  router.push(`/patients/123`);
}

const tab = ref(null);

const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
  },
  {
    name: 'Eclair',
    calories: 262,
  },
  {
    name: 'Cupcake',
    calories: 305,
  },
  {
    name: 'Gingerbread',
    calories: 356,
  },
  {
    name: 'Jelly bean',
    calories: 375,
  },
  {
    name: 'Lollipop',
    calories: 392,
  },
  {
    name: 'Honeycomb',
    calories: 408,
  },
  {
    name: 'Donut',
    calories: 452,
  },
  {
    name: 'KitKat',
    calories: 518,
  },
]
</script>

<style scoped>
.patients-wrapper {
display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
</style>
