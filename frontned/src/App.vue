<template>
  <div class="App">
    <DataTableInputs class="App__DataTableInputs"/>
    <DataTable @onRateChange="rateChangeHandler" class="App__DataTable"/>
  </div>
</template>

<script setup>
import { nextTick } from 'vue';
import DataTable from './components/DataTable.vue'
import DataTableInputs from './components/DataTableInputs.vue'

// Vuetify doesn't provide a way to change the width of the table by columns, so we have to do it manually
const rateChangeHandler = (value) => {
  nextTick(() => {
    const table = document.getElementsByTagName('table')[0];
    const tableWrapper = document.getElementsByClassName('v-table v-table--fixed-height v-table--has-top v-table--has-bottom v-theme--light v-table--density-default v-data-table elevation-1')[0];

    if(!table || !tableWrapper) return;

    if(value > 800) {
      table.style.width = '100%';
      tableWrapper.style.width = '100%';
    } else {
      table.style.width = `${value}px`;
      tableWrapper.style.width = `${value}px`;
      table.style.margin = '0 auto';
      tableWrapper.style.margin = '0 auto';
    }
  });
}
</script>

<style scoped lang="scss">
.App {
  margin: 0 auto;
  padding: 2rem;
  width: 80%;
  text-align: center;
  
  &__DataTableInputs {
    margin: 2rem 0 4rem 0;
  }

  @media screen and (max-width: 768px) {
      &__DataTableInputs {
        margin: 1.5rem auto 2rem;
      }
    }

    &_DataTable {
      margin: 0 auto;
    }
}
</style>