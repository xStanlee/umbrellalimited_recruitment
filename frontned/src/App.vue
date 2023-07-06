<template>
  <div class="App">
    <DataTableInputs class="App__DataTableInputs"/>
    <DataTable class="App__DataTable" />
  </div>
</template>

<script setup>
import DataTable from './components/DataTable.vue'
import DataTableInputs from './components/DataTableInputs.vue'
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
}
</style>