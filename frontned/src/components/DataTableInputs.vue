<template>
    <div class="DataTableInputs" >
      <DataTableInput class="DataTableInputs__input" @onChange="sourceCountryHandler" label="Kraj zrodlowy" :items="serviceTable.records"/>
      <DataTableInput class="DataTableInputs__input" @onChange="destinationCountryHandler" label="Kraj docelowy" :items="serviceTable.records"/>
    </div>
</template>

<script setup>
import { serviceTable } from '../services/ServiceTable';
import { storeFilters } from '../stores/storeFilters';

import DataTableInput from './DataTableInput.vue';

const sourceCountryHandler = (value) => {
  storeFilters.setSourceCountryFilters(value);
}

const destinationCountryHandler = (value) => {
  storeFilters.setDestinationCountryFilters(value);
}
</script>
<style scoped lang="scss">
.DataTableInputs {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    min-height: 5rem;
    width: 30rem;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      width: 15rem;
    }

    &__input {
      &:not(:last-of-type) {
        margin-right: 2rem;
      } 
    }
}
</style>