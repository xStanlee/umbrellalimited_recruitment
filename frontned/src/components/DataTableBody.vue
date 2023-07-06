<template>
  <tr class="DataTableBody" v-for="rate in rates" :key="rate.id">
      <td
        :class="{
          DataTableBody__cell: true,
          'DataTableBody__cell--fat': fat,
          'DataTableBody__cell--highlighted':
           rate.sourceCountry === storeHeaders.column,
        }"
      >
        {{ rate.sourceCountry }}
      </td>
      
      <td
        v-for="cellRate in rate.destinationCountries"
        :key="`cellRate-${cellRate.id}`"
      >
        <DataTableCell
          :rate="cellRate"
        />
      </td>
    </tr>
</template>

<script setup>
import DataTableCell from "./DataTableCell.vue";
import { storeHeaders } from "../stores/storeHeaders";
import { computed } from "vue";

const props = defineProps({
  rates: {
    type: Array,
    required: true,
  },
});

const fat = computed(() => {
  return props.rates.length < 2;
})
</script>

<style scoped lang="scss">
@import "../style/mixin.scss";
.DataTableBody {
  &__cell {
    @include flex-center;
    @include cell;
    font-weight: 600;
    color: #555;

    &--highlighted {
      background-color: #f5f5f5;
      border: 2px solid green;
    }

    &--fat {
      width: 50%;
    }

    &:first-child {
      position: sticky;
      left: 0;
      background-color: #fff;
    }
  }
}
</style>
