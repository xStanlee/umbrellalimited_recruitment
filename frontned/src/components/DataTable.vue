<template>
  <v-app>
    <div :class="{DataTable__inputWrapper: true, 'DataTable__inputWrapper--flexCol': flexCol}" >
      <DataTableInput @onChange="sourceCountryHandler" label="Kraj zrodlowy" :items="serviceTable.records"/>
      <DataTableInput @onChange="destinationCountryHandler" label="Kraj docelowy" :items="serviceTable.records"/>
    </div>

    <p style="font-size: 1rem; margin-bottom: 1.5rem; font-weight: 600;">Kraj docelowy</p>
    <p style="transform: rotate(270deg); font-weight: 600; font-size: 1rem; margin-right: 20rem; position: absolute; top: 25%; left: -5rem;">Kraj zrodlowy</p>
    <v-data-table
      class="DataTable__table elevation-1"
    >
      <DataTableHeader :headers="sourceCountryHeaders" />
      <DataTableBody :headers="destinationCountryHeaders" :rates="rates" />
      <template #bottom></template>
    </v-data-table>
  </v-app>
</template>
<script setup >
import { ref, computed } from "vue";
import { serviceTable } from "../services/ServiceTable.js";

import { VDataTable } from "vuetify/labs/VDataTable";
import DataTableInput from "./DataTableInput.vue";
import DataTableHeader from "./DataTableHeader.vue";
import DataTableBody from "./DataTableBody.vue";

const sourceCountryHeaders = ref(serviceTable.records);
const destinationCountryHeaders = ref(serviceTable.records);
const rates = ref(serviceTable.rates);

const flexCol = computed(() => {
  return sourceCountryHeaders.value.length < 2 && destinationCountryHeaders.value.length < 2
})

const sourceCountryHandler = (value) => {
  resetFilters(destinationCountryHeaders);
  
  if(value) {
    destinationCountryHeaders.value = destinationCountryHeaders.value.filter((header) => header === value);
  }
}

const destinationCountryHandler = (value) => {
  resetFilters(sourceCountryHeaders);
  
  if(value) {
    sourceCountryHeaders.value = sourceCountryHeaders.value.filter((header) => header === value);
    rates.value = serviceTable.rates.filter((rate) => rate.sourceCountry === value);
  }
}

const resetFilters = (headers) => {
  headers.value = serviceTable.records;
  rates.value = serviceTable.rates;
}
</script>

<style scoped lang="scss">
.DataTable {
  &__inputWrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    min-height: 5rem;
    width: 50%;

    &--flexCol {
      flex-direction: column;
      width: 100%;
    }
  }
}
</style>
