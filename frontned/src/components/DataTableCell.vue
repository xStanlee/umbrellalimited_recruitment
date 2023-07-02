<template>
    <template v-if="rate.editing" >
        <input ref="myInput" class="DataTableCell" v-model="rate.rate" @keyup.enter="inputHandler(rate)" @blur="inputHandler(rate)"/>
    </template>
    <template v-else>
        <span :class="{'DataTableCell': true, 'DataTableCell--incorrect': rate.id === storeHeaders.errorId, 'DataTableCell--fat': fat}" @click="startEditing(rate)">{{ rate.rate }}</span>
    </template>
</template>
<script setup>
import { nextTick, ref, inject, toRaw } from "vue";
import { storeHeaders } from "../stores/storeHeaders";

const swal = inject('$swal')
const props = defineProps({
    rate: {
        type: Object,
        required: true
    },
    fat: {
        type: Boolean,
        default: false
    }
});
const myInput = ref(null);
const rate = ref(props.rate);
let spanRate = props.rate.rate;

const startEditing = (item) => {
    item.editing = true;
    storeHeaders.setHeaders(rate.value.destinationCountry, rate.value.sourceCountry)
    nextTick(() => {
        myInput.value.focus();
    });
}

const inputHandler = async(item) => {    
    resetCellState(item);

    if (spanRate === item.rate) {
        return;
    }

    if(+item.rate >= 0 && +item.rate < 100) {
        handleResponse(await updateRateRecord(item));
    } else {
        showErrorMessage('Wrong rating', `Rating should be a number between 0 and 100, but is ${rate.value.rate}.`);
        item.rate = spanRate;
    }
}

const updateRateRecord = async(item) => {
    delete item.editing;
    item.rate = +item.rate;

    try {
        const response = await fetch(`http://localhost:3001/api/${item.id}/update/json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(toRaw(item))
        });
        return await response.json();
    } catch (e) {
        console.error(e);
    }
}

const handleResponse = (response) => {
    if (response.error) {
        storeHeaders.setErrorId(rate.value.id);
        showErrorMessage('Error during update', 'Please try again. If the problem persists, contact the administrator.');
    } else {
        showSuccessMessage();
    }
}

const resetCellState = (item) => {
    item.editing = false;
    storeHeaders.resetHeaders();
    storeHeaders.resetErrorId();
}

const showSuccessMessage = () => {
    swal({
        icon: 'success',
        title: 'Rating saved',
        text: `New rating: ${rate.value.rate} is set for transport ${rate.value.sourceCountry}/${rate.value.destinationCountry}.`
    });
}

const showErrorMessage = (title, text) => {
    swal({
        icon: 'error',
        title,
        text
    });
}
</script>
<style scoped lang="scss">
@import "../style/mixin.scss";
.DataTableCell {
    @include flex-center;
    @include cell;
    text-align: center;

    &:focus {
        border: 2px solid green;
        outline: none;
    }

    &--incorrect {
        border: 2px solid darkred;
    }


    &--fat {
        width: 100%;
    }
}
</style>