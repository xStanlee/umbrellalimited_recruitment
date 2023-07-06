<template>
  <v-app>
    <div :class="{DataTable__inputWrapper: true, 'DataTable__inputWrapper--flexCol': flexCol}" >
      <DataTableInput @onChange="sourceCountryHandler" label="Kraj zrodlowy" :items="serviceTable.records"/>
      <DataTableInput @onChange="destinationCountryHandler" label="Kraj docelowy" :items="serviceTable.records"/>
    </div>

    <p style="font-size: 1rem; margin-bottom: 1.5rem; font-weight: 600;">Kraj docelowy</p>
    <p style="transform: rotate(270deg); font-weight: 600; font-size: 1rem; margin-right: 20rem; position: absolute; top: 25%; left: -5rem;">Kraj zrodlowy</p>
    <v-data-table v-if="sourceCountryHeaders.length && rates.length"
      class="DataTable__table elevation-1"
      height="500"
    >
      <DataTableHeader :headers="sourceCountryHeaders" />
      <DataTableBody :rates="rates" />
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
const rates = ref(serviceTable.rates);
const sourceCountryInput = ref([]);

const flexCol = computed(() => {
  return sourceCountryHeaders.value.length < 2;
});

const sourceCountryHandler = (value) => {
  resetFilters();
  rates.value = sourceCountryFilter(serviceTable.rates, value);
  sourceCountryInput.value = value;
}

const destinationCountryHandler = (value) => {
    resetFilters();
    rates.value = destinationCountryFilter(serviceTable.rates, value);
    rates.value = sourceCountryFilter(rates.value);
    sourceCountryHeaders.value = value;
}

const resetFilters = () => {
  sourceCountryHeaders.value = serviceTable.records;
  rates.value = serviceTable.rates;
}

const sourceCountryFilter = (rates, filters = sourceCountryInput.value) => {
  return rates.filter(({ sourceCountry }) => {
    if(!sourceCountryInput.value.length) {
     return true;
    }    
    return sourceCountryInput.value.includes(sourceCountry);
  });
}

const destinationCountryFilter = (rates, filters) => {
  return rates.map(({ destinationCountries, sourceCountry }) => {
    const _rate = {
      sourceCountry: '',
      destinationCountries: [],
    };
    destinationCountries.forEach((rate) => {
      if(filters.includes(rate.destinationCountry)) {
        _rate.sourceCountry = sourceCountry;
        _rate.destinationCountries.push(rate);
      }
    });
    return _rate;
  }).filter(Boolean);
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
