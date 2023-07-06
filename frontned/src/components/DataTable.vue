<template>
  <div class="DataTable" v-if="rates.length">
    <p class="DataTable__header">Kraj docelowy</p>
    <p class="DataTable__header DataTable__header--vertical">Kraj zrodlowy</p>
    <v-data-table
      class="elevation-1"
      :height="height"
      color="blue"
    >
      <DataTableHeader :headers="headers" />
      <DataTableBody :rates="rates" />
      <template #bottom></template>
    </v-data-table>
  </div>
  <p v-else class="DataTable__noResult">Brak rekordow o podanych wartosciach</p>
</template>
<script setup >
import { ref, computed, watch } from "vue";
import { serviceTable } from "../services/ServiceTable.js";
import { storeFilters } from "../stores/storeFilters.js";

import { VDataTable } from "vuetify/labs/VDataTable";
import DataTableHeader from "./DataTableHeader.vue";
import DataTableBody from "./DataTableBody.vue";

const rates = ref(serviceTable.rates);

const anything = (value) => {
  console.log(value);
}

const headers = computed(() => {
  return storeFilters.destinationCountryFilters;
});

const height = computed(() => {
  return rates.value.length < 10 ? (rates.value.length + 1) * 48 : 500;
})

watch(storeFilters.sourceCountryFilters, newFilters => {
  rates.value = serviceTable.sourceCountriesRates(newFilters);
  rates.value = serviceTable.destinationCountriesRates(storeFilters.destinationCountryFilters, rates.value);
}, { deep: true });

watch(storeFilters.destinationCountryFilters, newFilters => {
  rates.value = serviceTable.destinationCountriesRates(newFilters);
  rates.value = serviceTable.sourceCountriesRates(storeFilters.sourceCountryFilters, rates.value)
}, { deep: true });
</script>
<style scoped lang="scss">
.DataTable {
  &__header {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    font-weight: 600;

    &--vertical {
      transform: rotate(270deg);
      font-weight: 600;
      margin-right: 20rem;
      position: absolute;
      top: 25%;
      left: -5rem;
    }
  }

  &__noResult {
    font-size: 1.5rem;
    margin-top: 10rem;
    font-weight: 600;
  }
}

</style>