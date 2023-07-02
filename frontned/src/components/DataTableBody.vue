<template>
  <tr class="DataTableBody" v-for="(header, headerIndex) in headers" :key="header">
      <td
        :class="{
          DataTableBody__cell: true,
          'DataTableBody__cell--fat': fat,
          'DataTableBody__cell--highlighted':
            header === storeHeaders.column,
        }"
      >
        {{ header }}
      </td>
      
      <td v-if="rates.length > 1"
        v-for="(rate, rateIndex) in rates"
        :key="`${rate.sourceCountry}_${header}`"
      >
        <DataTableCell
          :rate="rates[headerIndex].destinationCountries[rateIndex]"
        />
      </td>

      <td v-else>
        <DataTableCell :rate="rates[0].destinationCountries[headerIndex]" :fat="fat" />
      </td>
    </tr>
</template>

<script setup>
import DataTableCell from "./DataTableCell.vue";
import { storeHeaders } from "../stores/storeHeaders";
import { computed } from "vue";

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  rates: {
    type: Array,
    required: true,
  },
});

const fat = computed(() => {
  return props.headers.length < 2 && props.rates.length < 2;
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
      position: absolute;
      left: 0;
      background-color: #fff;
      overflow: scroll;
    }
  }
}
</style>
