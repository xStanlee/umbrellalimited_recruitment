<template>
    <thead class="DataTableHeader">
        <th class="DataTableHeader__cell"></th>
        <th v-for="header in headers" :key="header" :class="{'DataTableHeader__cell': true, 'DataTableHeader__cell--highlighted': header === storeHeaders.row}">
            {{ header }}
        </th>
    </thead>
</template>

<script setup>
import { storeHeaders } from '../stores/storeHeaders';

defineProps({
    headers: {
        type: Array,
        required: true
    }
})
</script>
<style scoped lang="scss">
@import "../style/mixin.scss";
.DataTableHeader {
    z-index: 10;
    &__cell {
        @include cell;
        font-weight: 600;
        color: #555;
        background-color: #fff;
        position: sticky;
        top: 0;

        &:first-of-type {
            min-width: 4rem;
            min-height: 3rem;
        }
        
        &--highlighted {
            background-color: #f5f5f5;
            border: 2px solid green;
        }
    }
}
</style>
